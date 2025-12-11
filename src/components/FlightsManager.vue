<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Flights Management</h1>
    <p class="text-gray-600">Manage all flight information here.</p>

    <div class="flex justify-end p-4">
      <button @click="handleAdd" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200">
        Add New Flight
      </button>
    </div>

     <div v-if="loading" class="text-center text-gray-500 text-2xl p-8">
      <div class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
      </div>
    </div>
    <div v-else-if="error" class="text-center text-red-500 text-2xl p-8">
      Error: {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <template v-if="flights.length > 0">
        <div v-for="flight in flights" :key="flight.id" class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <img
            :src="flight.image_url"
            :alt="flight.airline"
            class="rounded-lg w-full h-48 object-cover mb-4 shadow"
          />
          <h3 class="text-xl font-bold text-gray-800 mb-2">{{ flight.airline }}</h3>
          <p class="text-gray-600 mb-1"><span class="font-semibold">Destination:</span> {{ flight.destination }}</p>
          <p class="text-gray-600 mb-1"><span class="font-semibold">Departure:</span> {{ flight.departure_time }}</p>
          <p class="text-gray-600 mb-1"><span class="font-semibold">Arrival:</span> {{ flight.arrival_time }}</p>
          <p class="text-gray-600 mb-1"><span class="font-semibold">Price:</span> {{ flight.price }}</p>
          <p class="text-gray-600 mb-4"><span class="font-semibold">Status:</span> {{ flight.status }}</p>
          <div class="flex space-x-2 mt-auto">
            <button @click="handleEdit(flight)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">Edit</button>
            <button @click="handleDelete(flight.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200">Delete</button>
          </div>
        </div>
      </template>
      <p v-else class="text-center text-gray-500 col-span-full text-xl">No flights found.</p>
    </div>

    <ManagementModal :isOpen="isModalOpen" :title="modalTitle" :item="currentFlight" @save="handleSave" @close="closeModal" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  getFlights, // <-- Changed API call
  addFlight,    // <-- Changed API call
  updateFlight, // <-- Changed API call
  deleteFlight, // <-- Changed API call
  BACKEND_BASE
} from '../api.js';
import ManagementModal from '../components/Modals/ManagementModal.vue'; // Adjust path as needed

const flights = ref([]); // <-- Changed state name
const loading = ref(true);
const error = ref(null);

const isModalOpen = ref(false);
const currentFlight = ref(null); // <-- Changed state name
const modalTitle = ref('');

// --- Helper Functions (Copied from AccommodationManager) ---

// Helper: make absolute URL from backend base and relative path (UNMODIFIED)
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

// centralized resolver that checks multiple possible fields (UNMODIFIED)
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

// retry logic (UNMODIFIED)
const retry = async (fn, retries = 5, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Failed to fetch flights, retrying in ${delay}ms... Attempts left: ${retries - 1}`);
      await new Promise(res => setTimeout(res, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};
// --- End Helper Functions ---


async function fetchData() {
  loading.value = true;
  error.value = null;
  try {
    const list = await retry(getFlights); // <-- Changed API call

    // Defensive: if backend returns { status, data: [...] } or array
    const items = Array.isArray(list) ? list : (list?.data ?? list ?? []);

    flights.value = items.map(it => { // <-- Changed state name
      const fullUrl = computeFullImageUrl(it);
      // create a normalized object with image_url set to absolute or placeholder
      return {
        ...it,
        image_url: fullUrl ?? null, // use null for flight to show placeholder in template
      };
    });
  } catch (e) {
    error.value = e.message || 'Failed to fetch flights';
  } finally {
    loading.value = false;
  }
}

function handleAdd() {
  // Initialize with Flight-specific fields
  currentFlight.value = { 
    id: null, 
    airline: '', 
    destination: '', 
    departure_time: '', 
    arrival_time: '', 
    price: '', 
    status: 'Available' // Default status
  };
  modalTitle.value = 'Add New Flight';
  isModalOpen.value = true;
}

function handleEdit(item) {
  currentFlight.value = { ...item }; // <-- Changed state name
  modalTitle.value = 'Edit Flight';
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
      await retry(()=>updateFlight(id, payload)); // <-- Changed API call
    } else {
      await retry(()=>addFlight(payload));    // <-- Changed API call
    }

    isModalOpen.value = false;
    await fetchData();
  } catch (err) {
    console.error('Failed to save flight:', err.response?.data ?? err);
    if (err.response?.status === 422) alert('Validation failed. See console.');
    else alert('Save failed. See console.');
  }
}

async function handleDelete(id) {
  if (!confirm('Delete this flight?')) return;
  try {
    await retry(()=>deleteFlight(id)); // <-- Changed API call
    await fetchData();
  } catch (err) {
    console.error('Failed to delete', err);
    alert('Delete failed.');
  }
}

function closeModal() {
  isModalOpen.value = false;
  currentFlight.value = null; // <-- Changed state name
}

onMounted(fetchData);
</script>