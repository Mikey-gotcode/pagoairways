<template>
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-gray-800">Password Settings</h2>
                <p class="text-gray-600 mt-2">Update your account password</p>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Current Password -->
                <div>
                    <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                    </label>
                    <div class="input-container">
                        <input 
                            :type="showCurrentPassword ? 'text' : 'password'" 
                            id="currentPassword" 
                            v-model="currentPassword"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                            placeholder="Enter current password"
                            required
                        >
                        <i 
                            class="password-toggle" 
                            :class="showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'"
                            @click="showCurrentPassword = !showCurrentPassword"
                        ></i>
                    </div>
                </div>

                <!-- New Password -->
                <div>
                    <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                    </label>
                    <div class="input-container">
                        <input 
                            :type="showNewPassword ? 'text' : 'password'" 
                            id="newPassword" 
                            v-model="newPassword"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                            placeholder="Enter new password"
                            required
                        >
                        <i 
                            class="password-toggle" 
                            :class="showNewPassword ? 'fa-eye-slash' : 'fa-eye'"
                            @click="showNewPassword = !showNewPassword"
                        ></i>
                    </div>
                    <div class="mt-2 text-xs text-gray-500">
                        Password must be at least 8 characters long
                    </div>
                </div>

                <!-- Confirm New Password -->
                <div>
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                    </label>
                    <div class="input-container">
                        <input 
                            :type="showConfirmPassword ? 'text' : 'password'" 
                            id="confirmPassword" 
                            v-model="confirmPassword"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                            placeholder="Confirm new password"
                            required
                        >
                        <i 
                            class="password-toggle" 
                            :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"
                            @click="showConfirmPassword = !showConfirmPassword"
                        ></i>
                    </div>
                    <div v-if="passwordMismatch" class="mt-2 text-xs text-red-500">
                        Passwords do not match
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-2">
                    <button 
                        type="submit" 
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                        :disabled="isSubmitting"
                    >
                        <span v-if="!isSubmitting">Update Password</span>
                        <span v-else class="flex items-center justify-center">
                            <i class="fas fa-spinner fa-spin mr-2"></i>
                            Updating...
                        </span>
                    </button>
                </div>

                <!-- Success Message -->
                <div v-if="showSuccess" class="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                    <i class="fas fa-check-circle mr-2"></i>
                    Password updated successfully!
                </div>

                <!-- Error Message -->
                <div v-if="showError" class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    {{ errorMessage }}
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { changePassword } from '@/api.js'; // Import the new API function

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const isSubmitting = ref(false);
const showSuccess = ref(false);
const showError = ref(false);
const errorMessage = ref('');

// Computed property to check if the new passwords match
const passwordMismatch = computed(() => {
    return newPassword.value && confirmPassword.value && newPassword.value !== confirmPassword.value;
});

// Function to handle form submission and API call
const handleSubmit = async () => {
    // Reset messages
    showSuccess.value = false;
    showError.value = false;
    errorMessage.value = '';

    // Basic client-side validation
    if (passwordMismatch.value) {
        showError.value = true;
        errorMessage.value = 'New passwords do not match';
        return;
    }

    if (newPassword.value.length < 8) {
        showError.value = true;
        errorMessage.value = 'Password must be at least 8 characters';
        return;
    }

    isSubmitting.value = true;
    
    try {
        await changePassword(currentPassword.value, newPassword.value, confirmPassword.value);
        showSuccess.value = true;
        
        // Clear form fields on success
        currentPassword.value = '';
        newPassword.value = '';
        confirmPassword.value = '';

    } catch (error) {
        showError.value = true;
        // Check for specific error messages from the backend
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage.value = error.response.data.message;
        } else if (error.response && error.response.data && error.response.data.errors) {
            // Handle validation errors
            errorMessage.value = Object.values(error.response.data.errors).flat().join(' ');
        } else {
            errorMessage.value = 'An unexpected error occurred. Please try again.';
        }
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<style scoped>
/* These styles are scoped to this component only */
.password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #6b7280;
    transition: color 0.2s;
}
.password-toggle:hover {
    color: #4b5563;
}
.input-container {
    position: relative;
}
</style>
