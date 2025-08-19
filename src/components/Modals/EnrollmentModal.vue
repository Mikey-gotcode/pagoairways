<template>
      <!-- Enrollment Modal -->
        <transition name="fade">
            <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-2xl font-bold text-blue-800">Enroll in the Course</h3>
                            <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        
                        <div class="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 class="text-lg font-semibold mb-4 text-blue-700">Course Details</h4>
                                <ul class="space-y-3 text-gray-700">
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                        <span>Duration: 6-8 weeks (self-paced)</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                        <span>Format: Online learning with tutor support</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                        <span>Final exam: Online proctored assessment</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                        <span>Access: 12 months to course materials</span>
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                        <span>Price: $795 (payment plans available)</span>
                                    </li>
                                </ul>
                                
                                <div class="mt-6 bg-blue-50 rounded-lg p-4">
                                    <h5 class="font-semibold text-blue-800 mb-2 flex items-center">
                                        <i class="fas fa-gift text-yellow-500 mr-2"></i> Limited Time Offer
                                    </h5>
                                    <p class="text-sm text-gray-700">
                                        Enroll today and receive our exclusive "Destination Guide Bundle" worth $150 for free!
                                    </p>
                                </div>
                            </div>
                            
                            <div>
                                <form @submit.prevent="submitEnrollment" class="space-y-4">
                                    <div>
                                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input type="text" id="name" v-model="form.name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    </div>
                                    <div>
                                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input type="email" id="email" v-model="form.email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    </div>
                                    <div>
                                        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input type="tel" id="phone" v-model="form.phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    </div>
                                    <div>
                                        <label for="experience" class="block text-sm font-medium text-gray-700 mb-1">Travel Industry Experience</label>
                                        <select id="experience" v-model="form.experience" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="">Select your experience level</option>
                                            <option value="none">None (just starting)</option>
                                            <option value="1-2">1-2 years</option>
                                            <option value="3-5">3-5 years</option>
                                            <option value="5+">5+ years</option>
                                        </select>
                                    </div>
                                    <div class="flex items-center">
                                        <input type="checkbox" id="agree" v-model="form.agree" required class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                        <label for="agree" class="ml-2 block text-sm text-gray-700">
                                            I agree to the <a href="#" class="text-blue-600 hover:underline">terms and conditions</a>
                                        </label>
                                    </div>
                                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition shadow-md">
                                        Submit Enrollment <i class="fas fa-paper-plane ml-2"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

</template>

<script setup>
import {showModal} from '@/helper'


</script>