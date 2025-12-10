<template>
  <div class="bg-light font-inter">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <i data-feather="navigation" class="text-primary mr-2"></i>
          <h1 class="text-2xl font-bold text-primary">PagoAirways</h1>
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
        <h2 class="text-3xl font-bold text-dark">Payment Details</h2>
        <p class="text-gray-600">Complete your booking securely</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Payment Form -->
        <div class="bg-white rounded-xl shadow-md p-6" data-aos="fade-right">
          <h3 class="text-xl font-semibold text-dark mb-6">Payment Information</h3>

          <!-- Tabs -->
          <div class="flex border-b border-gray-200 mb-6">
            <button class="px-4 py-2 font-medium text-primary border-b-2 border-primary">
              Credit Card
            </button>
            <button class="px-4 py-2 font-medium text-gray-500 hover:text-gray-700">PayPal</button>
            <button class="px-4 py-2 font-medium text-gray-500 hover:text-gray-700">
              Bank Transfer
            </button>
          </div>

          <!-- Form -->
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div class="relative">
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <i data-feather="credit-card" class="text-gray-400"></i>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
              >
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                id="save-card"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label for="save-card" class="ml-2 block text-sm text-gray-700"
                >Save card for future bookings</label
              >
            </div>
          </form>

          <!-- Billing -->
          <div class="mt-8">
            <h4 class="text-lg font-semibold text-dark mb-4">Billing Address</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="123 Main Street"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="New York"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    placeholder="10001"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="space-y-8">
          <!-- Flights -->
          <div class="bg-white rounded-xl shadow-md p-6" data-aos="fade-left">
            <h3 class="text-xl font-semibold text-dark mb-6">Order Summary</h3>
            <!-- Flight cards here (same as your HTML)... -->
          </div>

          <!-- Price Breakdown -->
          <div class="bg-white rounded-xl shadow-md p-6" data-aos="fade-left">
            <h3 class="text-xl font-semibold text-dark mb-4">Price Breakdown</h3>
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
              <div class="divider my-2"><span></span></div>
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-primary">$1,724.50</span>
              </div>
            </div>
            <div
              class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 flex items-center"
            >
              <i data-feather="lock" class="text-green-500 mr-2"></i>
              <span class="text-green-700 text-sm"
                >Your payment is secured with 256-bit SSL encryption</span
              >
            </div>
          </div>

          <!-- Buttons -->
          <div
            class="flex flex-col sm:flex-row justify-between items-center gap-4"
            data-aos="fade-up"
          >
            <button
              @click="backToPreview()"
              class="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              <i data-feather="arrow-left" class="mr-2"></i>
              Back to Preview
            </button>
            <button
              @click="proceedToTicketPreview()"
              class="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              Complete Booking
              <i data-feather="arrow-right" class="ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white py-12 mt-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center mb-4">
              <i data-feather="navigation" class="mr-2"></i>
              <h3 class="text-xl font-bold">PagoAirways</h3>
            </div>
            <p class="text-gray-400">
              Your trusted partner for seamless travel experiences around the globe.
            </p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Explore</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">Destinations</a></li>
              <li><a href="#" class="hover:text-white transition">Special Offers</a></li>
              <li><a href="#" class="hover:text-white transition">Travel Guides</a></li>
              <li><a href="#" class="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">Help Center</a></li>
              <li><a href="#" class="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition">Flight Status</a></li>
              <li><a href="#" class="hover:text-white transition">Refunds</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Connect</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition"
                ><i data-feather="facebook"></i
              ></a>
              <a href="#" class="text-gray-400 hover:text-white transition"
                ><i data-feather="twitter"></i
              ></a>
              <a href="#" class="text-gray-400 hover:text-white transition"
                ><i data-feather="instagram"></i
              ></a>
              <a href="#" class="text-gray-400 hover:text-white transition"
                ><i data-feather="linkedin"></i
              ></a>
            </div>
            <p class="mt-4 text-gray-400">Subscribe to our newsletter</p>
            <div class="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                class="px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none w-full"
              />
              <button
                class="bg-primary px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
              >
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

<script setup>
import { onMounted } from "vue"
import feather from "feather-icons"
import AOS from "aos"
import { useRouter } from "vue-router"
import "aos/dist/aos.css"

const router = useRouter()


function backToPreview (){
  router.push('/bookflight/previewflight')
}

function proceedToTicketPreview (){
  router.push('/bookflight/previewflight')
}

onMounted(() => {
  AOS.init({ duration: 800, once: true })
  feather.replace()
})
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
