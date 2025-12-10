<template>
  <div class="min-h-screen py-12 px-4 sm:px-6" style="font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12" data-aos="fade-down">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Find Your Perfect Flight</h1>
        <p class="text-gray-600">Book your trip with ease and comfort</p>
      </div>

      <!-- Flight Type Selector -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 flight-card" data-aos="fade-up">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Flight Type</h2>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="type in flightTypes"
            :key="type.id"
            @click="selectFlightType(type.id)"
            :class="[
              'flight-type-btn px-5 py-3 rounded-full border border-gray-300 text-gray-700 bg-white',
              selectedFlightType === type.id ? 'active-flight-type' : ''
            ]"
          >
            <i :data-feather="type.icon" class="mr-2 w-5 h-5"></i>{{ type.label }}
          </button>
        </div>
      </div>

      <!-- Main Form -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 flight-card" data-aos="fade-up" data-aos-delay="100">
        <form @submit.prevent="searchFlights">
          <!-- Route Section -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Route Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-gray-700 mb-2">From (IATA code)</label>
                <div class="relative">
                  <input v-model="form.from" type="text" placeholder="e.g., PRG" class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none" required />
                  <i data-feather="navigation" class="absolute right-3 top-3.5 text-gray-400 w-5 h-5"></i>
                </div>
              </div>
              <div>
                <label class="block text-gray-700 mb-2">To (IATA code)</label>
                <div class="relative">
                  <input v-model="form.to" type="text" placeholder="e.g., LON" class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none" required />
                  <i data-feather="map-pin" class="absolute right-3 top-3.5 text-gray-400 w-5 h-5"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Date Section -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Travel Dates</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-gray-700 mb-2">Departing</label>
                <div class="relative">
                  <input v-model="form.departing" type="date" class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none" required />
                  <i data-feather="calendar" class="absolute right-3 top-3.5 text-gray-400 w-5 h-5"></i>
                </div>
              </div>
              <div v-if="selectedFlightType !== 'one-way'">
                <label class="block text-gray-700 mb-2">Returning</label>
                <div class="relative">
                  <input v-model="form.returning" type="date" class="form-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none" :required="selectedFlightType === 'round-trip'" />
                  <i data-feather="calendar" class="absolute right-3 top-3.5 text-gray-400 w-5 h-5"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Passengers Section -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Passengers</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-gray-700 mb-2">Adults</label>
                <div class="passenger-counter flex items-center border border-gray-300 rounded-lg w-32">
                  <button type="button" class="px-4 py-3 text-gray-600 text-xl" @click="decrement('adults')">-</button>
                  <span class="flex-1 text-center text-gray-700 font-medium">{{ form.adults }}</span>
                  <button type="button" class="px-4 py-3 text-gray-600 text-xl" @click="increment('adults')">+</button>
                </div>
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Children</label>
                <div class="passenger-counter flex items-center border border-gray-300 rounded-lg w-32">
                  <button type="button" class="px-4 py-3 text-gray-600 text-xl" @click="decrement('children')">-</button>
                  <span class="flex-1 text-center text-gray-700 font-medium">{{ form.children }}</span>
                  <button type="button" class="px-4 py-3 text-gray-600 text-xl" @click="increment('children')">+</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Class Section -->
          <div class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Cabin Class</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button
                v-for="cabin in cabinClasses"
                :key="cabin"
                type="button"
                @click="form.cabinClass = cabin"
                :class="[
                  'px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition',
                  form.cabinClass === cabin ? 'active-flight-type' : ''
                ]"
              >
                {{ cabin }}
              </button>
            </div>
          </div>

          <!-- Search Button -->
          <div class="text-center">
            <button type="submit" class="search-btn px-8 py-4 text-white font-semibold rounded-full text-lg w-full sm:w-auto" :disabled="isSearching">
              <i v-if="!isSearching" data-feather="search" class="mr-2 w-5 h-5"></i>
              <!-- Loading Spinner SVG -->
              <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSearching ? 'Searching...' : 'Search Flights' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Features Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" data-aos="fade-up" data-aos-delay="200">
        <div class="bg-white rounded-2xl shadow-lg p-6 flight-card text-center">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i data-feather="dollar-sign" class="text-blue-600 w-8 h-8"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Best Prices</h3>
          <p class="text-gray-600">We guarantee the best flight prices with no hidden fees</p>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-6 flight-card text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i data-feather="shield" class="text-green-600 w-8 h-8"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Secure Booking</h3>
          <p class="text-gray-600">Your personal information is protected with industry-standard security</p>
        </div>
        <div class="bg-white rounded-2xl shadow-lg p-6 flight-card text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i data-feather="headphones" class="text-purple-600 w-8 h-8"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
          <p class="text-gray-600">Our customer service team is available around the clock</p>
        </div>
      </div>
      
      <!-- Custom Search Message Modal -->
      <transition name="modal-fade">
        <div v-if="searchMessage" class="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div class="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full text-left overflow-auto max-h-[90vh]">
                <h3 class="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Search Status</h3>
                <!-- Use whitespace-pre-wrap to respect newlines/formatting in the JSON response -->
                <p class="text-gray-700 mb-6 text-sm whitespace-pre-wrap">{{ searchMessage }}</p>
                <div class="text-center">
                    <button @click="searchMessage = ''" class="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-semibold">Close</button>
                </div>
            </div>
        </div>
      </transition>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
// Note: Assuming 'axios' is available in your project environment
import axios from 'axios'; 
// Note: Assuming 'vue-router', 'aos', and 'feather-icons' are correctly configured or available globally/locally
// Removed useRouter as navigation is now replaced by API call status message
import AOS from "aos";
import "aos/dist/aos.css";
import feather from "feather-icons";

// --- Configuration ---
// IMPORTANT: Change this to your actual flight search API endpoint
const API_ENDPOINT = 'http://127.0.0.1:8081/flights/search'; 

const cabinClassMap = {
    'Economy': 'ECO',
    'Premium': 'PRE',
    'Business': 'BUS',
    'First': 'FST',
};

// --- State Definitions ---
const selectedFlightType = ref("round-trip");
const searchMessage = ref("");
const isSearching = ref(false); // New state for loading indicator

const flightTypes = [
    { id: "one-way", label: "One Way", icon: "arrow-right" },
    { id: "round-trip", label: "Round Trip", icon: "refresh-cw" },
    { id: "multi-city", label: "Multi-City", icon: "map" }
];

const form = ref({
    // Initial values set for easier testing
    from: "PRG", 
    to: "LON",
    departing: new Date().toISOString().slice(0, 10),
    returning: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    adults: 1,
    children: 0,
    cabinClass: "Business" // Maps to BUS
});

const cabinClasses = ["Economy", "Premium", "Business", "First"];

// --- Utility Functions ---

/**
 * Maps the flat form data into the complex nested JSON structure required by the API.
 */
const formatRequestBody = (formData, flightType) => {
    // Determine the IATA codes (enforce uppercase as is common in travel APIs)
    const origin = formData.from.toUpperCase();
    const destination = formData.to.toUpperCase();
    const departureDate = formData.departing;
    
    // 1. Build Passenger Array (ADT code repeated for each adult)
    const passengers = [];
    for (let i = 0; i < formData.adults; i++) {
        passengers.push({ "Code": "ADT" }); 
    }
    // NOTE: You would need to add logic for children (e.g., CHD, INF codes) here
    // if your API supports it and your form tracks ages.

    // 2. Build Flight Steps Array
    const flightSteps = [
        {
            "Origin": origin,
            "Destination": destination,
            // API expects ISO datetime format (YYYY-MM-DDTHH:MM). Using a default time.
            "DepartureDateTime": departureDate + "T01:01", 
            
            // Hardcoded optional fields from your original example
            "TimeWindow": { "Type": "morning" },
            "TimeRange": { "TimeFrom": "12:00", "TimeTo": "18:00" },
            "FlexDays": { "Before": "1", "After": "1" }
        }
    ];
    
    // Add return flight step if Round Trip is selected
    if (flightType === 'round-trip' && formData.returning) {
        flightSteps.push({
            "Origin": destination,
            "Destination": origin,
            "DepartureDateTime": formData.returning + "T01:01",
            "TimeWindow": { "Type": "afternoon" },
        });
    }

    // 3. Construct the final request body
    return {
        "SearchFlightsRequest_1": {
            "FlightSteps": {
                "FlightStep": flightSteps
            },
            "SearchedPassengers": {
                "SearchedPassenger": passengers,
            },
            "FlightPreferences": {
                // Hardcoded optional fields from your original example
                "PriceLimit": { "Price": "5000.00" }, 
                "FlightClass": { "Type": cabinClassMap[formData.cabinClass] || "ECO" },
                "PreferredCompany": { "Type": "BA" },
                "DirectFlight": {}, // Assuming this sends an empty object tag
                "IncludeCombinedFlights": {}, // Assuming this sends an empty object tag
                "OfferQuantityLimit": { "Limit": "3" },
                "FilterTransferDestinations": {
                    "FilterTransferDestination": [
                        { "Country": "US" }
                    ]
                }
            }
        }
    };
};


// --- Methods ---

const selectFlightType = (type) => {
    selectedFlightType.value = type;
    // Re-render icons if v-if changes caused them to be lost
    nextTick(() => {
        feather.replace();
    });
};

const increment = (field) => {
    form.value[field]++;
};

const decrement = (field) => {
    if (form.value[field] > (field === 'adults' ? 1 : 0)) { // Minimum 1 adult, 0 children
        form.value[field]--;
    }
};

const searchFlights = async () => {
    if (isSearching.value) return;

    // Basic validation
    if (!form.value.from || !form.value.to || !form.value.departing) {
        searchMessage.value = "Validation Error: Please fill in Origin, Destination, and Departure Date.";
        return;
    }
    
    if (selectedFlightType.value === 'round-trip' && !form.value.returning) {
        searchMessage.value = "Validation Error: Please select a Return Date for Round Trip flights.";
        return;
    }
    
    isSearching.value = true;
    searchMessage.value = "Preparing request and searching for flights...";

    try {
        // 1. Format the body
        const requestBody = formatRequestBody(form.value, selectedFlightType.value);
        const token = localStorage.getItem('authToken')
        
        console.log('--- Sending Request Body to API ---');
        console.log(JSON.stringify(requestBody, null, 2));
        
        // 2. Send the request using Axios
        const response = await axios.post(API_ENDPOINT, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                // Add Authorization header here if needed
                 'Authorization': `Bearer ${token}` 
            },
            timeout: 15000 // Set a reasonable timeout
        });

        // 3. Handle successful response
        console.log('--- API Response Success ---', response.data);
        searchMessage.value = "✅ Flight Search Successful!\n\nSent Request:\n" 
            + JSON.stringify(requestBody, null, 2)
            + "\n\nReceived Response:\n" 
            + JSON.stringify(response.data, null, 2);

    } catch (error) {
        // 4. Handle errors (network, timeout, or HTTP error status codes)
        let errorMessage = "❌ Flight Search Failed.\n\n";
        
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Server responded with a status code outside the 2xx range
                errorMessage += `HTTP Status: ${error.response.status}\n`;
                errorMessage += `Server Message: ${JSON.stringify(error.response.data, null, 2)}`;
            } else if (error.request) {
                // Request was made but no response received (network error/timeout)
                errorMessage += "Network Error: No response received from server. Check URL or network connection.";
            } else {
                // Something else happened
                errorMessage += `Request Setup Error: ${error.message}`;
            }
        } else {
            errorMessage += `Unknown Error: ${error.message}`;
        }
        
        console.error(errorMessage);
        searchMessage.value = errorMessage;

    } finally {
        isSearching.value = false;
        // Ensure icons are replaced after the loading spinner is gone
        nextTick(() => feather.replace()); 
    }
};

// --- Lifecycle Hook ---

onMounted(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic" });
    feather.replace();
});
</script>

<style scoped>
/* CSS Styles (Sustained from original) */
.flight-card {
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
.flight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
.flight-type-btn {
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}
.flight-type-btn:hover {
  transform: scale(1.05);
}
.active-flight-type {
  background-color: #3b82f6;
  color: white !important;
  border-color: #3b82f6;
}
.passenger-counter button {
  transition: all 0.2s ease;
}
.passenger-counter button:hover {
  transform: scale(1.1);
}
.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
.search-btn {
  background: linear-gradient(90deg, #3b82f6, #6366f1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-btn:hover {
  background: linear-gradient(90deg, #2563eb, #4f46e5);
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Styles for modal transition */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
</style>
