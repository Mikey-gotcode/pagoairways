<template>
  <section class="py-16 bg-gradient-to-br from-red-900 to-red-950 text-white">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-12"
          style="font-family: 'Playfair Display', serif; color: #2A47EEFF;">
        NEWS FEATURES
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(feature, index) in newsFeatures" :key="feature.id"
             class="bg-red-900 rounded-lg shadow-lg overflow-hidden flex flex-col" data-aos="fade-up" :data-aos-delay="index * 150">
          <div class="relative w-full h-56 md:h-64 lg:h-72 overflow-hidden">
            <img loading="lazy" :src="feature.image" :alt="feature.title" class="w-full h-full object-cover"/>
          </div>
          <div class="p-6 flex flex-col items-center text-center flex-grow">
            <h3 class="text-2xl font-bold mb-2"
                style="font-family: 'Playfair Display', serif; color: #d4edda;">
              {{ feature.title }}
            </h3>
            <p class="text-sm leading-relaxed mb-4 text-gray-200">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const newsFeatures = ref([
  {
    id: 'news-1',
    title: 'Tours & Travels Magazine',
    image: '/assets/images/news/tours_travel.jpeg',
    description: 'News write-ups offer a great way to let clients know about new products and services, events, awards, and more.'
  },
  {
    id: 'news-2',
    title: 'Travel Unlimited',
    image: '/assets/images/news/travel_unlimited.webp',
    description: 'News write-ups offer a great way to let clients know about new products and services, events, awards, and more.'
  },
  {
    id: 'news-3',
    title: "Trixie's Travels",
    image: '/assets/images/news/trixies_travels.jpeg',
    description: 'News write-ups offer a great way to let clients know about new products and services, events, awards, and more.'
  }
]);
</script>

<style scoped>
/*
  The background gradient is now directly applied via Tailwind classes in the <section> tag,
  so no specific background-color is needed here anymore for the section.
*/
</style>