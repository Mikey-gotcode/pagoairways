<template>
  <transition name="fade">
    <div v-if="toastVisible" :class="[
      'fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-xl flex items-center z-50 transition-colors duration-300',
      { 'bg-green-500 text-white': isSuccess, 'bg-red-500 text-white': isError }
    ]">
      <i :class="[
        'text-xl mr-3',
        { 'fas fa-check-circle': isSuccess, 'fas fa-exclamation-triangle': isError }
      ]"></i>
      <div>
        <p class="font-medium">{{ toastTitle }}</p>
        <p class="text-sm">{{ toastMessage }}</p>
      </div>
      <button @click="closeToast" class="ml-6 text-white hover:text-gray-200">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { successMessage, errorMessage } from '@/helper';

const toastVisible = ref(false);

// Watch for changes in the messages and show the toast
watch([successMessage, errorMessage], ([newSuccess, newError]) => {
  if (newSuccess || newError) {
    toastVisible.value = true;
    // Hide the toast after 5 seconds
    setTimeout(() => {
      closeToast();
    }, 5000);
  }
}, { immediate: true });

// Computed properties to determine toast content and styling
const isSuccess = computed(() => !!successMessage.value);
const isError = computed(() => !!errorMessage.value);
const toastTitle = computed(() => isSuccess.value ? 'Enrollment Submitted!' : 'Error');
const toastMessage = computed(() => successMessage.value || errorMessage.value);

const closeToast = () => {
  toastVisible.value = false;
  // Clear the messages so the toast can be triggered again later
  successMessage.value = '';
  errorMessage.value = '';
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>