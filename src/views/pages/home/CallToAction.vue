<template>
  <div id="call-to-action-section" class="relative h-screen w-full overflow-hidden">
    <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover" :src="videoSource" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">

      <div class="mb-4 sm:mb-6 md:mb-8">
          <svg class="w-24 h-24 sm:w-32 sm:h-32 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" />
          </svg>
      </div>

      <p class="text-lg sm:text-xl md:text-2xl tracking-widest uppercase mb-2 sm:mb-4 font-light text-center"
         style="font-family: 'Dancing Script', cursive; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
        Welcome to
      </p>

      <div class="w-full text-center">
          <h1 class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6"
            style="font-family: 'Cinzel Decorative', serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">
            <span class="text-[#2A47EEFF]">PAGO</span> <br class="sm:hidden"><span class="text-[#FF0000]">AIRWAYS</span>
          </h1>
      </div>

      <a href="#"
          class="border-2 border-white text-white px-6 py-2 sm:px-8 sm:py-3 text-base sm:text-lg uppercase tracking-wider hover:bg-white hover:text-black transition duration-300 ease-in-out text-center">
          Learn More
      </a>

      <p class="mt-8 sm:mt-12 md:mt-20 text-sm sm:text-base md:text-xl tracking-widest uppercase font-light opacity-80 text-center"
         style="font-family: 'Cormorant Garamond', serif; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
          Local and International Tours
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const videoSource = ref('');
const isMobilePortrait = window.matchMedia('(max-width: 767px) and (orientation: portrait)');

const setVideoSource = (e) => {
  if (e.matches) {
    // If it's a mobile device in portrait mode
    videoSource.value = '/assets/videos/pago-portrait.mp4';
  } else {
    // For all other devices (laptops, tablets, landscape mobile)
    videoSource.value = '/assets/videos/pagobackground.mp4';
  }
};

onMounted(() => {
  setVideoSource(isMobilePortrait); // Set initial video
  isMobilePortrait.addEventListener('change', setVideoSource); // Listen for changes
});

onBeforeUnmount(() => {
  isMobilePortrait.removeEventListener('change', setVideoSource); // Clean up the listener
});
</script>

<style scoped>
    /* No additional scoped styles needed if using Tailwind extensively */
</style>