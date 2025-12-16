<template>
  <main class="container mx-auto px-4 py-8"> <section class="mb-12"> <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Popular Destinations</h2>

      <div v-if="destinations.length === 0" class="text-center py-8 text-gray-500">
        Loading destinations...
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="destination in destinations" :key="destination.id"
             class="destination-card relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl group"
             @click="handleCountrySelect(destination.name)">

            <img :src="destination.image_url" :alt="destination.name" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110">

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
                <button @click="clearCountrySelection" class="text-gray-500 hover:text-red-600 transition">
                    <span class="sr-only">Close</span>
                    <i class="pi pi-times text-xl"></i>
                </button>
            </div>

            <div class="mb-4">
                <p class="text-sm text-gray-600 leading-relaxed">{{ getDestinationDescription(selectedCountry) }}</p>
                <a :href="getAffiliateLink(selectedCountry)" target="_blank" class="mt-3 inline-block bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded hover:bg-indigo-700 transition">
                    Explore More
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

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" id="destinations">
        <div v-for="flight in flights"
             :key="flight.id"
             class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg flex flex-col">

          <div class="relative h-40"> <img loading="eager" :src="flight.image_url || 'https://via.placeholder.com/600x400?text=Flight+Logo'" :alt="flight.airline"
                   class="w-full h-full object-cover bg-gray-50" />

              <div class="absolute top-2 right-2 text-[10px] uppercase font-bold py-1 px-2 rounded text-white shadow-sm"
                   :class="getSeverityClass(flight.status)">
                  {{ flight.status }}
              </div>
          </div>

          <div class="p-3 flex flex-col flex-grow"> <div class="flex-grow">
                <h4 class="text-lg font-bold text-gray-800 mb-1 truncate"
                    style="font-family: 'Playfair Display', serif;">
                    {{ flight.airline }}
                </h4>
                <p class="text-gray-500 text-xs mb-3 flex items-center">
                   To: <span class="font-semibold ml-1 text-gray-700">{{ flight.destination || 'N/A' }}</span>
                </p>
            </div>

            <div class="flex justify-between items-end mt-2 pt-2 border-t border-gray-50">
                <span class="text-indigo-600 font-bold text-lg">{{ flight.price }}</span>
                <!-- <button class="bg-indigo-50 text-indigo-700 text-xs font-bold py-1.5 px-3 rounded hover:bg-indigo-100 transition">
                  Book
                </button> -->
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
// 1. Only import getFlights and getDestinations
import { getDestinations, getFlights } from '@/api';

// --- STATE ---
// Removed accommodations state
const destinations = ref([]);
const flights = ref([]);
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

// Removed fetchAccommodations

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

    const destinationNames = destinationArray.map(d => d.name);
    console.log(`[DESTINATIONS FETCH] Success. Loaded destination names: ${destinationNames.join(', ')}`);


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

    // Smooth scroll to the product list
    setTimeout(() => {
        // Scroll to the flight section title
        const targetSection = document.querySelector('h2.text-3xl.font-bold');
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

// --- TEMPLATE HELPERS (Updated to include flight statuses) ---

const getSeverityClass = (status) => {
  switch (status) {
    case 'Available': return 'bg-green-500';
    case 'Limited': return 'bg-yellow-500';
    case 'Booked': return 'bg-red-500';
    case 'Delayed': return 'bg-orange-500'; // New flight status
    case 'Canceled': return 'bg-red-700';   // New flight status
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
/* Scoped styles if needed, though Tailwind handles most styling */
</style>