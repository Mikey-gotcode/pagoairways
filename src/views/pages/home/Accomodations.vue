<template>
  <main class="container mx-auto px-4 py-8">
    
    <section class="mb-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Popular Destinations</h2>
      
      <div v-if="destinations.length === 0" class="text-center py-8 text-gray-500">
        Loading destinations...
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="destination in destinations" :key="destination.id" 
             class="destination-card relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl group"
             @click="handleCountrySelect(destination.name)">
             
            <img :src="destination.image_url" :alt="destination.name" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105">
            
            <div class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                <h3 class="text-white text-xl font-bold tracking-wide drop-shadow-md">{{ destination.name }}</h3>
            </div>
        </div>
      </div>
    </section>
    
    <section v-if="selectedCountry" class="mb-12">
        <div class="bg-white rounded-lg shadow-md p-5 border border-gray-100">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-800">{{ selectedCountry }}</h2>
                <button @click="clearCountrySelection" class="text-gray-400 hover:text-gray-700 font-bold">
                    ✕
                </button>
            </div>

            <div class="mb-4">
                <h3 class="text-lg font-semibold mb-2 text-gray-700">About {{ selectedCountry }}</h3>
                <p class="text-sm text-gray-600">{{ getDestinationDescription(selectedCountry) }}</p>
                <a :href="getAffiliateLink(selectedCountry)" target="_blank" class="mt-3 inline-block bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded hover:bg-indigo-700 transition">
                    Explore More
                </a>
            </div>
        </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800"
          style="font-family: 'Playfair Display', serif;">
        {{ selectedCountry ? `Stays in ${selectedCountry}` : 'Available Accommodations' }}
      </h2>
      
      <div v-if="accommodations.length === 0" class="text-center py-8 text-gray-500">
        {{ selectedCountry ? 'No accommodations found.' : 'Loading accommodations...' }}
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="accommodation in accommodations" 
             :key="accommodation.id" 
             class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg flex flex-col">
          
          <div class="relative h-40">
              <img loading="eager" :src="accommodation.image_url" :alt="accommodation.name" 
                   class="w-full h-full object-cover" />
              
              <div class="absolute top-2 right-2 text-[10px] uppercase font-bold py-1 px-2 rounded-md text-white shadow-sm"
                   :class="getSeverityClass(accommodation.status)">
                  {{ accommodation.status }}
              </div>
          </div>
          
          <div class="p-3 flex flex-col flex-grow">
            <h4 class="text-lg font-bold text-gray-800 mb-1 leading-tight"
                style="font-family: 'Playfair Display', serif;">
                {{ accommodation.name }}
            </h4>
            
            <div class="text-xs text-gray-500 mb-3 space-y-1">
                <p class="flex items-center"><i class="pi pi-map-marker mr-1"></i> {{ accommodation.destination || 'N/A' }}</p>
                <p class="flex items-center"><i class="pi pi-users mr-1"></i> {{ accommodation.capacity }}</p>
            </div>
            
            <div class="mt-auto flex justify-between items-center pt-2 border-t border-gray-100">
                <span class="text-indigo-600 font-extrabold text-lg">{{ accommodation.price }}</span>
                <button class="bg-indigo-600 text-white text-xs font-semibold py-1.5 px-4 rounded hover:bg-indigo-700 transition">
                  View
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { getAccommodations, getDestinations } from '@/api';

// --- STATE ---
const accommodations = ref([]);
const destinations = ref([]); 
const selectedCountry = ref(null);
const hoveredDestination = ref(null);

// --- UTILITY: Retry Logic (Unchanged) ---
const retry = async (fn, retries = 5, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.warn(`[RETRY LOGIC] Function failed, retrying in ${delay}ms... Attempts left: ${retries - 1}`);
      await new Promise(res => setTimeout(res, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};

// --- DATA FETCHING ---

const fetchAccommodations = async () => {
  // 🎯 LOG 1: What filter value is being sent to the backend?
  console.log(`[ACCOMMODATIONS FETCH] Starting fetch. Selected country filter: ${selectedCountry.value}`);
  
  try {
    // getAccommodations(selectedCountry.value) is where the API call happens
    const responseData = await retry(() => getAccommodations(selectedCountry.value));
    
    let dataToUse = [];
    if (Array.isArray(responseData)) {
        dataToUse = responseData;
    } else if (responseData && Array.isArray(responseData.data)) {
        dataToUse = responseData.data;
    } else {
        console.error("[ACCOMMODATIONS FETCH] API returned unexpected data structure:", responseData);
        accommodations.value = [];
        return;
    }

    accommodations.value = dataToUse;
    
    // 🎯 LOG 2: How many results did the backend return?
    console.log(`[ACCOMMODATIONS FETCH] Success. Total items received: ${dataToUse.length}`);
    
    // 🎯 LOG 3: Inspect the first item's destination property for a successful match.
    if (dataToUse.length > 0) {
        console.log(`[ACCOMMODATIONS FETCH] First item destination property: ${dataToUse[0].destination}`);
    }


  } catch (error) {
    console.error('[ACCOMMODATIONS FETCH] Failed to fetch after multiple retries:', error);
  }
};

const fetchDestinations = async () => {
  console.log("[DESTINATIONS FETCH] Starting fetch for popular destinations list.");
  try {
    const responseData = await retry(getDestinations);
    
    let destinationArray = [];

    if (Array.isArray(responseData)) {
        destinationArray = responseData;
    } else if (responseData && Array.isArray(responseData.data)) {
        destinationArray = responseData.data;
    } else {
        console.error("[DESTINATIONS FETCH] API returned unexpected data structure:", responseData);
        destinations.value = [];
        return;
    }

    destinations.value = destinationArray;
    
    // 🎯 LOG 4: Log the names that were loaded into the destination list.
    const destinationNames = destinationArray.map(d => d.name);
    console.log(`[DESTINATIONS FETCH] Success. Loaded destination names: ${destinationNames.join(', ')}`);


  } catch (error) {
    console.error('[DESTINATIONS FETCH] Failed to fetch destinations after multiple retries:', error);
  }
};

// --- EVENT HANDLERS ---

const handleCountrySelect = (countryName) => {
    // 🎯 LOG 5: What destination name was clicked?
    console.log(`[COUNTRY SELECT] User selected: ${countryName}. Setting filter.`);

    selectedCountry.value = countryName;
    
    // Re-fetch accommodations based on the new selection
    fetchAccommodations();
    
    // Smooth scroll to accommodations
    setTimeout(() => {
        window.scrollTo({ top: window.scrollY + 400, behavior: 'smooth' });
    }, 100);
};

const clearCountrySelection = () => {
    console.log("[COUNTRY SELECT] Clearing country selection. Resetting filter to null.");
    selectedCountry.value = null;
    fetchAccommodations(); // Fetch all again
};

// --- TEMPLATE HELPERS (Unchanged) ---

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

// --- LIFECYCLE (Unchanged) ---
onMounted(() => {
  fetchDestinations();
  fetchAccommodations();
});
</script>

<style scoped>
/* Scoped styles if needed, though Tailwind handles most styling */
</style>