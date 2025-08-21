<template>
  <div v-if="isLoading" class="flex flex-col items-center justify-center h-screen bg-gray-900">
    <div class="loading-container text-center">
      <svg width="200" height="200" viewBox="0 0 200 200" class="mx-auto mb-6">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="50%" stop-color="#8b5cf6" />
            <stop offset="100%" stop-color="#ec4899" />
          </linearGradient>
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <circle cx="100" cy="100" r="30" fill="url(#gradient)" class="morph-animation" filter="url(#glow)" opacity="0.8" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="url(#gradient)" stroke-width="2" stroke-dasharray="5,5" class="morph-animation" opacity="0.6" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="url(#gradient)" stroke-width="1" stroke-dasharray="3,3" class="morph-animation" opacity="0.4" />
        
        <circle cx="70" cy="70" r="5" fill="#3b82f6">
          <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" begin="0s" />
        </circle>
        <circle cx="130" cy="70" r="5" fill="#8b5cf6">
          <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" begin="0.3s" />
        </circle>
        <circle cx="130" cy="130" r="5" fill="#ec4899">
          <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </circle>
        <circle cx="70" cy="130" r="5" fill="#3b82f6">
          <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" begin="0.9s" />
        </circle>
      </svg>
      
      <h2 class="text-2xl font-bold text-white mb-2">Loading</h2>
      <p class="text-gray-400 loading-text">Please wait</p>
      
      <div class="mt-8 w-64 h-1 bg-gray-700 rounded-full mx-auto overflow-hidden">
        <div class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-progress"></div>
      </div>
    </div>
  </div>
  <div v-else class="home">
    <NavBar/>
    <CallToAction />
    <OurDestinations/>
    <WhyPago/>
    <Accomodations/>
    <NewsFeatures/>
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

const isLoading = ref(true)

onMounted(async ()=>{
    // This is the loading logic
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    isLoading.value = false
})
</script>

<style scoped>
@keyframes morph {
    0%, 100% {
        border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
    }
    50% {
        border-radius: 30% 60% 70% 40%/50% 60% 30% 60%;
    }
}

.morph-animation {
    animation: morph 8s ease-in-out infinite;
}

.loading-text::after {
    content: '...';
    animation: dots 1.5s steps(5, end) infinite;
}

@keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
}

/*
  The progress bar animation from the original code:
  @keyframes progress {
      0% { transform: scaleX(0); transform-origin: left; }
      100% { transform: scaleX(1); transform-origin: left; }
  }
  .animate-progress {
      animation: progress 5s ease-in-out infinite;
  }
*/
</style>