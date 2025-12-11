<template>
  <div class="min-h-screen bg-gray-50">
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
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Dashboard</a>
              <a href="#" class="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Flights</a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Accommodations</a>
            </nav>
          </div>

          <div class="flex items-center">
            <button class="bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none" title="Notifications">
              <i data-feather="bell" class="h-6 w-6"></i>
            </button>
            <div class="ml-3 relative">
              <div class="flex items-center">
                <button class="flex text-sm rounded-full focus:outline-none">
                  <img loading="eager" :src="user.avatar" alt="User profile" class="h-8 w-8 rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">My Flights</h1>
          <p class="mt-1 text-gray-600">Manage your flight reservations and bookings</p>
        </div>
        <div class="mt-4 md:mt-0">
          <button @click="bookNew" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none">
            <i data-feather="plus" class="h-4 w-4 mr-2"></i>
            Book New Flight
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="flex flex-wrap gap-2">
            <button @click="setFilter('all')" :class="btnClass('all')" class="px-3 py-1.5 text-sm rounded-full font-medium">All Flights</button>
            <button @click="setFilter('upcoming')" :class="btnClass('upcoming')" class="px-3 py-1.5 text-sm rounded-full font-medium">Upcoming</button>
            <button @click="setFilter('past')" :class="btnClass('past')" class="px-3 py-1.5 text-sm rounded-full font-medium">Past</button>
            <button @click="setFilter('cancelled')" :class="btnClass('cancelled')" class="px-3 py-1.5 text-sm rounded-full font-medium">Cancelled</button>
          </div>

          <div class="mt-3 md:mt-0 relative w-full md:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i data-feather="search" class="h-4 w-4 text-gray-400"></i>
            </div>
            <input v-model="searchQuery" @input="onSearch" type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Search flights..." />
          </div>
        </div>
      </div>

      <!-- Flight List -->
      <div class="space-y-6">
        <article v-for="flight in pagedFlights" :key="flight.id" class="bg-white rounded-xl shadow-sm overflow-hidden flight-card">
          <div class="p-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div class="flex items-center">
                <div :class="['flex-shrink-0 h-12 w-12 rounded-md flex items-center justify-center', airlineBgClass(flight.airlineCode)]">
                  <span class="font-bold" :class="airlineTextClass(flight.airlineCode)">{{ flight.airlineCode }}</span>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-bold text-gray-900">{{ flight.airline }} #{{ flight.flightNo }}</h3>
                  <p class="text-gray-500">{{ flight.origin }} → {{ flight.destination }}</p>
                </div>
              </div>

              <div class="mt-4 md:mt-0 flex items-center">
                <span :class="statusClass(flight.status)" class="status-badge inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                  <i :data-feather="statusIcon(flight.status)" class="h-4 w-4 mr-1"></i>
                  {{ flight.status }}
                </span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex items-center">
                <div class="text-center">
                  <p class="text-2xl font-bold text-gray-900">{{ flight.departTime }}</p>
                  <p class="text-sm text-gray-500">{{ flight.originCode }}</p>
                  <p class="text-xs text-gray-400 mt-1">Terminal {{ flight.departTerminal }}</p>
                </div>

                <div class="mx-4 flex-1">
                  <div class="relative">
                    <div class="flex justify-between text-sm text-gray-500 mb-1">
                      <span>{{ flight.date }}</span>
                      <span>{{ flight.duration }}</span>
                    </div>
                    <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-primary-500 rounded-full" :style="{ width: flight.progress + '%' }"></div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <i data-feather="arrow-right" class="h-4 w-4 text-gray-400"></i>
                    </div>
                  </div>
                </div>

                <div class="text-center">
                  <p class="text-2xl font-bold text-gray-900">{{ flight.arriveTime }}</p>
                  <p class="text-sm text-gray-500">{{ flight.destinationCode }}</p>
                  <p class="text-xs text-gray-400 mt-1">Terminal {{ flight.arriveTerminal }}</p>
                </div>
              </div>

              <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-gray-500">Passenger</p>
                  <p class="font-medium">{{ flight.passenger }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Class</p>
                  <p class="font-medium">{{ flight.travelClass }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Booking Reference</p>
                  <p class="font-medium">{{ flight.bookingRef }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Seat</p>
                  <p class="font-medium">{{ flight.seat }}</p>
                </div>
              </div>
            </div>

            <div class="mt-6 flex flex-wrap gap-3">
              <button @click="download(flight)" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <i data-feather="download" class="h-4 w-4 mr-2"></i>Download Ticket
              </button>

              <button @click="modify(flight)" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <i data-feather="edit" class="h-4 w-4 mr-2"></i>Modify Booking
              </button>

              <button @click="checkin(flight)" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <i data-feather="check-square" class="h-4 w-4 mr-2"></i>Check-in
              </button>

              <button @click="cancel(flight)" class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                <i data-feather="x-circle" class="h-4 w-4 mr-2"></i>Cancel Flight
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div class="mt-8 flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredFlights.length }}</span> results
        </div>
        <div class="flex space-x-2">
          <button @click="prevPage" :disabled="page === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
            Previous
          </button>
          <button @click="nextPage" :disabled="endIndex >= filteredFlights.length" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

/* -------------------------
   Simple script loader
   ------------------------- */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = (e) => reject(e)
    document.head.appendChild(s)
  })
}

/* -------------------------
   App state & sample data
   ------------------------- */
const user = reactive({
  name: 'Alex Johnson',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=0ea5e9&color=ffffff'
})

const router = useRouter()

const flights = ref([
  {
    id: '1',
    airline: 'American Airlines',
    airlineCode: 'AA',
    flightNo: 'AA123',
    origin: 'New York (JFK)',
    originCode: 'JFK',
    destination: 'London (LHR)',
    destinationCode: 'LHR',
    departTime: '08:45',
    arriveTime: '20:15',
    departTerminal: '4',
    arriveTerminal: '5',
    date: 'May 15',
    duration: '7h 30m',
    progress: 30,
    passenger: 'Alex Johnson',
    travelClass: 'Business',
    bookingRef: 'ABC123',
    seat: '12A',
    status: 'On Time'
  },
  {
    id: '2',
    airline: 'Delta Airlines',
    airlineCode: 'DL',
    flightNo: 'DL456',
    origin: 'London (LHR)',
    originCode: 'LHR',
    destination: 'Paris (CDG)',
    destinationCode: 'CDG',
    departTime: '14:30',
    arriveTime: '16:45',
    departTerminal: '3',
    arriveTerminal: '2E',
    date: 'May 22',
    duration: '1h 15m',
    progress: 0,
    passenger: 'Alex Johnson',
    travelClass: 'Economy',
    bookingRef: 'DEF456',
    seat: '24F',
    status: 'Delayed'
  },
  {
    id: '3',
    airline: 'Air France',
    airlineCode: 'AF',
    flightNo: 'AF789',
    origin: 'Paris (CDG)',
    originCode: 'CDG',
    destination: 'New York (JFK)',
    destinationCode: 'JFK',
    departTime: '10:15',
    arriveTime: '13:35',
    departTerminal: '2F',
    arriveTerminal: '1',
    date: 'May 25',
    duration: '8h 20m',
    progress: 100,
    passenger: 'Alex Johnson',
    travelClass: 'Economy',
    bookingRef: 'GHI789',
    seat: '33C',
    status: 'Completed'
  }
])

/* -------------------------
   Filters, search & paging
   ------------------------- */
const filter = ref('all')
const searchQuery = ref('')
const page = ref(1)
const pageSize = ref(5)

const filteredFlights = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return flights.value.filter(f => {
    if (filter.value === 'upcoming' && f.status === 'Completed') return false
    if (filter.value === 'past' && f.status !== 'Completed') return false
    if (filter.value === 'cancelled' && f.status !== 'Cancelled') return false
    if (!q) return true
    return (
      f.airline.toLowerCase().includes(q) ||
      f.flightNo.toLowerCase().includes(q) ||
      f.origin.toLowerCase().includes(q) ||
      f.destination.toLowerCase().includes(q) ||
      f.bookingRef.toLowerCase().includes(q)
    )
  })
})

const startIndex = computed(() => (page.value - 1) * pageSize.value)
const endIndex = computed(() => Math.min(page.value * pageSize.value, filteredFlights.value.length))
const pagedFlights = computed(() => filteredFlights.value.slice(startIndex.value, endIndex.value))

watch([searchQuery, filter], () => {
  page.value = 1
})

function setFilter(name) {
  filter.value = name
}

function btnClass(name) {
  return filter.value === name ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
}

/* -------------------------
   Small helpers & actions
   ------------------------- */
function statusClass(status) {
  if (status === 'On Time') return 'bg-green-100 text-green-800'
  if (status === 'Delayed') return 'bg-amber-100 text-amber-800'
  if (status === 'Cancelled') return 'bg-red-100 text-red-700'
  if (status === 'Completed') return 'bg-gray-100 text-gray-800'
  return 'bg-gray-100 text-gray-800'
}

function statusIcon(status) {
  if (status === 'On Time') return 'check-circle'
  if (status === 'Delayed') return 'clock'
  if (status === 'Cancelled') return 'x-circle'
  return 'check-circle'
}

function airlineBgClass(code) {
  // simple color buckets based on code
  if (code === 'AA') return 'bg-primary-100'
  if (code === 'DL') return 'bg-amber-100'
  return 'bg-gray-100'
}
function airlineTextClass(code) {
  if (code === 'AA') return 'text-primary-800'
  if (code === 'DL') return 'text-amber-800'
  return 'text-gray-800'
}

function download(f) {
  alert(`Downloading ticket for ${f.flightNo}`)
}
function modify(f) {
  alert(`Modify booking ${f.bookingRef}`)
}
function checkin(f) {
  alert(`Checking in ${f.passenger}`)
}
function cancel(f) {
  const ok = confirm(`Cancel flight ${f.flightNo}?`)
  if (ok) {
    // mark cancelled locally for demo
    const idx = flights.value.findIndex(x => x.id === f.id)
    if (idx !== -1) flights.value[idx].status = 'Cancelled'
  }
}
function bookNew() {
  router.push('/bookflight/searchflight')
}
function onSearch() {
  // debounce could be added; here we just reset page
  page.value = 1
}

/* -------------------------
   Pagination
   ------------------------- */
function nextPage() {
  if (endIndex.value < filteredFlights.value.length) page.value++
}
function prevPage() {
  if (page.value > 1) page.value--
}

/* -------------------------
   Lifecycle: load Feather icons
   ------------------------- */
onMounted(async () => {
  try {
    if (!window.feather) {
      await loadScript('https://unpkg.com/feather-icons')
    }
    window.feather && window.feather.replace()
  } catch (e) {
    // ignore
    // console.warn('feather load failed', e)
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

/* card hover */
.flight-card {
  transition: all 0.3s ease;
}
.flight-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* badge transition */
.status-badge {
  transition: all 0.2s ease;
}
</style>
