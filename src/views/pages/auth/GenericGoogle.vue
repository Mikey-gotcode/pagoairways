<template>
  <div class="auth-container">
    <div class="auth-box">
      <h1>{{ isLogin ? 'Login' : 'Sign Up' }}</h1>

      <form @submit.prevent="submitForm" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required autocomplete="email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required autocomplete="current-password" v-if="isLogin" />
          <input type="password" id="new-password" v-model="password" required autocomplete="new-password" v-else />
        </div>
        <button type="submit" class="submit-btn">
          {{ isLogin ? 'Login' : 'Sign Up' }}
        </button>
      </form>

      <div class="divider">
        <span>OR</span>
      </div>

      <button @click="signInWithGoogle" class="google-btn">
        <img loading="eager" src="https://www.google.com/favicon.ico" alt="Google logo" class="google-logo" />
        {{ isLogin ? 'Sign in with Google' : 'Sign up with Google' }}
      </button>

      <p class="toggle-mode">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <a href="#" @click.prevent="toggleMode">
          {{ isLogin ? 'Sign Up' : 'Login' }}
        </a>
      </p>

      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLogin = ref(true); // true for Login, false for Sign Up
const email = ref('');
const password = ref('');
const message = ref('');
const messageType = ref(''); // 'success' or 'error'

// Your Go backend URL (make sure it's accessible)
const API_BASE_URL = 'http://localhost:8081'; // Update if your Go server runs on a different port or host

// Function to toggle between Login and Sign Up modes
const toggleMode = () => {
  isLogin.value = !isLogin.value;
  email.value = '';
  password.value = '';
  message.value = '';
};

// Generic Email/Password Submission
const submitForm = async () => {
  message.value = ''; // Clear previous messages
  const endpoint = isLogin.value ? '/login' : '/signup';
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle success for standard login/signup
      localStorage.setItem('authToken', data.token); // Save token for future use
      message.value = `Success! Welcome, ${data.user.email}. Redirecting...`;
      messageType.value = 'success';
      // Redirect to a protected page (e.g., Dashboard)
      setTimeout(() => {
        window.location.href = '/dashboard'; 
      }, 500);

    } else {
      message.value = data.error || `Error: ${response.statusText}`;
      messageType.value = 'error';
    }
  } catch (error) {
    message.value = `Network error: ${error.message}`;
    messageType.value = 'error';
    console.error('Submission error:', error);
  }
};

// Google Sign-In/Sign-Up
const signInWithGoogle = () => {
  message.value = 'Redirecting to Google...';
  
  // CRITICAL: Save the state locally before redirecting
  // This helps AuthCallback.vue know this flow was intended.
  localStorage.setItem('authFlowStarted', 'google');
  
  // Redirect to your Go backend's Google login endpoint
  window.location.href = `${API_BASE_URL}/auth/google`;
};
</script>

<style scoped>
/* (Styles remain the same) */

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
}

.auth-box {
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.auth-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  width: calc(100% - 20px);
  padding: 12px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.divider {
  position: relative;
  margin: 30px 0;
  height: 1px;
  background-color: #eee;
}

.divider span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 0 15px;
  color: #888;
  font-size: 14px;
}

.google-btn {
  width: 100%;
  padding: 12px;
  background-color: #db4437; /* Google red */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.google-btn:hover {
  background-color: #c0392b;
}

.google-logo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-color: white; /* to make sure favicon background is white */
  padding: 2px;
  border-radius: 50%;
}

.toggle-mode {
  margin-top: 25px;
  color: #666;
  font-size: 15px;
}

.toggle-mode a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.toggle-mode a:hover {
  text-decoration: underline;
}

.message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>