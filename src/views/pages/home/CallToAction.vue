<template>
  <div class="relative h-screen w-full overflow-hidden">
    <video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover">
        <source src="/src/assets/videos/pagobackground.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-4">

      <div class="mb-6">
          <svg class="w-full h-full text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" />
          </svg>
      </div>

      <p class="text-xl md:text-2xl tracking-widest uppercase mb-4 font-light text-center"
         style="font-family: 'Dancing Script', cursive;">
        Welcome to
      </p>

      <div class="w-full text-center">
          <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8"
            style="font-family: 'Cinzel Decorative', serif; color: #2A47EEFF; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">
            <span style="color: #2A47EEFF;">PAGO</span> <br><span style="color: #FF0000;">AIRWAYS</span>
          </h1>
      </div>

      <a href="#"
          class="border-2 border-white text-white px-8 py-3 text-lg uppercase tracking-wider hover:bg-white hover:text-black transition duration-300 ease-in-out text-center">
          Learn More
      </a>

      <p class="mt-20 text-lg md:text-xl tracking-widest uppercase font-light opacity-80 mb-4 text-center"
         style="font-family: 'Cormorant Garamond', serif;">
          Local and International Tours
      </p>
    </div>
  </div>
</template>

<script setup>
    // No script logic needed for this static component
</script>

<style scoped>
    /* Your existing scoped styles */
</style>