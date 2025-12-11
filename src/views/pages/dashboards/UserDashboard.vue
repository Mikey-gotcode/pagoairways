<template>
  <div class="relative">
    <!-- Background Animation -->
    <div id="vanta-bg" class="fixed top-0 left-0 w-full h-full z-0"></div>

    <!-- Main Content -->
    <div class="relative z-10 min-h-screen">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0 flex items-center">
                <i data-feather="navigation" class="h-8 w-8 text-primary-600"></i>
                <span class="ml-2 text-xl font-bold text-gray-900">SkySuite</span>
              </div>
              <nav class="ml-6 flex space-x-8">
                <router-link to="/dashboard/main" class="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Dashboard</router-link>
                <router-link to="/dashboard/flights" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Flights</router-link>
                <router-link to="/dashboard/accomodations" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Accommodations</router-link>
              </nav>
            </div>

            <div class="flex items-center">
              <button class="bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                <i data-feather="bell" class="h-6 w-6"></i>
              </button>
              <div class="ml-3 relative">
                <div class="flex items-center">
                  <button @click="openProfile()" class="flex text-sm rounded-full focus:outline-none">
                    <img loading="eager" class="h-8 w-8 rounded-full" :src="user.avatar" alt="User profile" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Welcome -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Welcome back, {{ user.name }}!</h1>
          <p class="mt-2 text-gray-600">Manage your flights and accommodations with ease</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-primary-100">
                <i data-feather="navigation" class="h-6 w-6 text-primary-600"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Upcoming Flights</p>
                <p class="text-2xl font-semibold text-gray-900">{{ upcomingFlights.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-secondary-100">
                <i data-feather="home" class="h-6 w-6 text-secondary-600"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Booked Stays</p>
                <p class="text-2xl font-semibold text-gray-900">{{ accommodations.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-green-100">
                <i data-feather="check-circle" class="h-6 w-6 text-green-600"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Completed Trips</p>
                <p class="text-2xl font-semibold text-gray-900">{{ completedTrips }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 card-hover">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-amber-100">
                <i data-feather="dollar-sign" class="h-6 w-6 text-amber-600"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Loyalty Points</p>
                <p class="text-2xl font-semibold text-gray-900">{{ user.points.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Flights -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-900">Upcoming Flights</h2>
            <button class="text-primary-600 hover:text-primary-800 text-sm font-medium">View All</button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="flight in upcomingFlights" :key="flight.id" class="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
              <div class="p-6">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-bold text-gray-900">{{ flight.title }}</h3>
                    <p class="text-gray-500">{{ flight.route }}</p>
                  </div>
                  <span :class="['inline-flex items-center px-3 py-1 rounded-full text-sm font-medium', flight.status === 'On Time' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800']">
                    {{ flight.status }}
                  </span>
                </div>

                <div class="mt-4 flex items-center justify-between">
                  <div class="text-center">
                    <p class="text-2xl font-bold text-gray-900">{{ flight.departTime }}</p>
                    <p class="text-sm text-gray-500">{{ flight.departCode }}</p>
                  </div>

                  <div class="flex-1 mx-4">
                    <div class="relative">
                      <div class="flex justify-between text-sm text-gray-500 mb-1">
                        <span>{{ flight.date }}</span>
                        <span>{{ flight.duration }}</span>
                      </div>
                      <div class="flight-progress bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full bg-primary-500 rounded-full" :style="{ width: flight.progress + '%' }"></div>
                      </div>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <i data-feather="arrow-right" class="h-4 w-4 text-gray-400"></i>
                      </div>
                    </div>
                  </div>

                  <div class="text-center">
                    <p class="text-2xl font-bold text-gray-900">{{ flight.arriveTime }}</p>
                    <p class="text-sm text-gray-500">{{ flight.arriveCode }}</p>
                  </div>
                </div>

                <div class="mt-6 flex space-x-3">
                  <button @click="downloadTicket(flight)" class="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition text-sm font-medium">Download Ticket</button>
                  <button @click="openMore(flight)" class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i data-feather="more-vertical" class="h-5 w-5 text-gray-500"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Accommodations -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-900">Your Accommodations</h2>
            <button class="text-primary-600 hover:text-primary-800 text-sm font-medium">View All</button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="stay in accommodations" :key="stay.id" class="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
              <img loading="eager" class="h-40 w-full object-cover" :src="stay.image" alt="Hotel" />
              <div class="p-6">
                <div class="flex justify-between">
                  <h3 class="text-lg font-bold text-gray-900">{{ stay.title }}</h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Confirmed</span>
                </div>
                <p class="text-gray-500 text-sm mt-1">{{ stay.location }}</p>
                <div class="mt-4 flex items-center text-sm text-gray-500">
                  <i data-feather="calendar" class="h-4 w-4 mr-1"></i>
                  <span>{{ stay.dates }}</span>
                </div>
                <div class="mt-4 flex space-x-3">
                  <button class="flex-1 bg-secondary-600 text-white py-2 px-4 rounded-lg hover:bg-secondary-700 transition text-sm font-medium">View Details</button>
                  <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <i data-feather="download" class="h-5 w-5 text-gray-500"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm overflow-hidden border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:border-primary-300 transition">
              <i data-feather="plus-circle" class="h-12 w-12 text-gray-400"></i>
              <h3 class="mt-4 text-lg font-medium text-gray-900">Add Accommodation</h3>
              <p class="mt-2 text-sm text-gray-500">Book a new stay for your trip</p>
              <button class="mt-4 text-primary-600 hover:text-primary-800 text-sm font-medium">Browse Properties</button>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div>
          <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button class="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition">
              <div class="p-3 rounded-full bg-primary-100">
                <i data-feather="user" class="h-6 w-6 text-primary-600"></i>
              </div>
              <span class="mt-3 text-sm font-medium text-gray-900">Profile</span>
            </button>

            <button class="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition">
              <div class="p-3 rounded-full bg-secondary-100">
                <i data-feather="settings" class="h-6 w-6 text-secondary-600"></i>
              </div>
              <span class="mt-3 text-sm font-medium text-gray-900">Settings</span>
            </button>

            <button class="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition">
              <div class="p-3 rounded-full bg-green-100">
                <i data-feather="credit-card" class="h-6 w-6 text-green-600"></i>
              </div>
              <span class="mt-3 text-sm font-medium text-gray-900">Payments</span>
            </button>

            <button class="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition">
              <div class="p-3 rounded-full bg-amber-100">
                <i data-feather="help-circle" class="h-6 w-6 text-amber-600"></i>
              </div>
              <span class="mt-3 text-sm font-medium text-gray-900">Support</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function openProfile(){
    router.push('/dashboard/profile')
}

// ... (loadScript helper function remains the same) ...
function loadScript(src) {
  return new Promise((resolve, reject) => {
    // already loaded?
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve()
    }
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = (e) => reject(e)
    document.head.appendChild(s)
  })
}


const state = reactive({
  user: {
    // Default placeholder values
    name: 'Loading User...',
    email: '',
    avatar: 'https://ui-avatars.com/api/?name=User&background=0ea5e9&color=ffffff',
    points: 0,
    isLoggedIn: false
  },
  // ... (upcomingFlights and accommodations arrays remain the same)
  upcomingFlights: [
    {
      id: 'f1',
      title: 'Flight #AA123',
      route: 'New York (JFK) → London (LHR)',
      status: 'On Time',
      departTime: '08:45',
      departCode: 'JFK',
      arriveTime: '20:15',
      arriveCode: 'LHR',
      date: 'May 15',
      duration: '7h 30m',
      progress: 30
    },
    {
      id: 'f2',
      title: 'Flight #DL456',
      route: 'London (LHR) → Paris (CDG)',
      status: 'Delayed',
      departTime: '14:30',
      departCode: 'LHR',
      arriveTime: '16:45',
      arriveCode: 'CDG',
      date: 'May 22',
      duration: '1h 15m',
      progress: 0
    }
  ],
  accommodations: [
    {
      id: 's1',
      title: 'Grand Plaza Hotel',
      location: 'London, United Kingdom',
      dates: 'May 15 - May 22, 2023',
      image: 'https://placehold.co/640x360?text=Grand+Plaza'
    },
    {
      id: 's2',
      title: 'Eiffel View Apartments',
      location: 'Paris, France',
      dates: 'May 22 - May 25, 2023',
      image: 'https://placehold.co/640x360?text=Eiffel+View'
    }
  ],
  vantaEffect: null
})

const user = state.user
const upcomingFlights = state.upcomingFlights
const accommodations = state.accommodations

const completedTrips = computed(() => 12)

function downloadTicket(flight) {
  // placeholder: integrate with backend to fetch/stream ticket
  alert(`Downloading ticket for ${flight.title}`)
}

function openMore(flight) {
  // placeholder modal or menu
  alert(`More actions for ${flight.title}`)
}

// --- NEW FUNCTION: Fetch User Profile ---
async function fetchUserProfile() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // If no token, redirect to login
    router.push('/login');
    return;
  }

  try {
    const response = await fetch('http://localhost:8081/profile', { // Replace with your actual Go profile endpoint
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      
      // Assuming your Go backend /api/profile returns { email, name, avatar_url, points }
      // NOTE: You must implement this secured /api/profile endpoint in Go!
      user.name = data.name || data.email.split('@')[0] || 'SkySuite User';
      user.email = data.email;
      user.avatar = data.avatar_url ;
      user.points = data.points || 0;
      user.isLoggedIn = true;
    } else if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      router.push('/login');
    } else {
      console.error('Failed to fetch profile:', response.statusText);
      // Fallback to default user data
      user.name = 'Guest';
    }
  } catch (error) {
    console.error('Network error fetching profile:', error);
    user.name = 'Error';
  }
}
// --- END NEW FUNCTION ---


onMounted(async () => {
  // 1. Fetch user data immediately
  await fetchUserProfile();

  // 2. Load Feather icons (existing logic)
  try {
    if (!window.feather) {
      await loadScript('https://unpkg.com/feather-icons')
    }
    window.feather && window.feather.replace()
  } catch (e) {
    // silently ignore
  }

  // 3. Load and init Vanta Globe (existing logic)
  try {
    if (!window.VANTA) {
      if (!window.THREE) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js')
      }
      await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js')
    }

    // eslint-disable-next-line no-undef
    state.vantaEffect = window.VANTA && window.VANTA.GLOBE
      ? window.VANTA.GLOBE({
          el: '#vanta-bg',
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x0ea5e9,
          color2: 0x8b5cf6,
          backgroundColor: 0xf0f9ff
        })
      : null
  } catch (e) {
    // Vanta failed — ignore gracefully
  }
})

onBeforeUnmount(() => {
  // cleanup vanta effect
  if (state.vantaEffect && typeof state.vantaEffect.destroy === 'function') {
    state.vantaEffect.destroy()
    state.vantaEffect = null
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  font-family: 'Poppins', sans-serif;
}

body {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
}

/* small copied styles from original */
.card-hover {
  transition: all 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.flight-progress {
  height: 8px;
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ensure vanta-bg is behind everything */
#vanta-bg {
  z-index: 0;
}
</style>
