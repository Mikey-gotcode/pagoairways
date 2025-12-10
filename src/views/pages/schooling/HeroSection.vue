<script setup>
import {scrollTo, showVideoModal} from '@/helper'

</script>


<template>
           <!-- Hero Section -->
        <section id="hero" class="section pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
            <div class="container mx-auto px-6 flex flex-col md:flex-row items-center">
                <div class="md:w-1/2 mb-12 md:mb-0">
                    <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Study Popular Tourism Destinations <br>
                        <span class="text-yellow-300">Improve Your Sales Skills</span>
                    </h1>
                    <p class="text-xl mb-8 text-blue-100">
                        Become an expert travel consultant with IATA's accredited Travel and Tourism Consultant course. 
                        Gain the knowledge and skills to advise clients, customize itineraries, and excel in the travel industry.
                    </p>
                    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button @click="scrollTo('what-you-learn')" class="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-bold transition shadow-lg">
                            Explore Course <i class="fas fa-arrow-down ml-2"></i>
                        </button>
                        <button @click="showVideoModal = true" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-full font-medium transition border border-white border-opacity-30">
                            <i class="fas fa-play mr-2"></i> Watch Video
                        </button>
                    </div>
                </div>
                <div class="md:w-1/2 flex justify-center">
                    <img loading="lazy" src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                         alt="Travel destinations" 
                         class="rounded-xl shadow-2xl floating max-w-md w-full">
                </div>
            </div>
        </section>
</template>