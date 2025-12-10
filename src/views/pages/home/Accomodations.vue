<template>
  <main class="container mx-auto px-4 py-12">
    
    <section class="mb-16">
      <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 class="text-4xl font-bold mb-4">Discover Your Next Adventure</h2>
        <p class="text-xl mb-6">Explore breathtaking destinations and find your perfect stay</p>
        <div class="relative max-w-md">
          <input type="text" placeholder="Search destinations..." class="w-full py-3 px-4 rounded-full text-gray-800 focus:outline-none">
          <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full">
            <i data-feather="search"></i>
          </button>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-gray-800">Popular Destinations</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        </div>
    </section>
    
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-gray-800"
          style="font-family: 'Playfair Display', serif;">
        Available Accommodations
      </h2>
      
      <div v-if="accommodations.length === 0" class="text-center py-10 text-gray-500">
        Loading accommodations...
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="accommodation in accommodations" 
             :key="accommodation.id" 
             class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl"
             data-aos="zoom-in" :data-aos-delay="accommodation.id * 50">
          
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
    <section v-if="selectedCountry" class="mb-16">
      </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
// Removed PrimeVue component imports (Carousel, Tag, Button)

// Keeping the external API call utility import
import { getAccommodations } from '@/api';

// State for accommodation data and other reactive variables
const accommodations = ref([]);
const selectedCountry = ref(null); // Assuming this is needed for the Country Details section

// The original retry function (retained)
const retry = async (fn, retries = 5, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Failed to fetch accommodations, retrying in ${delay}ms... Attempts left: ${retries - 1}`);
      await new Promise(res => setTimeout(res, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};

// The original fetch function (retained)
const fetchAccommodations = async () => {
  try {
    // Wrap the API call with the retry function
    const responseData = await retry(getAccommodations);
    
    // Assuming getAccommodations returns the JSON object directly (e.g., Axios response.data)
    // and we need to access the 'data' key as shown in your JSON sample:
    if (responseData && responseData.status === 'success' && Array.isArray(responseData.data)) {
        accommodations.value = responseData.data;
    } else {
        // Handle case where API response is unexpected, even if the call succeeded
        console.error("API call succeeded but returned unexpected data structure:", responseData);
        accommodations.value = [];
    }

  } catch (error) {
    console.error('Failed to fetch accommodations after multiple retries:', error);
    // Optionally display an error message to the user here
  }
};

// New function to map status to Tailwind CSS classes (adapted from getSeverity)
const getSeverityClass = (status) => {
  switch (status) {
    case 'Available':
      return 'bg-green-500'; // Success color
    case 'Limited':
      return 'bg-yellow-500'; // Warning color
    case 'Booked':
      return 'bg-red-500'; // Danger color
    default:
      return 'bg-blue-500'; // Info color
  }
};

// Removed responsiveOptions as it was only for PrimeVue Carousel

onMounted(() => {
  fetchAccommodations();
});

// Helper functions for the Destination sections would need to be added here if they were part of the original script
// e.g., const destinations = ref([...]);
// const getDestinationDescription = (country) => { /* ... */ };
// const getAffiliateLink = (country) => { /* ... */ };
</script>

<style scoped>
/* Removed old section styles and kept any original main styles if applicable */
</style>