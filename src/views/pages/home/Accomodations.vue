<template>
  <main class="container mx-auto px-4 py-8 relative">
    
    <section class="mb-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Popular Destinations</h2>
      
      <div v-if="destinations.length === 0" class="text-center py-8 text-gray-500">
        Loading destinations...
      </div>

      <div v-else>
        <Carousel :value="destinations" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" :circular="true" :autoplayInterval="4000">
            <template #item="slotProps">
                <div class="destination-card relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl group mx-2 mb-4"
                     @click="handleCountrySelect(slotProps.data.name)">
                    
                    <img :src="slotProps.data.image_url" :alt="slotProps.data.name" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105">
                    
                    <div class="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 flex items-center justify-center transition-all duration-300">
                        <h3 class="text-white text-2xl font-bold tracking-wide drop-shadow-md">{{ slotProps.data.name }}</h3>
                    </div>
                </div>
            </template>
        </Carousel>
      </div>
    </section>
    
    <section v-if="selectedCountry" class="mb-12 animate-fade-in-down">
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-100 relative">
             <button @click="clearCountrySelection" class="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition p-2">
                <i class="pi pi-times text-xl"></i>
            </button>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedCountry }}</h2>
            
            <div class="mb-4">
                <h3 class="text-lg font-semibold mb-2 text-gray-700">About Destination</h3>
                <p class="text-gray-600 leading-relaxed">{{ getDestinationDescription(selectedCountry) }}</p>
                
                <a :href="getAffiliateLink(selectedCountry)" target="_blank" class="mt-4 inline-flex items-center bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded hover:bg-indigo-700 transition">
                    Explore More <i class="pi pi-external-link ml-2"></i>
                </a>
            </div>
        </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800"
          style="font-family: 'Playfair Display', serif;">
        {{ selectedCountry ? `Stays in ${selectedCountry}` : 'Available Accommodations' }}
      </h2>
      
      <div v-if="accommodations.length === 0" class="text-center py-8 text-gray-500">
        {{ selectedCountry ? 'No accommodations found.' : 'Loading accommodations...' }}
      </div>
      
      <div v-else>
        <Carousel :value="accommodations" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" :circular="false">
            <template #item="slotProps">
                <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg flex flex-col mx-2 h-full mb-4">
                
                    <div class="relative h-48">
                        <img loading="lazy" :src="slotProps.data.image_url" :alt="slotProps.data.name" 
                            class="w-full h-full object-cover" />
                        
                        <div class="absolute top-2 right-2 text-[10px] uppercase font-bold py-1 px-2 rounded-md text-white shadow-sm"
                            :class="getSeverityClass(slotProps.data.status)">
                            {{ slotProps.data.status }}
                        </div>
                    </div>
                    
                    <div class="p-4 flex flex-col flex-grow">
                        <h4 class="text-lg font-bold text-gray-800 mb-1 leading-tight"
                            style="font-family: 'Playfair Display', serif;">
                            {{ slotProps.data.name }}
                        </h4>
                        
                        <div class="text-xs text-gray-500 mb-3 space-y-1">
                            <p class="flex items-center"><i class="pi pi-map-marker mr-1 text-indigo-500"></i> {{ slotProps.data.destination || 'N/A' }}</p>
                            <p class="flex items-center"><i class="pi pi-users mr-1 text-indigo-500"></i> {{ slotProps.data.capacity }}</p>
                        </div>
                        
                        <div class="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
                            <span class="text-indigo-600 font-extrabold text-lg">{{ slotProps.data.price }}</span>
                            <button @click="openAccommodationModal(slotProps.data)" class="bg-indigo-600 text-white text-xs font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition shadow-sm">
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
      </div>
    </section>

    <div v-if="selectedAccommodationDetails" 
         class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
         @click.self="closeAccommodationModal">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden relative animate-fade-in-up max-h-[90vh] flex flex-col">
            <button @click="closeAccommodationModal" 
                    class="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 hover:text-red-600 rounded-full p-2 transition shadow-sm backdrop-blur-md">
                <i class="pi pi-times text-lg"></i>
            </button>
            <div class="overflow-y-auto">
                <div class="relative h-64">
                    <img :src="selectedAccommodationDetails.image_url" class="w-full h-full object-cover">
                    <div class="absolute bottom-4 left-4">
                         <span class="text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wider shadow-sm"
                               :class="getSeverityClass(selectedAccommodationDetails.status)">
                             {{ selectedAccommodationDetails.status }}
                         </span>
                    </div>
                </div>
                <div class="p-8">
                    <div class="flex justify-between items-start mb-4">
                        <h2 class="text-3xl font-bold text-gray-900" style="font-family: 'Playfair Display', serif;">{{ selectedAccommodationDetails.name }}</h2>
                        <span class="text-2xl font-bold text-indigo-600">{{ selectedAccommodationDetails.price }}</span>
                    </div>
                    <div class="space-y-4 text-gray-700 leading-relaxed">
                        <p>{{ selectedAccommodationDetails.description || 'Description not found.' }}</p>
                    </div>
                    <div class="mt-8 flex justify-end gap-3">
                        <button @click="closeAccommodationModal" class="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition">Close</button>
                        <button class="px-6 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg transition">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAccommodations, getDestinations } from '@/api';
// IMPORT PRIMEVUE COMPONENT
import Carousel from 'primevue/carousel';

// --- STATE ---
const accommodations = ref([]);
const destinations = ref([]); 
const selectedCountry = ref(null);
const selectedAccommodationDetails = ref(null);

// --- CAROUSEL CONFIGURATION ---
// This ensures 1 item is shown on mobile (like your screenshot)
// and 3 items are shown on desktop.
const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1, // <--- This forces the single-card mobile view
        numScroll: 1
    }
]);

// --- UTILITY: Retry Logic ---
const retry = async (fn, retries = 5, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(res => setTimeout(res, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};

// --- MODAL ACTIONS ---
const openAccommodationModal = (accommodation) => {
    selectedAccommodationDetails.value = accommodation;
    document.body.style.overflow = 'hidden'; 
};

const closeAccommodationModal = () => {
    selectedAccommodationDetails.value = null;
    document.body.style.overflow = 'auto'; 
};

// --- DATA FETCHING ---
const fetchAccommodations = async () => {
  try {
    const responseData = await retry(() => getAccommodations(selectedCountry.value));
    const data = Array.isArray(responseData) ? responseData : responseData.data;
    accommodations.value = data || [];
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const fetchDestinations = async () => {
  try {
    const responseData = await retry(getDestinations);
    const data = Array.isArray(responseData) ? responseData : responseData.data;
    destinations.value = data || [];
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

// --- EVENT HANDLERS ---
const handleCountrySelect = (countryName) => {
    selectedCountry.value = countryName;
    fetchAccommodations();
    // Scroll to about section
    setTimeout(() => {
        window.scrollTo({ top: window.scrollY + 300, behavior: 'smooth' });
    }, 100);
};

const clearCountrySelection = () => {
    selectedCountry.value = null;
    fetchAccommodations(); 
};

// --- HELPERS ---
const getSeverityClass = (status) => {
  switch (status) {
    case 'Available': return 'bg-green-500';
    case 'Limited': return 'bg-yellow-500';
    case 'Booked': return 'bg-red-500';
    default: return 'bg-blue-500';
  }
};

const getDestinationDescription = (countryName) => {
    const dest = destinations.value.find(d => d.name === countryName);
    return dest ? dest.description : 'Description not found.';
};

const getAffiliateLink = (countryName) => {
    const dest = destinations.value.find(d => d.name === countryName);
    return dest ? dest.affiliate_link : '#';
};

onMounted(() => {
  fetchDestinations();
  fetchAccommodations();
});
</script>

<style scoped>
/* Ensure Carousel buttons are visible on light backgrounds */
:deep(.p-carousel-prev), :deep(.p-carousel-next) {
    background: rgba(79, 70, 229, 0.1);
    color: #4f46e5;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin: 0 5px;
}
:deep(.p-carousel-prev:hover), :deep(.p-carousel-next:hover) {
    background: #4f46e5;
    color: white;
}
/* Dots styling */
:deep(.p-carousel-indicator-button) {
    background-color: #e5e7eb;
    height: 6px;
    border-radius: 4px;
}
:deep(.p-carousel-indicator.p-highlight .p-carousel-indicator-button) {
    background-color: #4f46e5;
}
</style>