<template>
  <main class="container mx-auto px-4 py-12">

    <section class="mb-16">
      <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 class="text-4xl font-bold mb-4">Discover Your Next Adventure</h2>
        <p class="text-xl mb-6">Explore breathtaking destinations and find your perfect flight</p>
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
        {{ selectedCountry ? `Available Flights to ${selectedCountry}` : 'Available Flights' }}
      </h2>

      <div v-if="flights.length === 0" class="text-center py-10 text-gray-500">
        {{ selectedCountry ? 'No flights found for this destination.' : 'Loading flights...' }}
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="flight in flights"
             :key="flight.id"
             class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl">

          <div class="relative">
              <img loading="eager" :src="flight.image_url || 'https://via.placeholder.com/600x400?text=Flight+Logo'" :alt="flight.airline"
                   class="w-full h-48 object-cover bg-gray-100 p-2" />

              <div class="absolute top-2 right-2 text-xs font-semibold py-1 px-3 rounded-lg text-white"
                   :class="getSeverityClass(flight.status)">
                  {{ flight.status }}
              </div>
          </div>

          <div class="p-4">
            <h4 class="text-xl font-bold text-gray-800 mb-1"
                style="font-family: 'Playfair Display', serif;">
                {{ flight.airline }}
            </h4>
            <p class="text-gray-600 text-sm mb-2">To: **{{ flight.destination || 'N/A' }}**</p>
            <p class="text-gray-600 text-sm mb-2">Depart: {{ flight.departure_time || 'N/A' }} | Arrive: {{ flight.arrival_time || 'N/A' }}</p>

            <div class="flex justify-between items-center mb-4">
                <span class="text-indigo-600 font-extrabold text-lg">{{ flight.price }}</span>
                <span class="text-gray-400 text-xs">{{ flight.status }}</span>
            </div>

            <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Book Flight
            </button>
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