<template>

        <!-- Video Modal -->
        <transition name="fade">
            <div v-if="showVideoModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div class="relative w-full max-w-4xl">
                    <button @click="showVideoModal = false" class="absolute -top-12 right-0 text-white hover:text-yellow-300">
                        <i class="fas fa-times text-3xl"></i>
                    </button>
                    <div class="aspect-w-16 aspect-h-9">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/watch?v=WEMDeX4lk_A" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            class="rounded-xl shadow-2xl">
                        </iframe>
                    </div>
                </div>
            </div>
        </transition>
</template>


<script setup>
import {showVideoModal} from '@/helper'


</script>