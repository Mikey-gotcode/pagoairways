<template>
     <!-- Certificate Section -->
        <section id="certificate" class="section py-20 bg-blue-800 text-white">
            <div class="container mx-auto px-6">
                <div class="flex flex-col md:flex-row items-center">
                    <div class="md:w-1/2 mb-12 md:mb-0 md:pr-12">
                        <h2 class="text-3xl md:text-4xl font-bold mb-6">IATA Certificate of Completion</h2>
                        <p class="text-xl mb-8 text-blue-100">
                            Upon successfully passing the final exam, you'll receive an official IATA Certificate of Completion - a recognized credential in the global travel industry.
                        </p>
                        <div class="space-y-4 mb-8">
                            <div class="flex items-start">
                                <div class="bg-yellow-400 p-2 rounded-full mr-4 mt-1">
                                    <i class="fas fa-check text-blue-800 text-sm"></i>
                                </div>
                                <p class="text-blue-100">Globally recognized certification from the International Air Transport Association</p>
                            </div>
                            <div class="flex items-start">
                                <div class="bg-yellow-400 p-2 rounded-full mr-4 mt-1">
                                    <i class="fas fa-check text-blue-800 text-sm"></i>
                                </div>
                                <p class="text-blue-100">Demonstrates your expertise to employers and clients</p>
                            </div>
                            <div class="flex items-start">
                                <div class="bg-yellow-400 p-2 rounded-full mr-4 mt-1">
                                    <i class="fas fa-check text-blue-800 text-sm"></i>
                                </div>
                                <p class="text-blue-100">Enhances your professional credibility in the travel industry</p>
                            </div>
                        </div>
                        <button @click="showModal = true" class="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-bold transition shadow-lg">
                            Enroll Now <i class="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                    <div class="md:w-1/2 flex justify-center">
                        <div class="relative">
                            <img src="https://www.iata.org/contentassets/d7c512eb9a704ba2a8056a3e4ee8f93b/training-certificate.jpg" 
                                 alt="IATA Certificate" 
                                 class="rounded-xl shadow-2xl max-w-md w-full floating">
                            <div class="absolute -bottom-6 -right-6 bg-yellow-400 p-4 rounded-full shadow-xl">
                                <i class="fas fa-certificate text-blue-800 text-3xl"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>

<script setup>
import {showModal} from '@/helper'


</script>