<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Accommodations</h1>
    <p class="text-gray-600">Manage all accommodation information here.</p>

    <div class="flex justify-end p-4">
      <button @click="handleAdd" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200">
        Add New Accommodation
      </button>
    </div>

    <div v-if="loading" class="text-center text-gray-500 text-2xl p-8">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-2xl p-8">Error: {{ error }}</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <template v-if="accommodations.length > 0">
        <div v-for="accommodation in accommodations" :key="accommodation.id" class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <img
            :src="accommodation.image_url"
            :alt="accommodation.name"
            class="rounded-lg w-full h-48 object-cover mb-4 shadow"
          />
          <h3 class="text-xl font-bold text-gray-800 mb-2">{{ accommodation.name }}</h3>
          <p class="text-gray-600 mb-1"><span class="font-semibold">Capacity:</span> {{ accommodation.capacity }}</p>
          <p class="text-gray-600 mb-1"><span class="font-semibold">Price:</span> {{ accommodation.price }}</p>
          <p class="text-gray-600 mb-4"><span class="font-semibold">Status:</span> {{ accommodation.status }}</p>
          <div class="flex space-x-2 mt-auto">
            <button @click="handleEdit(accommodation)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">Edit</button>
            <button @click="handleDelete(accommodation.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">Delete</button>
          </div>
        </div>
      </template>
      <p v-else class="text-center text-gray-500 col-span-full text-xl">No accommodations found.</p>
    </div>

    <ManagementModal :isOpen="isModalOpen" :title="modalTitle" :item="currentAccommodation" @save="handleSave" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  getAccommodations,
  addAccommodation,
  updateAccommodation,
  deleteAccommodation,
  BACKEND_BASE
} from '../api.js';
import ManagementModal from '../components/Modals/ManagementModal.vue';

const accommodations = ref([]);
const loading = ref(true);
const error = ref(null);

const isModalOpen = ref(false);
const currentAccommodation = ref(null);
const modalTitle = ref('');

// Helper: make absolute URL from backend base and relative path
function makeAbsoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return null;

  const str = String(pathOrUrl).trim();
  if (!str) return null;

  // Already absolute?
  if (/^https?:\/\//i.test(str)) return str;

  // If starts with '/', attach to BACKEND_BASE directly
  if (str.startsWith('/')) {
    return `${BACKEND_BASE.replace(/\/$/, '')}${str}`;
  }

  // If storage path 'storage/...' or 'images/...' -> ensure '/storage/...' then prefix
  if (str.startsWith('storage/')) {
    return `${BACKEND_BASE.replace(/\/$/, '')}/${str}`;
  }

  if (str.startsWith('images/')) {
    // Backend stores images under storage/images/... but your server returned the 'path'
    // If your backend returns 'images/...' we expect final url to be '/storage/images/...'
    return `${BACKEND_BASE.replace(/\/$/, '')}/storage/${str}`;
  }

  // fallback: prefix with backend root
  return `${BACKEND_BASE.replace(/\/$/, '')}/${str}`;
}

// centralized resolver that checks multiple possible fields (image.url, image.path, image_url)
function computeFullImageUrl(item) {
  if (!item) return null;

  // if API returned nested `data` structure
  const model = item.data && typeof item.data === 'object' ? item.data : item;

  // 1) nested image object with url/path
  if (model.image && typeof model.image === 'object') {
    const u = model.image.url ?? model.image.path ?? null;
    if (u) return makeAbsoluteUrl(u);
  }

  // 2) top-level image_url returned by the API
  if (model.image_url) return makeAbsoluteUrl(model.image_url);

  // 3) top-level image may be a string (path)
  if (typeof model.image === 'string' && model.image.length) {
    return makeAbsoluteUrl(model.image);
  }

  // 4) fallback: thumbnail_url or other fields
  if (model.thumbnail_url) return makeAbsoluteUrl(model.thumbnail_url);

  return null;
}

async function fetchData() {
  loading.value = true;
  error.value = null;
  try {
    const list = await getAccommodations();

    // Defensive: if backend returns { status, data: [...] } or array
    const items = Array.isArray(list) ? list : (list?.data ?? list ?? []);

    accommodations.value = items.map(it => {
      const fullUrl = computeFullImageUrl(it);
      // create a normalized object with image_url set to absolute or placeholder
      return {
        ...it,
        image_url: fullUrl ?? '/placeholder', // optional placeholder relative; you can set null too
      };
    });
  } catch (e) {
    error.value = e.message || 'Failed to fetch accommodations';
  } finally {
    loading.value = false;
  }
}

function handleAdd() {
  currentAccommodation.value = { id: null, name: '', capacity: '', price: '', status: '' };
  modalTitle.value = 'Add New Accommodation';
  isModalOpen.value = true;
}

function handleEdit(item) {
  currentAccommodation.value = { ...item };
  modalTitle.value = 'Edit Accommodation';
  isModalOpen.value = true;
}

async function handleSave(payload) {
  try {
    if (!(payload instanceof FormData)) {
      console.error('Expected FormData but got', payload);
      alert('Internal error: payload is not FormData.');
      return;
    }

    // debug dump
    for (const [k, v] of payload.entries()) {
      if (v instanceof File) console.log('FormData:', k, 'File:', v.name, v.type, v.size);
      else console.log('FormData:', k, v);
    }

    const id = payload.get('id');
    if (id) {
      await updateAccommodation(id, payload);
    } else {
      await addAccommodation(payload);
    }

    isModalOpen.value = false;
    await fetchData();
  } catch (err) {
    console.error('Failed to save accommodation:', err.response?.data ?? err);
    if (err.response?.status === 422) alert('Validation failed. See console.');
    else alert('Save failed. See console.');
  }
}

async function handleDelete(id) {
  if (!confirm('Delete this accommodation?')) return;
  try {
    await deleteAccommodation(id);
    await fetchData();
  } catch (err) {
    console.error('Failed to delete', err);
    alert('Delete failed.');
  }
}

function closeModal() {
  isModalOpen.value = false;
  currentAccommodation.value = null;
}

/* --- resolveImage kept for template fallback (if you still need it) --- */
function resolveImage(item) {
  const placeholder = 'https://placehold.co/400x200/cccccc/333333?text=No+Image';

  if (!item || typeof item !== 'object') {
    if (typeof item === 'string' && item.length) return makeAbsoluteUrl(item);
    return placeholder;
  }

  const model = item.data && typeof item.data === 'object' ? item.data : item;

  // Prefer the normalized image_url field we set at fetch time
  if (model.image_url) return model.image_url;

  // fallback to computeFullImageUrl
  const candidate = computeFullImageUrl(model);
  return candidate ?? placeholder;
}

onMounted(fetchData);
</script>

