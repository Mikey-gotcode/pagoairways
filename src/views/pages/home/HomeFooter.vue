<template>
  <footer class="bg-red-900 text-white py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 class="text-xl font-bold mb-4" style="font-family: 'Playfair Display', serif; color: #a7e0c4;">
            RESERVATIONS OFFICE
          </h4>
          <p class="text-sm mb-2" style="font-family: 'Cormorant Garamond', serif;">
            Electricity House
          </p>
          <p class="text-sm mb-2" style="font-family: 'Cormorant Garamond', serif;">
            8th Flr Harambee Ave.
          </p>
          <p class="text-sm mb-2" style="font-family: 'Cormorant Garamond', serif;">
            0203-311-388
          </p>
          <p class="text-sm mb-2" style="font-family: 'Cormorant Garamond', serif;">
            0717666651
          </p>
          <p class="text-sm" style="font-family: 'Cormorant Garamond', serif;">
            info@pagoairways.co.ke
          </p>
        </div>

        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 class="text-xl font-bold mb-4" style="font-family: 'Playfair Display', serif; color: #a7e0c4;">
            OFFICE HOURS
          </h4>
          <p class="text-sm mb-2" style="font-family: 'Cormorant Garamond', serif;">
            MONDAY TO FRIDAY
          </p>
          <p class="text-sm mb-4" style="font-family: 'Cormorant Garamond', serif;">
            9:00 am to 6:00 pm
          </p>
          <p class="text-sm mb-2" style="font-family: 'Cormorant Garamond', serif;">
            SATURDAY
          </p>
          <p class="text-sm" style="font-family: 'Cormorant Garamond', serif;">
            9:00 am to 12:00 noon
          </p>
        </div>

        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 class="text-xl font-bold mb-4" style="font-family: 'Playfair Display', serif; color: #2A47EEFF;">
            QUICK LINKS
          </h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.id">
              <a :href="link.url" class="text-sm hover:text-gray-400 transition-colors duration-200"
                 style="font-family: 'Cormorant Garamond', serif;">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div class="flex flex-col items-center md:items-end justify-start md:justify-start">
          <div class="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-400 transition-colors duration-200">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.812c-3.232 0-4.188 1.503-4.188 4.004v2.996z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-400 transition-colors duration-200">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.418.712-.658 1.549-.658 2.474 0 1.687.81 3.17 2.035 4.034-.798-.023-1.549-.245-2.204-.604-.065 1.814 1.305 3.493 3.207 3.879-.374.102-.767.16-.110.16-.215 0-.424-.029-.626-.059.512 1.604 1.992 2.771 3.728 2.809-1.995 1.507-4.504 2.072-7.229 1.808 2.083 1.341 4.562 2.126 7.292 2.126 8.705 0 13.473-7.715 13.473-14.469 0-.222-.005-.443-.014-.663 1.01-.729 1.896-1.659 2.59-2.712z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-gray-400 transition-colors duration-200">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.149-4.771-1.691-4.919-4.919-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.073 4.948.073s3.668-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
            style="font-family: 'Playfair Display', serif; color: #2A47EEFF;">
          PAGO <br>AIRWAYS
        </h1>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const quickLinks = ref([
  { id: 'home', label: 'HOME', url: '#home' },
  { id: 'aboutus', label: 'ABOUT US', url: '#aboutus' },
  { id: 'our-destination', label: 'OUR DESTINATION', url: '#destinations' },
  { id: 'accommodations', label: 'ACCOMMODATIONS', url: '#accommodations' },
  { id: 'clients', label: 'CLIENTS', url: '#clients' },
  { id: 'reach-us', label: 'REACH US', url: '#contact' },
  { id: 'content-manager', label: 'CONTENT MANAGER', url: 'http://localhost:5173/login' }
]);
</script>

<style scoped>
/* Scoped styles if needed */
/* The background color is a dark emerald-950 via Tailwind classes */
</style>
