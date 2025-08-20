<template>
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-12">
                <div>
                    <img src="https://www.iata.org/contentassets/d7c512eb9a704ba2a8056a3e4ee8f93b/iata-logo-1.png" alt="IATA Logo" class="h-12 mb-4">
                    <p class="text-gray-400">
                        The International Air Transport Association is the trade association for the world's airlines, representing over 290 airlines or 83% of total air traffic.
                    </p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-blue-300">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="#" @click="scrollTo('hero')" class="text-gray-400 hover:text-white transition">Home</a></li>
                        <li><a href="#" @click="scrollTo('what-you-learn')" class="text-gray-400 hover:text-white transition">What You'll Learn</a></li>
                        <li><a href="#" @click="scrollTo('course-content')" class="text-gray-400 hover:text-white transition">Course Content</a></li>
                        <li><a href="#" @click="scrollTo('certificate')" class="text-gray-400 hover:text-white transition">Certificate</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-blue-300">Contact Us</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li class="flex items-start">
                            <i class="fas fa-map-marker-alt mt-1 mr-3 text-blue-400"></i>
                            <span>Electricity House 8th Flr Harambee Ave.</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-phone-alt mr-3 text-blue-400"></i>
                            <span>0203-311-388 | 0717666651</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-envelope mr-3 text-blue-400"></i>
                            <span>info@pagoairways.co.ke</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4 text-blue-300">Follow Us</h4>
                    <div class="flex space-x-4">
                        <a href="#" class="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="bg-gray-800 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="bg-gray-800 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="bg-gray-800 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-youtube"></i>
                        </a>
                        <a href="#" class="bg-gray-800 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transition">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    <div class="mt-6">
                        <h5 class="text-sm font-semibold mb-2 text-blue-300">Subscribe to Newsletter</h5>
                        <form @submit.prevent="subscribe" class="flex">
                            <input type="email" v-model="email" placeholder="Your email" class="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                            <button type="submit" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                <p>© 2023 IATA Travel & Tourism Consultant Course. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { scrollTo } from '@/helper';
import useNewsletterForm from '@/composables/useNewsletterForm';

const { email, subscribe } = useNewsletterForm();
</script>