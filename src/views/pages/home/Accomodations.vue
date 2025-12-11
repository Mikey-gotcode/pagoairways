<template>
  <main class="container mx-auto px-4 py-12">
    
    <section class="mb-16">
      <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 class="text-4xl font-bold mb-4">Discover Your Next Adventure</h2>
        <p class="text-xl mb-6">Explore breathtaking destinations and find your perfect stay</p>
        <div class="relative max-w-md">
          <input type="text" placeholder="Search destinations..." class="w-full py-3 px-4 rounded-full text-gray-800 focus:outline-none">
          <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full">
            <i class="pi pi-search"></i> 
          </button>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-gray-800">Popular Destinations</h2>
      
      <div v-if="destinations.length === 0" class="text-center py-10 text-gray-500">
        Loading destinations...
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="destination in destinations" :key="destination.id" 
             class="destination-card relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl"
             @mouseenter="hoveredDestination = destination.id"
             @mouseleave="hoveredDestination = null"
             @click="handleCountrySelect(destination.name)">
             
            <img :src="destination.image_url" :alt="destination.name" class="w-full h-64 object-cover">
            
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300"
                 :class="{'opacity-0': hoveredDestination !== destination.id, 'opacity-100': hoveredDestination === destination.id}">
                <h3 class="text-white text-3xl font-bold">{{ destination.name }}</h3>
            </div>
        </div>
      </div>
    </section>
    
    <section v-if="selectedCountry" class="mb-16">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-3xl font-bold text-gray-800">{{ selectedCountry }}</h2>
                <button @click="clearCountrySelection" class="text-indigo-600 hover:text-indigo-800 font-bold">
                    Close (X)
                </button>
            </div>

            <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4 text-gray-700">About {{ selectedCountry }}</h3>
                <p class="text-gray-600">{{ getDestinationDescription(selectedCountry) }}</p>
                <a :href="getAffiliateLink(selectedCountry)" target="_blank" class="mt-4 inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                    Explore More
                </a>
            </div>
        </div>
    </section>

    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-gray-800"
          style="font-family: 'Playfair Display', serif;">
        {{ selectedCountry ? `Accommodations in ${selectedCountry}` : 'Available Accommodations' }}
      </h2>
      
      <div v-if="accommodations.length === 0" class="text-center py-10 text-gray-500">
        {{ selectedCountry ? 'No accommodations found for this destination.' : 'Loading accommodations...' }}
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="accommodation in accommodations" 
             :key="accommodation.id" 
             class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">
          
          <div class="relative">
              <img loading="lazy" :src="accommodation.image_url" :alt="accommodation.name" 
                   class="w-full h-48 object-cover" />
              
              <div class="absolute top-2 right-2 text-xs font-semibold py-1 px-3 rounded-lg text-white"
                   :class="getSeverityClass(accommodation.status)">
                  {{ accommodation.status }}
              </div>
          </div>
          
          <div class="p-4">
            <h4 class="text-xl font-bold text-gray-800 mb-1"
                style="font-family: 'Playfair Display', serif;">
                {{ accommodation.name }}
            </h4>
            <p class="text-gray-600 text-sm mb-2">{{ accommodation.capacity }}</p>
            
            <div class="flex justify-between items-center mb-4">
                <span class="text-indigo-600 font-extrabold text-lg">{{ accommodation.price }}</span>
                <span class="text-gray-400 text-xs">{{ accommodation.status }}</span>
            </div>
            
            <button class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
// Import both API methods
import { getAccommodations, getDestinations } from '@/api';

// --- STATE ---
const accommodations = ref([]);
const destinations = ref([]); 
const selectedCountry = ref(null);
const hoveredDestination = ref(null);

// --- UTILITY: Retry Logic ---
const retry = async (fn, retries = 5, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Failed to execute function, retrying in ${delay}ms... Attempts left: ${retries - 1}`);
      await new Promise(res => setTimeout(res, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};

// --- DATA FETCHING ---

// 1. Fetch Accommodations (Handles Array or Object structure)
const fetchAccommodations = async () => {
  try {
    // Pass selectedCountry.value to the API call if your backend supports filtering by country
    // If client-side filtering is needed instead, fetch all and filter locally. 
    // Assuming backend filtering here:
    const responseData = await retry(() => getAccommodations(selectedCountry.value));
    
    // Normalize response
    let dataToUse = [];
    if (Array.isArray(responseData)) {
        dataToUse = responseData;
    } else if (responseData && Array.isArray(responseData.data)) {
        dataToUse = responseData.data;
    } else {
        console.error("Accommodation API returned unexpected data structure:", responseData);
        accommodations.value = [];
        return;
    }

    // Optional: Client-side filtering if backend doesn't handle it
    // if (selectedCountry.value) {
    //    dataToUse = dataToUse.filter(acc => acc.country === selectedCountry.value);
    // }

    accommodations.value = dataToUse;

  } catch (error) {
    console.error('Failed to fetch accommodations after multiple retries:', error);
  }
};

// 2. Fetch Destinations (Handles Array or Object structure)
const fetchDestinations = async () => {
  try {
    const responseData = await retry(getDestinations);
    
    if (Array.isArray(responseData)) {
        destinations.value = responseData;
    } else if (responseData && Array.isArray(responseData.data)) {
        destinations.value = responseData.data;
    } else {
        console.error("Destination API returned unexpected data structure:", responseData);
        destinations.value = [];
    }
  } catch (error) {
    console.error('Failed to fetch destinations after multiple retries:', error);
  }
};

// --- EVENT HANDLERS ---

const handleCountrySelect = (countryName) => {
    selectedCountry.value = countryName;
    // Re-fetch accommodations based on the new selection
    // Note: This relies on getAccommodations accepting an argument, or you filtering client-side
    fetchAccommodations();
    
    // Smooth scroll to accommodations
    setTimeout(() => {
        window.scrollTo({ top: window.scrollY + 400, behavior: 'smooth' });
    }, 100);
};

const clearCountrySelection = () => {
    selectedCountry.value = null;
    fetchAccommodations(); // Fetch all again
};

// --- TEMPLATE HELPERS ---

const getSeverityClass = (status) => {
  switch (status) {
    case 'Available': return 'bg-green-500';
    case 'Limited': return 'bg-yellow-500';
    case 'Booked': return 'bg-red-500';
    default: return 'bg-blue-500';
  }
};

const getDestinationDescription = (countryName) => {
    const dest = destinations.value.find(d => d.name === countryName);
    return dest ? dest.description : 'Description not found.';
};

const getAffiliateLink = (countryName) => {
    const dest = destinations.value.find(d => d.name === countryName);
    return dest ? dest.affiliate_link : '#';
};

// --- LIFECYCLE ---
onMounted(() => {
  fetchDestinations();
  fetchAccommodations();
});
</script>

<style scoped>
/* Scoped styles if needed, though Tailwind handles most styling */
</style>