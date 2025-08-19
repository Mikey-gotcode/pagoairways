<template>
            <!-- What You'll Learn Section -->
        <section id="what-you-learn" class="section py-20 bg-white">
            <div class="container mx-auto px-6">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-blue-800 mb-4">What You Will Learn</h2>
                    <div class="w-20 h-1 bg-yellow-400 mx-auto"></div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-12">
                    <!-- First Column -->
                    <div>
                        <div class="bg-blue-50 rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition">
                            <div class="flex items-center mb-4">
                                <div class="bg-blue-100 p-3 rounded-full mr-4">
                                    <i class="fas fa-passport text-blue-600 text-xl"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-blue-800">Travel Documentation</h3>
                            </div>
                            <p class="text-gray-700">
                                Advise customers on passport and visa requirements, travel insurance, and other essential travel documentation.
                            </p>
                        </div>
                        
                        <div class="bg-blue-50 rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition">
                            <div class="flex items-center mb-4">
                                <div class="bg-blue-100 p-3 rounded-full mr-4">
                                    <i class="fas fa-plane text-blue-600 text-xl"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-blue-800">Airline Services</h3>
                            </div>
                            <p class="text-gray-700">
                                Promote airline services and facilities to passengers, helping them make informed decisions about their travel.
                            </p>
                        </div>
                        
                        <div class="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition">
                            <div class="flex items-center mb-4">
                                <div class="bg-blue-100 p-3 rounded-full mr-4">
                                    <i class="fas fa-code text-blue-600 text-xl"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-blue-800">Industry Codes</h3>
                            </div>
                            <p class="text-gray-700">
                                Interpret industry codes for travel planning and reservations, mastering the language of the travel industry.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Second Column -->
                    <div>
                        <div class="bg-blue-50 rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition">
                            <div class="flex items-center mb-4">
                                <div class="bg-blue-100 p-3 rounded-full mr-4">
                                    <i class="fas fa-shopping-cart text-blue-600 text-xl"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-blue-800">Travel Products</h3>
                            </div>
                            <p class="text-gray-700">
                                Sell various travel products including rail travel, car rental, hotel accommodation, cruises, and pre-packaged tours.
                            </p>
                        </div>
                        
                        <div class="bg-blue-50 rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition">
                            <div class="flex items-center mb-4">
                                <div class="bg-blue-100 p-3 rounded-full mr-4">
                                    <i class="fas fa-headset text-blue-600 text-xl"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-blue-800">Customer Service</h3>
                            </div>
                            <p class="text-gray-700">
                                Provide excellent customer service and develop strategies to retain customer loyalty in a competitive market.
                            </p>
                        </div>
                        
                        <div class="bg-blue-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition">
                            <div class="flex items-center mb-4">
                                <div class="bg-blue-100 p-3 rounded-full mr-4">
                                    <i class="fas fa-globe text-blue-600 text-xl"></i>
                                </div>
                                <h3 class="text-xl font-semibold text-blue-800">GDS Systems</h3>
                            </div>
                            <p class="text-gray-700">
                                Utilize the Global Distribution System (GDS) for reservations and travel document issuance like a professional.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="mt-16 text-center">
                    <button @click="scrollTo('course-content')" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition shadow-lg">
                        Continue to Course Content <i class="fas fa-arrow-down ml-2"></i>
                    </button>
                </div>
            </div>
        </section>
</template>

<script setup>
import {scrollTo} from '@/helper'


</script>