<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Destinations</h1>
    <p class="text-gray-600">Manage all destination information here.</p>

    <div class="flex justify-end p-4">
      <button
        @click="handleAdd"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200"
      >
        Add New Destination
      </button>
    </div>

    <!-- Conditional content based on loading and error state -->
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

    <!-- Destinations List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <template v-if="destinations.length > 0">
        <div v-for="destination in destinations" :key="destination.id" class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <img
            :src="destination.image_url || 'https://placehold.co/400x200/cccccc/333333?text=Destination'"
            :alt="destination.name"
            class="rounded-lg w-full h-48 object-cover mb-4 shadow"
          />
          <h3 class="text-xl font-bold text-gray-800 mb-2">{{ destination.name }}</h3>
          <p class="text-gray-600 mb-4 text-sm">{{ destination.description }}</p>
          <a
            :href="destination.affiliate_link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-500 hover:underline mb-4"
          >
            Affiliate Link
          </a>
          <div class="flex space-x-2 mt-auto">
            <button
              @click="handleEdit(destination)"
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
            >
              Edit
            </button>
            <button
              @click="handleDelete(destination.id)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </template>
      <p v-else class="text-center text-gray-500 col-span-full text-xl">No destinations found.</p>
    </div>
  </div>

  <!-- Modal for adding/editing a destination -->
  <ManagementModal
    :isOpen="isModalOpen"
    :title="modalTitle"
    :item="currentDestination"
    @save="handleSave"
    @close="closeModal"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDestinations, addDestination, updateDestination, deleteDestination } from '../api.js';
import ManagementModal from '../components/Modals/ManagementModal.vue'; // Import the new Modal component

const destinations = ref([]);
const loading = ref(true);
const error = ref(null);

// Modal state management
const isModalOpen = ref(false);
const currentDestination = ref(null);
const modalTitle = ref('');

const retry = async (fn, retries = 5, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Failed to fetch destinations, retrying in ${delay}ms... Attempts left: ${retries - 1}`);
      await new Promise(res => setTimeout(res, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    destinations.value = await retry(getDestinations);
  } catch (e) {
    error.value = 'Failed to fetch destinations: ' + e.message;
  } finally {
    loading.value = false;
  }
};

const handleAdd = () => {
  // Set modal state for adding a new item
  currentDestination.value = {
    id: null,
    name: '',
    image_url: '',
    description: '',
    affiliate_link: '',
  };
  modalTitle.value = 'Add New Destination';
  isModalOpen.value = true;
};

const handleEdit = (destination) => {
  // Set modal state for editing an existing item
  currentDestination.value = { ...destination };
  modalTitle.value = 'Edit Destination';
  isModalOpen.value = true;
};

const handleSave = async (payload) => {
  try {
   // sanity check
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
      await retry(()=>updateDestination(id, payload));
    } else {
      await retry(()=>addDestination(payload));
    }

    isModalOpen.value= false ;
    await fetchData(); // Refresh the list
  } catch (err) {
    console.error('Failed to save accommodation:', err.response?.data ?? err);
    if (err.response?.status === 422) {
      // Optional: show validation errors to user
      alert('Validation failed. See console for details.');
    } else {
      alert('Save failed. See console for details.');
    }
  }
};

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this destination?')) {
    try {
      await retry(()=>deleteDestination(id));
      await fetchData(); // Refresh the list
    } catch (e) {
      console.error('Failed to delete destination:', e);
    }
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  currentDestination.value = null;
};

onMounted(fetchData);
</script>
