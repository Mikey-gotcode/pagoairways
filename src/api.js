// src/api.js
import axios from 'axios';

/**
 * API base config
 */
const API_BASE_URL = 'https://2d5acd37f242.ngrok-free.app/api';

// derive BACKEND_BASE (strip /api) and allow env override for production
export const BACKEND_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL)
  ? String(import.meta.env.VITE_BACKEND_URL).replace(/\/$/, '')
  : String(API_BASE_URL).replace(/\/api\/?$/i, '');

// Axios JSON client (for regular JSON requests)
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/**
 * setAuthToken - sets or clears Authorization header
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('authToken');
  }
};

// set token on load if present
const storedToken = localStorage.getItem('authToken');
if (storedToken) {
  setAuthToken(storedToken);
}

/**
 * Request interceptor: if sending FormData on the `api` instance,
 * remove Content-Type so browser will set multipart boundary.
 * (We also use a separate formClient for uploads.)
 */
api.interceptors.request.use((config) => {
  if (config && config.data instanceof FormData) {
    if (config.headers) delete config.headers['Content-Type'];
    if (api.defaults && api.defaults.headers && api.defaults.headers.common) {
      delete api.defaults.headers.common['Content-Type'];
    }
  }
  return config;
}, (err) => Promise.reject(err));

/**
 * Response interceptor (basic 401 handling)
 */
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized - clearing token.');
      setAuthToken(null);
    }
    return Promise.reject(error);
  }
);

/**
 * Create a form client for multipart/form-data uploads.
 * We intentionally DO NOT set Content-Type here.
 */
function formClient() {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Accept: 'application/json',
    },
  });

  // ensure no Content-Type set globally
  if (client.defaults && client.defaults.headers && client.defaults.headers.common) {
    delete client.defaults.headers.common['Content-Type'];
  }

  // attach auth token if present
  const token = localStorage.getItem('authToken');
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return client;
}

/* -------------------- Utilities -------------------- */

/**
 * Convert backend-relative paths to absolute URLs using BACKEND_BASE
 * Handles:
 *  - "/storage/..." => BACKEND_BASE + "/storage/..."
 *  - "storage/..."  => BACKEND_BASE + "/storage/..."
 *  - "images/..."   => BACKEND_BASE + "/storage/images/..."
 *  - absolute URLs left alone
 */
export function makeAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl && pathOrUrl !== '') return null;
  const str = String(pathOrUrl).trim();
  if (!str) return null;

  if (/^https?:\/\//i.test(str)) return str;

  // already absolute path starting with '/'
  if (str.startsWith('/')) return `${BACKEND_BASE.replace(/\/$/, '')}${str}`;

  if (str.startsWith('storage/')) {
    return `${BACKEND_BASE.replace(/\/$/, '')}/${str}`;
  }

  if (str.startsWith('images/')) {
    // most systems expose images via /storage/images/...
    return `${BACKEND_BASE.replace(/\/$/, '')}/storage/${str}`;
  }

  // fallback
  return `${BACKEND_BASE.replace(/\/$/, '')}/${str}`;
}

/**
 * Convert plain object to FormData (files, arrays and nested objects handled)
 */
function objectToFormData(obj) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(obj || {})) {
    if (v === undefined || v === null) continue;
    if (v instanceof File || v instanceof Blob) {
      fd.append(k, v, v.name || 'file');
    } else if (Array.isArray(v)) {
      v.forEach((item) => {
        if (item instanceof File || item instanceof Blob) {
          fd.append(`${k}[]`, item, item.name || 'file');
        } else if (typeof item === 'object') {
          fd.append(`${k}[]`, JSON.stringify(item));
        } else {
          fd.append(`${k}[]`, item);
        }
      });
    } else if (typeof v === 'object') {
      // stringify nested objects
      fd.append(k, JSON.stringify(v));
    } else {
      fd.append(k, v);
    }
  }
  return fd;
}

/**
 * Given an API response payload or raw data, normalize its shape:
 * - If { status, data } return data
 * - Otherwise return raw
 * Then if object(s) contain possible image fields (image, image_url),
 * attach a normalized absolute `image_url` for direct consumption by components.
 */
function normalizeResponseData(raw) {
  let payload = raw;
  if (raw && typeof raw === 'object' && 'data' in raw) {
    payload = raw.data;
  }

  // If array of items
  if (Array.isArray(payload)) {
    return payload.map(normalizeItemImage);
  }

  // If single object
  if (payload && typeof payload === 'object') {
    return normalizeItemImage(payload);
  }

  return payload;
}

/**
 * Normalize a single item — attach image_url absolute URL if possible.
 */
function normalizeItemImage(item) {
  if (!item || typeof item !== 'object') return item;

  // If nested data (resource wrapper), operate on item.data
  const model = item.data && typeof item.data === 'object' ? item.data : item;

  let imageUrl = null;

  // Try nested image object first
  if (model.image && typeof model.image === 'object') {
    imageUrl = model.image.url ?? model.image.path ?? null;
  }

  // Try top-level image_url
  if (!imageUrl && model.image_url) imageUrl = model.image_url;

  // Try top-level image string
  if (!imageUrl && typeof model.image === 'string' && model.image.length) imageUrl = model.image;

  // If we found a candidate, convert to absolute
  model.image_url = imageUrl ? makeAbsoluteUrl(imageUrl) : model.image_url ?? null;

  // If original wrapper existed (item.data), return wrapper with replaced data
  if (item.data && typeof item.data === 'object') {
    return { ...item, data: model };
  }
  return model;
}

/* -------------------- API METHODS -------------------- */

/* Authentication */
export const getUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    const { user, token } = response.data;
    setAuthToken(token);
    return { user, token };
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/logout');
    setAuthToken(null);
  } catch (error) {
    console.error('Error during logout:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const changePassword = async (current_password, new_password, new_password_confirmation) => {
  try {
    const response = await api.post('/changepassword', {
      current_password,
      new_password,
      new_password_confirmation,
    });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/* Accommodations */
export async function getAccommodations() {
  const resp = await api.get('/accommodations');
  return normalizeResponseData(resp.data);
}

export async function addAccommodation(data) {
  // If already FormData
  if (data instanceof FormData) {
    const client = formClient();
    const resp = await client.post('/accommodations', data);
    return normalizeResponseData(resp.data);
  }

  // If plain object - convert
  if (typeof data === 'object') {
    const fd = objectToFormData(data);
    const client = formClient();
    const resp = await client.post('/accommodations', fd);
    return normalizeResponseData(resp.data);
  }

  // fallback JSON
  const resp = await api.post('/accommodations', data);
  return normalizeResponseData(resp.data);
}

export async function updateAccommodation(id, data) {
  // If FormData provided
  if (data instanceof FormData) {
    const client = formClient();
    if (!data.get('id')) data.append('id', id);
    const resp = await client.post(`/accommodations/${id}`, data);
    return normalizeResponseData(resp.data);
  }

  if (typeof data === 'object') {
    const containsFile = Object.values(data).some(v => v instanceof File || v instanceof Blob);
    if (containsFile) {
      const fd = objectToFormData(data);
      if (!fd.get('id')) fd.append('id', id);
      const client = formClient();
      const resp = await client.post(`/accommodations/${id}`, fd);
      return normalizeResponseData(resp.data);
    }
    // fallback JSON POST (your backend accepts POST updates)
    const resp = await api.post(`/accommodations/${id}`, data);
    return normalizeResponseData(resp.data);
  }

  const resp = await api.post(`/accommodations/${id}`, data);
  return normalizeResponseData(resp.data);
}

export async function deleteAccommodation(id) {
  const resp = await api.delete(`/accommodations/${id}`);
  return resp.data;
}

/* Destinations */
export async function getDestinations() {
  const resp = await api.get('/destinations');
  return normalizeResponseData(resp.data);
}

export async function addDestination(data) {
  if (data instanceof FormData) {
    const client = formClient();
    const resp = await client.post('/destinations', data);
    return normalizeResponseData(resp.data);
  }
  if (typeof data === 'object') {
    const fd = objectToFormData(data);
    const client = formClient();
    const resp = await client.post('/destinations', fd);
    return normalizeResponseData(resp.data);
  }
  const resp = await api.post('/destinations', data);
  return normalizeResponseData(resp.data);
}

export async function updateDestination(id, data) {
  if (data instanceof FormData) {
    const client = formClient();
    if (!data.get('id')) data.append('id', id);
    const resp = await client.post(`/destinations/${id}`, data);
    return normalizeResponseData(resp.data);
  }

  if (typeof data === 'object') {
    const containsFile = Object.values(data).some(v => v instanceof File || v instanceof Blob);
    if (containsFile) {
      const fd = objectToFormData(data);
      if (!fd.get('id')) fd.append('id', id);
      const client = formClient();
      const resp = await client.post(`/destinations/${id}`, fd);
      return normalizeResponseData(resp.data);
    }
    const resp = await api.put(`/destinations/${id}`, data);
    return normalizeResponseData(resp.data);
  }

  const resp = await api.put(`/destinations/${id}`, data);
  return normalizeResponseData(resp.data);
}

export async function deleteDestination(id) {
  const resp = await api.delete(`/destinations/${id}`);
  return resp.data;
}
