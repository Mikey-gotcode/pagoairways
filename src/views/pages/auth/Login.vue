<template>
  <div class="min-h-screen gradient-bg flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl p-8 card-shadow">
        <div class="text-center mb-8">
          <div class="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-sun text-yellow-400 text-3xl"></i>
          </div>
          <h1 class="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          <p class="text-gray-500 mt-2">Please enter your details to sign in</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <span class="block sm:inline">{{ errorMessage }}</span>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="far fa-envelope text-gray-400"></i>
              </div>
              <input
                id="email"
                type="email"
                v-model="email"
                required
                class="pl-10 w-full px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none input-focus transition duration-200"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                required
                class="pl-10 w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none input-focus transition duration-200"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'" class="text-gray-400 hover:text-blue-500"></i>
              </button>
            </div>
            <div class="flex justify-end mt-2">
              <a href="#" class="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="remember"
              type="checkbox"
              v-model="rememberMe"
              class="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
            />
            <label for="remember" class="ml-2 block text-sm text-gray-700">Remember me</label>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Signing In...</span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/api.js';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const router = useRouter();

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const retry = async (fn, retries = 5, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Failed to fetch destinations, retrying in ${delay}ms... Attempts left: ${retries - 1}`);
      await new Promise(res => setTimeout(res, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};
const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = ''; // Clear previous errors
  try {
    const { user, token } = await retry(login(email.value, password.value));
    
    // Check if the user is an admin and redirect them
    if (user && user.is_admin) {
        router.push('/super-admin' );
    } else {
        // Redirect to a default page for regular users
        router.push({ name: 'dashboard' }); 
    }

  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again.';
    }
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #FBBF24 0%, #3B82F6 100%);
}
.card-shadow {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.input-focus:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}
</style>
