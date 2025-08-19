<template>
       <!-- CTA Section -->
        <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Travel Career?</h2>
                <p class="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
                    Join thousands of professionals who have advanced their careers with IATA's Travel and Tourism Consultant certification.
                </p>
                <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <button @click="showModal = true" class="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-3 rounded-full font-bold transition shadow-lg">
                        Enroll Now <i class="fas fa-arrow-right ml-2"></i>
                    </button>
                    <button @click="scrollTo('what-you-learn')" class="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-full font-medium transition border border-white border-opacity-30">
                        Learn More <i class="fas fa-book-open ml-2"></i>
                    </button>
                </div>
            </div>
        </section>
</template>

<script setup>
import {showModal, scrollTo} from '@/helper'


</script>