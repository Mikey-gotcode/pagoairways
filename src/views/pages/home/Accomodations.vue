<template>
  <main class="container mx-auto px-4 py-8 relative">
    
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
                <button @click="openAccommodationModal(accommodation)" class="bg-indigo-600 text-white text-xs font-semibold py-1.5 px-4 rounded hover:bg-indigo-700 transition">
                  View
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="selectedAccommodationDetails" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
         @click.self="closeAccommodationModal">
        
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-fade-in-up max-h-[90vh] flex flex-col">
            
            <button @click="closeAccommodationModal" 
                    class="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-red-600 rounded-full p-2 transition shadow-sm backdrop-blur-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div class="overflow-y-auto">
                <div class="relative h-64">
                    <img :src="selectedAccommodationDetails.image_url" 
                         :alt="selectedAccommodationDetails.name" 
                         class="w-full h-full object-cover">
                    <div class="absolute bottom-4 left-4">
                         <span class="text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-sm"
                               :class="getSeverityClass(selectedAccommodationDetails.status)">
                             {{ selectedAccommodationDetails.status }}
                         </span>
                    </div>
                </div>

                <div class="p-8">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-3xl font-bold text-gray-900" style="font-family: 'Playfair Display', serif;">
                            {{ selectedAccommodationDetails.name }}
                        </h2>
                        <span class="text-2xl font-bold text-indigo-600">
                            {{ selectedAccommodationDetails.price }}
                        </span>
                    </div>

                    <div class="flex items-center space-x-6 text-sm text-gray-600 mb-6 border-b border-gray-100 pb-6">
                        <span class="flex items-center">
                            <i class="pi pi-map-marker mr-2 text-indigo-500"></i>
                            {{ selectedAccommodationDetails.destination }}
                        </span>
                        <span class="flex items-center">
                            <i class="pi pi-users mr-2 text-indigo-500"></i>
                            {{ selectedAccommodationDetails.capacity }}
                        </span>
                    </div>

                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <h3 class="font-semibold text-lg text-gray-900">Description</h3>
                        <p>
                           {{ selectedAccommodationDetails.description || 'Experience comfort and luxury at its finest. This accommodation offers premium amenities and stunning views, perfect for your next getaway.' }}
                        </p>
                    </div>

                    <div class="mt-8 flex justify-end gap-3">
                        <button @click="closeAccommodationModal" class="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition">
                            Close
                        </button>
                        <button class="px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
const selectedAccommodationDetails = ref(null); // NEW: MODAL STATE

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

// --- MODAL ACTIONS ---
const openAccommodationModal = (accommodation) => {
    selectedAccommodationDetails.value = accommodation;
    document.body.style.overflow = 'hidden'; // Stop background scrolling
};

const closeAccommodationModal = () => {
    selectedAccommodationDetails.value = null;
    document.body.style.overflow = 'auto'; // Restore background scrolling
};

// --- DATA FETCHING (Unchanged) ---
const fetchAccommodations = async () => {
  console.log(`[ACCOMMODATIONS FETCH] Starting fetch. Selected country filter: ${selectedCountry.value}`);
  try {
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
    console.log(`[ACCOMMODATIONS FETCH] Success. Total items received: ${dataToUse.length}`);
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
  } catch (error) {
    console.error('[DESTINATIONS FETCH] Failed to fetch destinations after multiple retries:', error);
  }
};

// --- EVENT HANDLERS ---
const handleCountrySelect = (countryName) => {
    console.log(`[COUNTRY SELECT] User selected: ${countryName}. Setting filter.`);
    selectedCountry.value = countryName;
    fetchAccommodations();
    setTimeout(() => {
        window.scrollTo({ top: window.scrollY + 400, behavior: 'smooth' });
    }, 100);
};

const clearCountrySelection = () => {
    console.log("[COUNTRY SELECT] Clearing country selection. Resetting filter to null.");
    selectedCountry.value = null;
    fetchAccommodations(); 
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