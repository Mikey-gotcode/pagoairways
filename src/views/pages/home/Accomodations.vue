<template>
  <section class="py-16 bg-pink-300 text-white">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-12"
          style="font-family: 'Playfair Display', serif; color: #2A47EEFF;">
        Accommodations
      </h2>

      <Carousel :value="accommodations" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions"
                circular :autoplayInterval="3000">
        <template #item="slotProps"> <div class="border border-surface-200 dark:border-surface-700 rounded-lg m-2 p-4 bg-white shadow-lg text-center"
               data-aos="zoom-in" :data-aos-delay="slotProps.index * 100">
            <div class="mb-4">
              <div class="relative mx-auto">
                <img :src="slotProps.data.image_url" :alt="slotProps.data.name"
                     class="w-full h-48 object-cover rounded" />
                <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data.status)"
                     class="absolute" style="left:5px; top: 5px;" />
              </div> </div> <div class="mb-2 text-gray-700 text-sm font-medium uppercase tracking-wide">
              {{ slotProps.data.capacity }}
            </div>
            <div class="mb-2 text-lg font-bold text-gray-800" style="font-family: 'Playfair Display', serif;">
              {{ slotProps.data.name }}
            </div>
            <div class="flex justify-between items-center mt-4">
              <div class="font-semibold text-xl text-gray-600">
                {{ slotProps.data.price }}
              </div>
              <span>
                <Button icon="pi pi-heart" severity="secondary" outlined />
                <Button icon="pi pi-shopping-cart" class="ml-2" />
              </span>
            </div>
          </div> </template>
      </Carousel> </div> </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Carousel from 'primevue/carousel';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import { getAccommodations } from '@/api';

// The new retry function
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

const accommodations = ref([]);
const fetchAccommodations = async () => {
  try {
    // Wrap the API call with the retry function
    const data = await retry(getAccommodations);
    accommodations.value = data;
  } catch (error) {
    console.error('Failed to fetch accommodations after multiple retries:', error);
  }
};
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
]);
const getSeverity = (status) => {
  switch (status) {
    case 'Available':
      return 'success';
    case 'Limited':
      return 'warning';
    case 'Booked':
      return 'danger';
    default:
      return 'info';
  }
};
onMounted(() => {
  fetchAccommodations();
});
</script>
<style scoped>
section {
  background-color: #fce4ec;
}
</style>