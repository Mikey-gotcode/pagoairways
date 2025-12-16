<template>
  <main class="container mx-auto px-4 py-8 relative">
    
    <section class="mb-12" >
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Popular Destinations</h2>
      
      <div v-if="destinations.length === 0" class="text-center py-8 text-gray-500">
        Loading destinations...
      </div>

      <div v-else id="destinations">
        <Carousel :value="destinations" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" :circular="true" :autoplayInterval="4000">
            <template #item="slotProps">
                <div class="destination-card relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl group mx-2 mb-4"
                     @click="handleCountrySelect(slotProps.data.name)">
                    
                    <img :src="slotProps.data.image_url" :alt="slotProps.data.name" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    
                    <div class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                        <h3 class="text-white text-2xl font-bold tracking-wide drop-shadow-md">{{ slotProps.data.name }}</h3>
                    </div>
                </div>
            </template>
        </Carousel>
      </div>
    </section>

    <section v-if="selectedCountry" class="mb-12 animate-fade-in-down">
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100 relative">
             <button @click="clearCountrySelection" class="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition p-2">
                <i class="pi pi-times text-xl"></i>
            </button>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedCountry }}</h2>
            
            <div class="mb-4">
                <h3 class="text-lg font-semibold mb-2 text-gray-700">About Destination</h3>
                <p class="text-gray-600 leading-relaxed">{{ getDestinationDescription(selectedCountry) }}</p>
                
                <a :href="getAffiliateLink(selectedCountry)" target="_blank" class="mt-4 inline-flex items-center bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-indigo-700 transition">
                    Explore More <i class="pi pi-external-link ml-2"></i>
                </a>
            </div>
        </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800"
          style="font-family: 'Playfair Display', serif;">
        {{ selectedCountry ? `Flights to ${selectedCountry}` : 'Available Flights' }}
      </h2>

      <div v-if="flights.length === 0" class="text-center py-8 text-gray-500">
        {{ selectedCountry ? 'No flights found for this destination.' : 'Loading flights...' }}
      </div>

      <div v-else>
        <Carousel :value="flights" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" :circular="false">
            <template #item="slotProps">
                <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg flex flex-col mx-2 h-full mb-4">

                  <div class="relative h-40"> 
                      <img loading="lazy" :src="slotProps.data.image_url || 'https://via.placeholder.com/600x400?text=Flight+Logo'" :alt="slotProps.data.airline"
                          class="w-full h-full object-cover bg-gray-50" />

                      <div class="absolute top-2 right-2 text-[10px] uppercase font-bold py-1 px-2 rounded text-white shadow-sm"
                          :class="getSeverityClass(slotProps.data.status)">
                          {{ slotProps.data.status }}
                      </div>
                  </div>

                  <div class="p-3 flex flex-col flex-grow"> 
                      <div class="flex-grow">
                          <h4 class="text-lg font-bold text-gray-800 mb-1 truncate"
                              style="font-family: 'Playfair Display', serif;">
                              {{ slotProps.data.airline }}
                          </h4>
                          <p class="text-gray-500 text-xs mb-3 flex items-center">
                            To: <span class="font-semibold ml-1 text-gray-700">{{ slotProps.data.destination || 'N/A' }}</span>
                          </p>
                      </div>

                      <div class="flex justify-between items-end mt-2 pt-2 border-t border-gray-50">
                          <span class="text-indigo-600 font-bold text-lg">{{ slotProps.data.price }}</span>
                          <!-- <button class="bg-blue-600 text-white text-xs font-semibold py-1.5 px-4 rounded hover:bg-blue-700 transition">
                            Book Flight
                          </button> -->
                      </div>
                  </div>
                </div>
            </template>
        </Carousel>
      </div>
    </section>

  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getDestinations, getFlights } from '@/api';
// IMPORT PRIMEVUE COMPONENT
import Carousel from 'primevue/carousel';


// --- STATE ---
const destinations = ref([]);
const flights = ref([]);
const selectedCountry = ref(null);

// --- CAROUSEL CONFIGURATION ---
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1, // Forces the single-card mobile view
        numScroll: 1
    }
]);


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

const fetchFlights = async () => {
    console.log(`[FLIGHTS FETCH] Starting fetch. Selected country filter: ${selectedCountry.value}`);

    try {
        const responseData = await retry(() => getFlights(selectedCountry.value));

        let dataToUse = [];
        if (Array.isArray(responseData)) {
            dataToUse = responseData;
        } else if (responseData && Array.isArray(responseData.data)) {
            dataToUse = responseData.data;
        } else {
            console.error("[FLIGHTS FETCH] API returned unexpected data structure:", responseData);
            dataToUse = [];
        }

        flights.value = dataToUse;
        console.log(`[FLIGHTS FETCH] Success. Total items received: ${dataToUse.length}`);

    } catch (error) {
        console.error('[FLIGHTS FETCH] Failed to fetch after multiple retries:', error);
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
    console.log(`[DESTINATIONS FETCH] Success. Loaded destination names: ${destinationArray.map(d => d.name).join(', ')}`);


  } catch (error) {
    console.error('[DESTINATIONS FETCH] Failed to fetch destinations after multiple retries:', error);
  }
};

// --- EVENT HANDLERS ---

const handleCountrySelect = (countryName) => {
    console.log(`[COUNTRY SELECT] User selected: ${countryName}. Setting filter.`);
    selectedCountry.value = countryName;
    
    // Only fetch flights based on the new selection
    fetchFlights();

    // Smooth scroll to the about section
    setTimeout(() => {
        const targetSection = document.querySelector('h2.text-2xl.font-bold');
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
};

const clearCountrySelection = () => {
    console.log("[COUNTRY SELECT] Clearing country selection. Resetting filter to null.");
    selectedCountry.value = null;
    fetchFlights(); // Fetch all again
};

// --- TEMPLATE HELPERS ---

const getSeverityClass = (status) => {
  switch (status) {
    case 'Available': return 'bg-green-500';
    case 'Limited': return 'bg-yellow-500';
    case 'Booked': return 'bg-red-500';
    case 'Delayed': return 'bg-orange-500'; 
    case 'Canceled': return 'bg-red-700';   
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
  fetchFlights(); // Fetch initial flight data
});
</script>

<style scoped>
/* Scoped styles for PrimeVue Carousel buttons and indicators */
:deep(.p-carousel-prev), :deep(.p-carousel-next) {
    background: rgba(79, 70, 229, 0.1);
    color: #4f46e5;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin: 0 5px;
}
:deep(.p-carousel-prev:hover), :deep(.p-carousel-next:hover) {
    background: #4f46e5;
    color: white;
}
:deep(.p-carousel-indicator-button) {
    background-color: #e5e7eb;
    height: 6px;
    border-radius: 4px;
}
:deep(.p-carousel-indicator.p-highlight .p-carousel-indicator-button) {
    background-color: #4f46e5;
}
</style>