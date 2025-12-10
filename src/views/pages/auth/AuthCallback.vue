// src/views/AuthCallback.vue
<template>
  <div class="callback-container">
    <h2>Processing Sign-In...</h2>
    <p v-if="loading">Securing your session and redirecting you now.</p>
    <p v-if="error" class="error-msg">Authentication failed: {{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// IMPORTANT: Ensure you have initialized Vue Router (useRouter, useRoute)
// and defined the routes /dashboard and /checkout.
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const error = ref('');

const DEFAULT_REDIRECT_PATH = '/dashboard';
const CHECKOUT_PATH = '/checkout';

onMounted(() => {
  const token = route.query.token;
  // Retrieve the flow identifier saved before the redirect
  const authFlowStarted = localStorage.getItem('authFlowStarted');
  
  // Cleanup the local storage item immediately
  localStorage.removeItem('authFlowStarted');

  if (token && authFlowStarted === 'google') {
    // 1. Save the token
    localStorage.setItem('authToken', token);
    
    // 2. Decide the redirect path
    let intendedPath = DEFAULT_REDIRECT_PATH;
    
    // Example logic: Check for persistence (e.g., an item in cart) 
    // to decide if they should go to checkout instead of dashboard.
    // For this mock, we'll just check a hypothetical localStorage item.
    const hasActivePurchase = localStorage.getItem('activePurchaseId'); 
    
    if (hasActivePurchase) {
        intendedPath = CHECKOUT_PATH;
    }

    // 3. Navigate the user
    router.replace(intendedPath);
    
  } else {
    // Token is missing or flow was not initiated correctly (e.g., direct access to this URL)
    loading.value = false;
    error.value = 'Authentication failed. Please try logging in again.';
    
    // Redirect to login page after a delay
    setTimeout(() => {
      router.replace('/login');
    }, 3000);
  }
});
</script>

<style scoped>
.callback-container {
  padding: 40px;
  text-align: center;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
}
.error-msg {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 4px;
}
h2 {
    color: #333;
    font-size: 24px;
}
p {
    color: #555;
}
</style>