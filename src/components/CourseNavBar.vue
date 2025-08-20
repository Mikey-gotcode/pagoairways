<script setup>
import { ref } from 'vue';
import { scrollTo, showModal } from '@/helper';

// Define the state for the mobile menu
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Define the state for the modal
// Note: 'showModal' is imported, but you need to define how it's used if not a composable
// This assumes showModal is a reactive variable imported from a helper file.

</script>

<template>
    <nav class="fixed w-full bg-white shadow-md z-50">
        <div class="container mx-auto px-6 py-3 flex justify-between items-center">
            <div class="flex items-center">
                <img src="/assets/iatalogo.png" alt="IATA Logo" class="h-12">
                <span class="ml-3 text-xl font-semibold text-blue-800">Pago Travel & Tourism Consultancy</span>
            </div>
            <div class="hidden md:flex space-x-8 items-center">
                <router-link to="/" class="text-gray-700 hover:text-blue-600 transition">
                    HOME
                </router-link>
                <a href="#" @click="scrollTo('what-you-learn')" class="text-gray-700 hover:text-blue-600 transition">What You'll Learn</a>
                <a href="#" @click="scrollTo('course-content')" class="text-gray-700 hover:text-blue-600 transition">Course Content</a>
                <a href="#" @click="scrollTo('certificate')" class="text-gray-700 hover:text-blue-600 transition">Certificate</a>
                <button @click="showModal = true" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition shadow-md">
                    Enroll Now
                </button>
            </div>
            
            <button @click="toggleMobileMenu" class="md:hidden text-gray-700 focus:outline-none">
                <i class="fas fa-bars text-2xl"></i>
            </button>
        </div>
        
        <transition name="fade">
            <div v-if="mobileMenuOpen" class="md:hidden bg-white shadow-lg">
                <div class="px-6 py-4 space-y-4">
                    <a href="#" @click="scrollTo('hero'); toggleMobileMenu()" class="block text-gray-700 hover:text-blue-600 transition">Home</a>
                    <a href="#" @click="scrollTo('what-you-learn'); toggleMobileMenu()" class="block text-gray-700 hover:text-blue-600 transition">What You'll Learn</a>
                    <a href="#" @click="scrollTo('course-content'); toggleMobileMenu()" class="block text-gray-700 hover:text-blue-600 transition">Course Content</a>
                    <a href="#" @click="scrollTo('certificate'); toggleMobileMenu()" class="block text-gray-700 hover:text-blue-600 transition">Certificate</a>
                    <button @click="showModal = true; toggleMobileMenu()" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition shadow-md">
                        Enroll Now
                    </button>
                </div>
            </div>
        </transition>
    </nav>
</template>