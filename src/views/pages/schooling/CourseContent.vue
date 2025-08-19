<template>
     <!-- Course Content Section -->
        <section id="course-content" class="section py-20 bg-gray-50">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Course Content</h2>
                    <div class="w-20 h-1 bg-yellow-400 mx-auto"></div>
                    <p class="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
                        Our comprehensive curriculum covers all essential aspects of becoming a successful Travel and Tourism Consultant.
                    </p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i class="fas fa-map-marked-alt text-blue-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-center text-blue-800 mb-4">Popular Tourism Destinations</h3>
                        <p class="text-gray-600 text-center">
                            Study the world's most sought-after travel destinations and learn how to recommend them effectively.
                        </p>
                    </div>
                    
                    <div class="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-center text-blue-800 mb-4">Sales Techniques</h3>
                        <p class="text-gray-600 text-center">
                            Master proven sales strategies to increase your conversion rates and build lasting client relationships.
                        </p>
                    </div>
                    
                    <div class="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i class="fas fa-ticket-alt text-blue-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-center text-blue-800 mb-4">Airfare Construction</h3>
                        <p class="text-gray-600 text-center">
                            Learn to construct complex fares and manage changes to electronic tickets with confidence.
                        </p>
                    </div>
                    
                    <div class="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i class="fas fa-gavel text-blue-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-center text-blue-800 mb-4">Industry Regulations</h3>
                        <p class="text-gray-600 text-center">
                            Understand travel industry laws and regulations, including IATA resolutions for accredited agencies.
                        </p>
                    </div>
                    
                    <div class="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i class="fas fa-umbrella-beach text-blue-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-center text-blue-800 mb-4">Tour & Group Travel</h3>
                        <p class="text-gray-600 text-center">
                            Explore specialized options including luxury travel, group tours, and alternative accommodations.
                        </p>
                    </div>
                    
                    <div class="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
                        <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i class="fas fa-hashtag text-blue-600 text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-center text-blue-800 mb-4">Social Media Marketing</h3>
                        <p class="text-gray-600 text-center">
                            Leverage social platforms to market travel products and build your professional brand online.
                        </p>
                    </div>
                </div>
                
                <div class="mt-16 text-center">
                    <button @click="scrollTo('certificate')" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition shadow-lg">
                        Learn About Certification <i class="fas fa-arrow-down ml-2"></i>
                    </button>
                </div>
            </div>
        </section>
</template>

<script setup>
import {scrollTo} from '@/helper'


</script>