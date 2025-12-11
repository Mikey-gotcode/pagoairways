<template>
  <div class="bg-light font-sans">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <i data-feather="navigation" class="text-primary mr-2"></i>
          <h1 class="text-2xl font-bold text-primary text-black">PagoAirways</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button class="flex items-center text-gray-600 hover:text-primary">
            <i data-feather="user" class="mr-1"></i>
            <span>Account</span>
          </button>
          <button class="flex items-center text-gray-600 hover:text-primary">
            <i data-feather="help-circle" class="mr-1"></i>
            <span>Help</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-black">Flight Preview</h2>
        <p class="text-gray-600">Review your selected flights before checkout</p>
      </div>

      <!-- Flight Summary -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8" data-aos="fade-up">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h3 class="text-xl font-semibold text-black mb-2 md:mb-0">Trip Summary</h3>
          <div class="flex space-x-2">
            <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Round Trip</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">2 Passengers</span>
          </div>
        </div>

        <!-- Outbound Flight -->
        <div class="flight-card bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div class="flex items-center mb-4 md:mb-0">
              <div class="bg-white p-3 rounded-lg shadow-sm mr-4">
                <img loading="eager" src="http://static.photos/airline/200x200/1" alt="Airline" class="w-12 h-12 object-contain" />
              </div>
              <div>
                <h4 class="font-bold text-lg text-black">Outbound Flight</h4>
                <p class="text-gray-600">PagoAirways Airlines • Flight #SK789</p>
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-2xl font-bold text-primary">$420</span>
              <span class="text-gray-500 ml-2">per person</span>
            </div>
          </div>

          <div class="flight-path my-6"></div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center">
              <p class="text-gray-500 text-sm">Departure</p>
              <p class="font-bold text-lg">08:45 AM</p>
              <p class="text-gray-600">JFK • New York</p>
              <p class="text-gray-500 text-sm">Sat, Jun 15</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500 text-sm">Duration</p>
              <p class="font-bold text-lg">6h 30m</p>
              <p class="text-gray-600">Direct</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500 text-sm">Arrival</p>
              <p class="font-bold text-lg">03:15 PM</p>
              <p class="text-gray-600">LAX • Los Angeles</p>
              <p class="text-gray-500 text-sm">Sat, Jun 15</p>
            </div>
          </div>

          <div class="divider my-6">
            <span class="text-gray-500 text-sm">Flight Details</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-gray-500 text-sm">Cabin Class</p>
              <p class="font-medium">Economy</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Baggage</p>
              <p class="font-medium">1 Checked Bag • 1 Carry-on</p>
            </div>
          </div>
        </div>

        <!-- Return Flight -->
        <div class="flight-card bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div class="flex items-center mb-4 md:mb-0">
              <div class="bg-white p-3 rounded-lg shadow-sm mr-4">
                <img loading="eager" src="http://static.photos/airline/200x200/2" alt="Airline" class="w-12 h-12 object-contain" />
              </div>
              <div>
                <h4 class="font-bold text-lg text-black">Return Flight</h4>
                <p class="text-gray-600">PagoAirways Airlines • Flight #SK456</p>
              </div>
            </div>
            <div class="flex items-center">
              <span class="text-2xl font-bold text-primary">$380</span>
              <span class="text-gray-500 ml-2">per person</span>
            </div>
          </div>

          <div class="flight-path my-6"></div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center">
              <p class="text-gray-500 text-sm">Departure</p>
              <p class="font-bold text-lg">02:30 PM</p>
              <p class="text-gray-600">LAX • Los Angeles</p>
              <p class="text-gray-500 text-sm">Sat, Jun 22</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500 text-sm">Duration</p>
              <p class="font-bold text-lg">5h 45m</p>
              <p class="text-gray-600">Direct</p>
            </div>
            <div class="text-center">
              <p class="text-gray-500 text-sm">Arrival</p>
              <p class="font-bold text-lg">10:15 PM</p>
              <p class="text-gray-600">JFK • New York</p>
              <p class="text-gray-500 text-sm">Sat, Jun 22</p>
            </div>
          </div>

          <div class="divider my-6">
            <span class="text-gray-500 text-sm">Flight Details</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-gray-500 text-sm">Cabin Class</p>
              <p class="font-medium">Economy</p>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Baggage</p>
              <p class="font-medium">1 Checked Bag • 1 Carry-on</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Price Breakdown -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8" data-aos="fade-up">
        <h3 class="text-xl font-semibold text-black mb-4">Price Breakdown</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Outbound Flight (2 passengers)</span>
            <span class="font-medium">$840.00</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Return Flight (2 passengers)</span>
            <span class="font-medium">$760.00</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Taxes & Fees</span>
            <span class="font-medium">$124.50</span>
          </div>
          <div class="divider my-2">
            <span></span>
          </div>
          <div class="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span class="text-primary">$1,724.50</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4" data-aos="fade-up">
        <button class="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
          <i data-feather="arrow-left" class="mr-2"></i>
          Back to Search
        </button>
        <button class="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg">
          Proceed to Checkout
          <i data-feather="arrow-right" class="ml-2"></i>
        </button>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-12 mt-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center mb-4">
              <i data-feather="navigation" class="mr-2"></i>
              <h3 class="text-black text-xl font-bold">PagoAirways</h3>
            </div>
            <p class="text-gray-400">
              Your trusted partner for seamless travel experiences around the globe.
            </p>
          </div>
          <div>
            <h4 class="text-lg text-black font-semibold mb-4">Explore</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">Destinations</a></li>
              <li><a href="#" class="hover:text-white transition">Special Offers</a></li>
              <li><a href="#" class="hover:text-white transition">Travel Guides</a></li>
              <li><a href="#" class="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg text-black font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">Help Center</a></li>
              <li><a href="#" class="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition">Flight Status</a></li>
              <li><a href="#" class="hover:text-white transition">Refunds</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg text-black font-semibold mb-4">Connect</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition"><i data-feather="facebook"></i></a>
              <a href="#" class="text-gray-400 hover:text-white transition"><i data-feather="twitter"></i></a>
              <a href="#" class="text-gray-400 hover:text-white transition"><i data-feather="instagram"></i></a>
              <a href="#" class="text-gray-400 hover:text-white transition"><i data-feather="linkedin"></i></a>
            </div>
            <p class="mt-4 text-gray-400">Subscribe to our newsletter</p>
            <div class="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                class="px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none w-full"
              />
              <button class="px-4 py-2 rounded-r-lg bg-blue-300 hover:bg-blue-600 transition">
                Join
              </button>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© 2023 PagoAirways Airlines. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import feather from "feather-icons";

export default {
  name: "FlightPreview",
  mounted() {
    AOS.init({ duration: 800, once: true });
    feather.replace();
  },
  updated() {
    feather.replace();
  }
};
</script>

<style scoped>
.flight-card {
  transition: all 0.3s ease;
}
.flight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.divider {
  position: relative;
  text-align: center;
  margin: 2rem 0;
}
.divider:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #cbd5e0, transparent);
}
.divider span {
  background: white;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}
.flight-path {
  position: relative;
}
.flight-path:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #e2e8f0;
  z-index: 1;
}
.flight-path:after {
  content: "✈";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 0.5rem;
  border-radius: 50%;
  color: #0066cc;
  font-size: 1.2rem;
  z-index: 2;
}
</style>
