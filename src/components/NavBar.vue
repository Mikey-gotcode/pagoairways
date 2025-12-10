<template>
  <nav :class="[
    'fixed w-full z-50 transition-colors duration-300 ease-in-out py-4',
    { 'bg-white shadow-md': !isTransparent, 'bg-transparent': isTransparent }
  ]">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <a href="#" :class="['font-bold text-2xl flex items-center space-x-2', { 'text-gray-800': !isTransparent, 'text-white': isTransparent }]">
          <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" />
          </svg>
        <span>Pago Airways</span>
      </a>

      <button @click="toggleMobileMenu" class="md:hidden text-gray-800 focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <ul :class="['hidden md:flex space-x-6', { 'text-gray-800': !isTransparent, 'text-white': isTransparent }]">
        <li>
          <a href="#home" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'hover:text-gray-600': !isTransparent, 'hover:text-gray-300': isTransparent }
          ]">Home</a>
        </li>
         <li>
          <a href="#aboutus" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'hover:text-gray-600': !isTransparent, 'hover:text-gray-300': isTransparent }
          ]">About Us</a>
        </li>
        <li>
          <a href="#destinations" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'hover:text-gray-600': !isTransparent, 'hover:text-gray-300': isTransparent }
          ]">Destinations</a>
        </li>
          <router-link to="/IATA" :class="[
        'hover:text-gray-300 transition-colors duration-200',
        { 'hover:text-gray-600': !isTransparent, 'hover:text-gray-300': isTransparent }
      ]">
        IATA courses
      </router-link>
      <router-link to="/bookflight" :class="[
        'hover:text-gray-300 transition-colors duration-200',
        { 'hover:text-gray-600': !isTransparent, 'hover:text-gray-300': isTransparent }
      ]">
        Book Flight
      </router-link>

        <li>
          <a href="#contact" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'hover:text-gray-600': !isTransparent, 'hover:text-gray-300': isTransparent }
          ]">Contact</a>
        </li>
        <li>
          <a href="#blog" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'hover:text-gray-600': !isTransparent, 'hover:text-gray-300': isTransparent }
          ]">Blog</a>
        </li>
      </ul>

      <div v-if="isMobileMenuOpen" class="absolute top-full left-0 w-full bg-white shadow-md py-4 md:hidden">
        <ul class="flex flex-col space-y-4 px-4 text-gray-800">
             <li>
                <a href="#home" class="hover:text-gray-600" @click="toggleMobileMenu">Home</a>
             </li>
             <li>
                <a href="#aboutus" class="hover:text-gray-600" @click="toggleMobileMenu">About Us</a>
             </li>
            <li>
                <a href="#destinations" class="hover:text-gray-600" @click="toggleMobileMenu">Destinations</a>
            </li>
            <li>
                <a href="https://pagoairways.netlify.app/IATA" class="hover:text-gray-600" @click="toggleMobileMenu">IATA courses</a>
            </li>
            <li>
                <a href="#contact" class="hover:text-gray-600" @click="toggleMobileMenu">Contact</a>
            </li>
            <li>
                <a href="#blog" class="hover:text-gray-600" @click="toggleMobileMenu">Blog</a>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isTransparent = ref(true);
const isMobileMenuOpen = ref(false); // State to control mobile menu visibility
const callToActionSection = ref(null); // Reference to the CallToAction section

const handleScroll = () => {
  // Check if callToActionSection is available to avoid errors
  if (callToActionSection.value) {
    const rect = callToActionSection.value.getBoundingClientRect();
    // Navbar is transparent if the bottom of the CTA section is within 80% of the viewport
    isTransparent.value = rect.bottom > window.innerHeight * 0.8;
  } else {
    // Fallback: Navbar is transparent if scrolled less than 50 pixels from the top
    isTransparent.value = window.scrollY < 50;
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

onMounted(() => {
  // Get the element with the ID 'call-to-action-section'
  callToActionSection.value = document.getElementById('call-to-action-section');
  if (!callToActionSection.value) {
      console.warn("CallToAction section with ID 'call-to-action-section' not found. Navbar transparency might not work as expected.");
  }

  // Add scroll event listener when the component is mounted
  window.addEventListener('scroll', handleScroll);
  // Call handleScroll once to set initial state
  handleScroll();
});

onBeforeUnmount(() => {
  // Remove scroll event listener when the component is unmounted to prevent memory leaks
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* No specific scoped styles needed if using Tailwind extensively */
</style>