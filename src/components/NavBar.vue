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
        <span>Pago Airways</span> </a>

      <ul class="flex space-x-6">
        <li>
          <a href="#home" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'text-gray-800 hover:text-gray-600': !isTransparent, 'text-white hover:text-gray-300': isTransparent }
          ]">Home</a>
        </li>
         <li>
          <a href="#aboutus" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'text-gray-800 hover:text-gray-600': !isTransparent, 'text-white hover:text-gray-300': isTransparent }
          ]">About Us</a>
        </li>
        <li>
          <a href="#destinations" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'text-gray-800 hover:text-gray-600': !isTransparent, 'text-white hover:text-gray-300': isTransparent }
          ]">Destinations</a>
        </li>
        <li>
          <a href="http://localhost:5173/IATA" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'text-gray-800 hover:text-gray-600': !isTransparent, 'text-white hover:text-gray-300': isTransparent }
          ]">IATA courses</a>
        </li>
        <li>
          <a href="#contact" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'text-gray-800 hover:text-gray-600': !isTransparent, 'text-white hover:text-gray-300': isTransparent }
          ]">Contact</a>
        </li>
        <li>
          <a href="#blog" :class="[
            'hover:text-gray-300 transition-colors duration-200',
            { 'text-gray-800 hover:text-gray-600': !isTransparent, 'text-white hover:text-gray-300': isTransparent }
          ]">Blog</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isTransparent = ref(true);
const callToActionSection = ref(null);

const handleScroll = () => {
  if (callToActionSection.value) {
    const rect = callToActionSection.value.getBoundingClientRect();
    isTransparent.value = rect.bottom > window.innerHeight * 0.8;
  } else {
    isTransparent.value = window.scrollY < 50;
  }
};

onMounted(() => {
  callToActionSection.value = document.getElementById('call-to-action-section');
  if (!callToActionSection.value) {
      console.warn("CallToAction section with ID 'call-to-action-section' not found. Navbar transparency might not work as expected.");
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* No specific scoped styles needed if using Tailwind extensively */
</style>