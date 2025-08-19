import './assets/main.css'

import { createApp } from 'vue'
import { router } from './router/index'
import App from './App.vue'
// Import AOS CSS
import 'aos/dist/aos.css';
// Import AOS library
import AOS from 'aos';


// Import PrimeVue
import PrimeVue from 'primevue/config';

import 'primeicons/primeicons.css'; // This should still be correct
const app =createApp(App)

// Use PrimeVue
app.use(PrimeVue, { ripple: true }); // `ripple: true` adds a ripple effect to clickable elements

AOS.init({
  // Global settings:
  duration: 800, // values from 0 to 3000, with step 50ms
  easing: 'ease-out-cubic', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
});

app.use(router).mount('#app')