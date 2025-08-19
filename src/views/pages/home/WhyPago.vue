<template>
  <section class="min-h-screen flex flex-col">
    <div class="flex flex-col lg:flex-row flex-grow"> <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white text-center lg:text-left">
        <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            style="font-family: 'Playfair Display', serif; color: #2A47EEFF;"
            data-aos="fade-right">
          WHY <br>PAGO <br>AIRWAYS
        </h2>
      </div>

      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden"
           style="background-image: url('/src/assets/images/blobs_background.png'); background-size: cover; background-position: center;">
        <div class="absolute w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 filter blur-xl opacity-70 transform -translate-x-1/2 -translate-y-1/2 top-1/4 left-1/4"></div>
        <div class="absolute w-28 h-28 md:w-40 md:h-40 lg:w-52 lg:h-52 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-500 filter blur-xl opacity-70 transform translate-x-1/2 translate-y-1/2 bottom-1/4 right-1/4"></div>
        <div class="absolute w-20 h-20 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-full bg-gradient-to-br from-pink-400 to-red-400 filter blur-xl opacity-70 transform translate-x-1/3 -translate-y-1/3 top-3/4 right-1/3"></div>
        <div class="absolute w-24 h-24 md:w-36 md:h-36 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 filter blur-xl opacity-70 transform -translate-x-1/4 translate-y-1/4 bottom-1/3 left-1/3"></div>
      </div>
    </div>

    <div class="w-full bg-red-500 p-8 md:p-12 lg:p-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center flex-shrink-0"> <div v-for="(stat, index) in stats" :key="stat.id" class="flex flex-col items-center justify-center"
           data-aos="fade-up" :data-aos-delay="index * 150">
        <span class="text-5xl md:text-6xl lg:text-7xl font-bold mb-2"
              style="color: #2A47EEFF;">
          <VueCounter :start-amount="0" :end-amount="stat.value" :duration="10" :prefix="stat.prefix" :suffix="stat.suffix" />
        </span>
        <p class="text-base md:text-lg uppercase tracking-wider"
           style="font-family: 'Cormorant Garamond', serif; color: white;">
          {{ stat.label }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import VueCounter from 'vue3-autocounter';

const stats = ref([
  { id: 'year', label: 'YEAR FOUNDED', value: 1981, prefix: '', suffix: '' },
  { id: 'clients', label: 'NUMBER OF CLIENTS', value: 2000, prefix: '', suffix: '+' },
  { id: 'countries', label: 'COUNTRIES WORLDWIDE', value: 10, prefix: '', suffix: '' },
  { id: 'awards', label: 'INDUSTRY AWARDS', value: 100, prefix: '', suffix: '' }
]);
</script>

<style scoped>
/* Scoped styles if needed */
</style>