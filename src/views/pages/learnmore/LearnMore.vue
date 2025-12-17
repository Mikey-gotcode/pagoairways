<template>
  <div class="font-sans antialiased text-gray-800">
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <i class="fa-solid fa-cube text-blue-600 text-2xl mr-2"></i>
              <span class="text-xl font-bold text-gray-900">PAGOAIRWAYS</span>
            </div>
          </div>
          <div class="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <a href="#" class="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Home</a>
            <a href="#" class="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">Learn More</a>
            <a href="#" class="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Pricing</a>
            <a href="#" class="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Contact</a>
            <button @click="handleGetStarted" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
              Get Started
            </button>
          </div>
          <div class="-mr-2 flex items-center md:hidden">
            <button @click="toggleMobileMenu" type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none" aria-controls="mobile-menu" :aria-expanded="isMobileMenuOpen">
              <span class="sr-only">Open main menu</span>
              <i class="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-if="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
        <div class="pt-2 pb-3 space-y-1">
          <a href="#" class="bg-blue-50 text-blue-600 block pl-3 pr-4 py-2 border-l-4 border-blue-600 text-base font-medium">Home</a>
          <a href="#" class="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">Learn More</a>
          <a href="#" class="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">Pricing</a>
          <a href="#" class="text-gray-500 hover:bg-gray-50 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium">Contact</a>
          <button @click="handleGetStarted" class="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md mx-3 my-2 text-base font-medium">
            Get Started
          </button>
        </div>
      </div>
    </nav>

    <section class="hero-gradient text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="md:flex md:items-center md:justify-between">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-6">Discover the World with Our Expertly Curated Tours</h1>
            <p class="text-xl opacity-90 mb-8">From exotic international destinations to hidden local gems, our bespoke travel experiences create memories that last a lifetime. Let us take you on journeys beyond imagination.</p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button @click="scrollToSection('features-section')" class="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md text-lg font-semibold transition duration-300">
                Explore Destinations 
                <i class="fa-solid fa-globe ml-2"></i>
              </button>
              <button @click="scrollToSection('how-it-works-section')" class="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-md text-lg font-semibold transition duration-300">
                View Itineraries 
                <i class="fa-solid fa-route ml-2"></i>
              </button>
            </div>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <img loading="eager" src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=400&q=80" alt="Travel Destinations" class="rounded-lg shadow-2xl w-full max-w-md">
          </div>
        </div>
      </div>
    </section>

    <section id="features-section" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Unforgettable Travel Experiences</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Our comprehensive tour packages include everything you need for seamless adventures around the globe.</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-md feature-card transition duration-300">
            <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <i class="fa-solid fa-globe-americas text-blue-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">Global Destinations</h3>
            <p class="text-gray-600">Explore over 150 handpicked destinations worldwide, from iconic landmarks to hidden local treasures.</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-md feature-card transition duration-300">
            <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <i class="fa-solid fa-hotel text-green-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">Premium Accommodations</h3>
            <p class="text-gray-600">Luxury 5-star hotels, boutique resorts, and carefully selected local stays for authentic experiences.</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-md feature-card transition duration-300">
            <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <i class="fa-solid fa-utensils text-purple-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">Gourmet Dining</h3>
            <p class="text-gray-600">Savor culinary delights with curated restaurant experiences featuring local specialties and international cuisine.</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-md feature-card transition duration-300">
            <div class="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <i class="fa-solid fa-route text-yellow-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">Tailored Itineraries</h3>
            <p class="text-gray-600">Customized travel plans designed by expert tour guides to match your interests and pace.</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-md feature-card transition duration-300">
            <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <i class="fa-solid fa-users text-red-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">Expert Guides</h3>
            <p class="text-gray-600">Local experts with insider knowledge to show you the authentic side of every destination.</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-md feature-card transition duration-300">
            <div class="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <i class="fa-solid fa-shield-alt text-indigo-600 text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mb-3">Travel Protection</h3>
            <p class="text-gray-600">Comprehensive travel insurance included for peace of mind on every adventure.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works-section" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Your Journey Awaits</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Planning your dream vacation has never been easier with our 4-step process.</p>
        </div>
        
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <img loading="eager" :src="pagoSampleImage2" alt="Travel Planning" class="rounded-lg shadow-xl w-full max-w-md">
          </div>
          
          <div class="md:w-1/2 md:pl-12">
            <div class="flex items-start mb-8">
              <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                <span class="font-bold">1</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Choose Your Adventure</h3>
                <p class="text-gray-600">Browse our curated selection of international and local tours tailored to your interests.</p>
              </div>
            </div>
            
            <div class="flex items-start mb-8">
              <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                <span class="font-bold">2</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Personalize Your Itinerary</h3>
                <p class="text-gray-600">Work with our travel experts to customize your journey with special activities and experiences.</p>
              </div>
            </div>
            
            <div class="flex items-start mb-8">
              <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                <span class="font-bold">3</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Confirm & Prepare</h3>
                <p class="text-gray-600">Finalize your booking with our secure payment system and receive your travel kit.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                <span class="font-bold">4</span>
              </div>
              <div>
                <h3 class="text-xl font-semibold mb-2">Embark on Your Journey</h3>
                <p class="text-gray-600">Travel with confidence knowing every detail is perfectly arranged by our team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Traveler Testimonials</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Real stories from adventurers who've explored the world with us.</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-md">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 text-xl">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
            </div>
            <p class="text-gray-600 mb-6">"The Bali tour was absolutely magical! Our guide took us to hidden beaches that weren't in any guidebook. The luxury accommodations exceeded our expectations."</p>
            <div class="flex items-center">
              <img loading="eager" :src="pagoSampleImage1" alt="Customer" class="w-12 h-12 rounded-full mr-4">
              <div>
                <h4 class="font-semibold">Sarah Johnson</h4>
                <p class="text-gray-500 text-sm">Bali Explorer</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-md">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 text-xl">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
            </div>
            <p class="text-gray-600 mb-6">"Our European heritage tour was flawlessly planned. From the cozy chalet in Switzerland to the wine tasting in Tuscany, every moment was pure bliss."</p>
            <div class="flex items-center">
              <img loading="eager" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80" alt="Customer" class="w-12 h-12 rounded-full mr-4">
              <div>
                <h4 class="font-semibold">Michael Chen</h4>
                <p class="text-gray-500 text-sm">European Adventurer</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-md">
            <div class="flex items-center mb-4">
              <div class="text-yellow-400 text-xl">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
              </div>
            </div>
            <p class="text-gray-600 mb-6">"The local food tour in Mexico City was a revelation! Our guide's passion for culinary arts turned a simple meal into a cultural experience we'll never forget."</p>
            <div class="flex items-center">
              <img loading="eager" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80" alt="Customer" class="w-12 h-12 rounded-full mr-4">
              <div>
                <h4 class="font-semibold">Emma Rodriguez</h4>
                <p class="text-gray-500 text-sm">Culinary Explorer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Travel Questions Answered</h2>
          <p class="text-xl text-gray-600">Everything you need to know about our tours and travel experiences.</p>
        </div>
        
        <div class="space-y-4">
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <button @click="toggleAccordion(1)" class="w-full flex justify-between items-center p-6 focus:outline-none accordion-button">
              <h3 class="text-lg font-semibold text-left">What destinations do you offer?</h3>
              <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300" :class="{ 'rotate-180': activeAccordionItem === 1 }"></i>
            </button>
            <div class="accordion-content px-6 pb-0" :class="{ 'active': activeAccordionItem === 1 }">
              <p class="text-gray-600 pb-6">We offer tours to over 150 destinations worldwide, from iconic international landmarks like the Pyramids of Giza and the Great Wall of China to hidden local gems in your own backyard. Our expert travel planners create new itineraries monthly based on seasonal attractions and customer interests.</p>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <button @click="toggleAccordion(2)" class="w-full flex justify-between items-center p-6 focus:outline-none accordion-button">
              <h3 class="text-lg font-semibold text-left">What's included in your tour packages?</h3>
              <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300" :class="{ 'rotate-180': activeAccordionItem === 2 }"></i>
            </button>
            <div class="accordion-content px-6 pb-0" :class="{ 'active': activeAccordionItem === 2 }">
              <p class="text-gray-600 pb-6">All our packages include premium accommodations, daily breakfast, select meals, airport transfers, guided tours, entrance fees to attractions, and 24/7 support during your journey. Optional upgrades for first-class flights, spa treatments, and exclusive experiences are also available.</p>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <button @click="toggleAccordion(3)" class="w-full flex justify-between items-center p-6 focus:outline-none accordion-button">
              <h3 class="text-lg font-semibold text-left">How far in advance should I book?</h3>
              <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300" :class="{ 'rotate-180': activeAccordionItem === 3 }"></i>
            </button>
            <div class="accordion-content px-6 pb-0" :class="{ 'active': activeAccordionItem === 3 }">
              <p class="text-gray-600 pb-6">We recommend booking 3-6 months in advance for peak travel seasons (summer, holidays, spring break) to secure the best accommodations and flight options. For off-season travel, 4-6 weeks is usually sufficient. Last-minute deals are sometimes available for spontaneous travelers.</p>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <button @click="toggleAccordion(4)" class="w-full flex justify-between items-center p-6 focus:outline-none accordion-button">
              <h3 class="text-lg font-semibold text-left">Do you offer group travel options?</h3>
              <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300" :class="{ 'rotate-180': activeAccordionItem === 4 }"></i>
            </button>
            <div class="accordion-content px-6 pb-0" :class="{ 'active': activeAccordionItem === 4 }">
              <p class="text-gray-600 pb-6">Yes! We specialize in group travel for families, corporate retreats, wedding parties, and special interest groups. Group packages include exclusive experiences, flexible payment plans, and dedicated travel coordinators to ensure seamless planning for groups of 10 or more.</p>
            </div>
          </div>
          
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <button @click="toggleAccordion(5)" class="w-full flex justify-between items-center p-6 focus:outline-none accordion-button">
              <h3 class="text-lg font-semibold text-left">What should I pack for my tour?</h3>
              <i class="fa-solid fa-chevron-down text-gray-500 transition-transform duration-300" :class="{ 'rotate-180': activeAccordionItem === 5 }"></i>
            </button>
            <div class="accordion-content px-6 pb-0" :class="{ 'active': activeAccordionItem === 5 }">
              <p class="text-gray-600 pb-6">Each booking includes a detailed packing list tailored to your destination, season, and activities. Our travel guides provide recommendations for appropriate attire, essential items, and local customs to ensure you're perfectly prepared for your journey.</p>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <p class="text-gray-600 mb-6">Still have questions? We're happy to help.</p>
          <button @click="handleContactUs" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition duration-300">
            Contact Our Travel Experts 
            <i class="fa-solid fa-headset ml-2"></i>
          </button>
        </div>
      </div>
    </section>

    <section class="py-20 bg-blue-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">Your Dream Vacation is Calling</h2>
        <p class="text-xl opacity-90 mb-8 max-w-3xl mx-auto">Join thousands of satisfied travelers who've discovered the world with us. Book your next adventure today!</p>
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button @click="scrollToSection('features-section')" class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-md text-lg font-semibold transition duration-300">
            Explore Tours 
            <i class="fa-solid fa-globe ml-2"></i>
          </button>
          <button @click="handleContactUs" class="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-md text-lg font-semibold transition duration-300">
            Chat with a Travel Expert 
            <i class="fa-solid fa-comments ml-2"></i>
          </button>
        </div>
      </div>
    </section>

    <footer class="bg-gray-900 text-white pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 class="text-lg font-semibold mb-4">Product</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Integrations</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Support</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Help Center</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Community</a></li>
              <li><a @click="handleContactUs" href="#" class="text-gray-400 hover:text-white transition">Contact Us</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Privacy</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Terms</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">GDPR</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center mb-4 md:mb-0">
            <i class="fa-solid fa-cube text-blue-400 text-2xl mr-2"></i>
            <span class="text-xl font-bold">PAGOAIRWAYS</span>
          </div>
          <div class="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 PAGOAIRWAYS. All rights reserved.
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fa-brands fa-facebook-f text-xl"></i></a>
            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fa-brands fa-twitter text-xl"></i></a>
            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fa-brands fa-linkedin-in text-xl"></i></a>
            <a href="#" class="text-gray-400 hover:text-white transition"><i class="fa-brands fa-instagram text-xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Script remains unchanged
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Use a reactive variable for the mobile menu state
const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Use a reactive variable to track the active FAQ item
const activeAccordionItem = ref(null);
const toggleAccordion = (index) => {
  if (activeAccordionItem.value === index) {
    activeAccordionItem.value = null; // Close if already open
  } else {
    activeAccordionItem.value = index; // Open the new one
  }
};

// Image imports (assuming these are in a place Vite can handle)
const pagoSampleImage1 = 'pagosample1.jpeg';
const pagoSampleImage2 = 'pagosample2.jpeg';

// Navigation & Functionality
const router = useRouter();

// Function for buttons that navigate to a new page
const handleGetStarted = () => {
  // Replace with the actual route name or path for your signup/start page
  router.push('/signup');
};

const handleContactUs = () => {
  // Replace with the actual route name or path for your contact page
  router.push('/contact');
};

// Function for buttons that scroll to a section on the same page
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    if (isMobileMenuOpen.value) {
      isMobileMenuOpen.value = false; // Close the mobile menu after scrolling
    }
  }
};
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 50%, #00D4FF 100%);
}
.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.accordion-content.active {
  max-height: 300px; /* Adjust this value to be larger than the largest possible content */
}
</style>