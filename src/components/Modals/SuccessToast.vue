<template>
         <!-- Success Toast -->
        <transition name="fade">
            <div v-if="showSuccessToast" class="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center z-50">
                <i class="fas fa-check-circle text-xl mr-3"></i>
                <div>
                    <p class="font-medium">Enrollment Submitted!</p>
                    <p class="text-sm">We'll contact you shortly with more details.</p>
                </div>
                <button @click="showSuccessToast = false" class="ml-6 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </transition>
</template>

<script setup>
import {showSuccessToast} from '@/helper'


</script>