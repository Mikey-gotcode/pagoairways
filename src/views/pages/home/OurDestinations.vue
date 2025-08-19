<template>
  <section class="py-16 bg-gradient-to-br from-red-900 to-red-950 text-white">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-12"
          style="font-family: 'Playfair Display', serif; color: #2A47EEFF;"
          data-aos="fade-up"> Our Destinations
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(destination, index) in destinations" :key="destination.id"
             :data-aos="getAosAnimation()" :data-aos-delay="getAosDelay(index)" class="bg-red-900 bg-opacity-70 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
          <img :src="destination.image_url" :alt="destination.name" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-semibold mb-3"
                style="font-family: 'Playfair Display', serif; color: #ffb7c5;">
              {{ destination.name }}
            </h3>
            <p class="text-gray-200 text-sm leading-relaxed">
              {{ destination.description }}
            </p>
            <div class="mt-4">
              <a :href="destination.affiliateLink" target="_blank" rel="noopener noreferrer"
                 class="inline-block bg-blue-500 text-green-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors duration-300">
                View Tours
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getDestinations } from '@/api.js'

// Placeholder data for destinations (your existing data)
const destinations = ref([]);


// Reactive variable to store the current number of columns based on screen size
const currentColumns = ref(1);
const fetchDestinations = async () => {
  try {
    const data = await getDestinations();
    destinations.value = data;
  } catch (error) {
    console.error('Failed to fetch destinations:', error);
  }
};

// Function to update currentColumns based on screen width
const updateColumns = () => {
  if (window.innerWidth >= 1024) { // lg breakpoint
    currentColumns.value = 3;
  } else if (window.innerWidth >= 768) { // md breakpoint
    currentColumns.value = 2;
  } else { // sm and below
    currentColumns.value = 1;
  }
};

onMounted(() => {
  updateColumns(); // Set initial columns on mount
  fetchDestinations();
  window.addEventListener('resize', updateColumns); // Listen for resize events
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumns); // Clean up listener
});


// Function to determine the AOS animation type
const getAosAnimation = () => {
  return 'fade-up'; // Always fade-up as requested
};

// Function to calculate the AOS delay based on row
const getAosDelay = (index) => {
  const rowNumber = Math.floor(index / currentColumns.value);
  // Base delay per row: 0ms for first row, 200ms for second, 400ms for third etc.
  return rowNumber * 200;
};
</script>

<style scoped>
/* You can add specific styles here if needed, but Tailwind handles most of the layout */
section {
  background-color: #fce4ec;
}
</style>