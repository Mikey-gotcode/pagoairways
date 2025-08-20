<template>
  <section class="min-h-screen flex flex-col lg:flex-row">
    <div class="w-full lg:w-1/2 relative flex items-end justify-start p-8 md:p-12 lg:p-16 text-white overflow-hidden"
         style="background-image: url('/assets/images/boarding_pass_bg.jpg'); background-size: cover; background-position: center;">
      <div class="absolute inset-0 bg-black opacity-50"></div> <div class="relative z-10 text-left">
        <h3 class="text-3xl md:text-4xl font-bold mb-4" style="font-family: 'Playfair Display', serif;">
          BOARDING PASS
        </h3>
        <p class="text-xl md:text-2xl font-light uppercase tracking-widest">
          FLYINGBYNUMBERS
        </p>
        <p class="text-lg md:text-xl font-light uppercase tracking-widest mt-2">
          CHICAGO
        </p>
        <p class="text-lg md:text-xl font-light uppercase tracking-widest mt-2">
          LONDON
        </p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 bg-red-900 flex flex-col items-center justify-center p-8 md:p-12 lg:p-16 text-white relative">
      <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
          style="font-family: 'Playfair Display', serif; color: #2A47EEFF;"
          data-aos="fade-left">
        LET'S <br>CONNECT
      </h2>

      <p class="text-lg md:text-xl text-center mb-8 max-w-md"
         style="font-family: 'Cormorant Garamond', serif;"
         data-aos="fade-left" data-aos-delay="100">
        WE WELCOME PEOPLE OF ALL COLORS, <br>CULTURES, AND BELIEFS.
      </p>

      <div class="mb-8" data-aos="zoom-in" data-aos-delay="200">
         <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5" />
          </svg>
      </div>

      <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-6" data-aos="fade-up" data-aos-delay="300">
        <div>
          <label for="name" class="block text-sm font-medium text-white mb-1">Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            required
            class="w-full p-3 rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-white mb-1">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            required
            class="w-full p-3 rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label for="question" class="block text-sm font-medium text-white mb-1">Describe your question</label>
          <textarea
            id="question"
            v-model="formData.question"
            rows="5"
            required
            class="w-full p-3 rounded-md bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition duration-200"
            placeholder="Tell us how we can help you..."
          ></textarea>
        </div>
        <button
          type="submit"
          class="w-full bg-white text-purple-700 font-bold py-3 px-6 rounded-md hover:bg-gray-200 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// Reactive data for the form fields
const formData = ref({
  name: '',
  email: '',
  question: ''
});

// Function to handle form submission
const handleSubmit = () => {
  console.log('Form submitted:', formData.value);
  // In a real application, you would send this data to a backend API
  // Example:
  /*
  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData.value)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert('Your message has been sent!'); // Use a custom modal in a real app
    formData.value = { name: '', email: '', question: '' }; // Clear form
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('There was an error sending your message.'); // Use a custom modal in a real app
  });
  */
  // For now, just log and clear the form
  alert('Your message has been submitted! (Check console for data)'); // Placeholder alert
  formData.value = { name: '', email: '', question: '' }; // Clear form
};
</script>

<style scoped>
/* You can add custom styles here if needed */
/* Background color for the right section is purple-700 via Tailwind */
/* Background image for the left section is set via inline style */
</style>