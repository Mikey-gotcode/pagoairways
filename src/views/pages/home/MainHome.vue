<template>
    <div v-if="isLoading" class="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div class="relative w-1/2 h-1/2 flex items-center justify-center">
            <img ref="vIcon" src="/src/assets/icons/IconCommunity.vue" alt="Loading..."
                class="loading-icon w-full h-full object-contain" style="filter: grayscale(100%) brightness(80%);" />
            <div
                class="shine absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-400 to-transparent opacity-50" />
        </div>

    </div>
    <div v-else class="home">
        <NavBar/>
        <CallToAction />
        <OurDestinations/>
        <WhyPago/>
        <Accomodations/>
        <NewsFeatures/>
        <!-- <AboutServices />
        <Clients/> -->
        <LetsConnect/>
        <HomeFooter />
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import NavBar from '@/components/NavBar.vue'
import CallToAction from './CallToAction.vue'
import OurDestinations from './OurDestinations.vue'
import WhyPago from './WhyPago.vue'
import Accomodations from './Accomodations.vue'
import NewsFeatures from './NewsFeatures.vue'
import LetsConnect from './LetsConnect.vue'
import HomeFooter from './HomeFooter.vue'








const isLoading = ref (true)
const vIcon = ref(null)


onMounted(async ()=>{
    //loading phase before DNS resolves
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    isLoading.value= false
})




</script>


 <style scoped>

  
.shine {
  mask-image: url('/assets/icons/IconCommunity.vue');
    mask-repeat: no-repeat;
    mask-position: center;
    animation: shineAnimation 2s ease-in-out infinite alternate;
    opacity: 0.7; /* Adjust opacity of the shine */
    mix-blend-mode: screen; /* Try 'lighten' or 'color-dodge' too */
    background: linear-gradient(to top, transparent 20%, gold 60%, transparent 95%); /* Focused gold gradient */
  }
  
  @keyframes shineAnimation {
    0% {
      mask-position-y: 150%;
    }
    100% {
      mask-position-y: -50%;
    }
  }
  
 
  </style>