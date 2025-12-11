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
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Flights
              </a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Accommodations
              </a>
            </nav>
          </div>

          <div class="flex items-center">
            <button class="bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none" title="Notifications">
              <i data-feather="bell" class="h-6 w-6"></i>
            </button>

            <div class="ml-3 relative">
              <div class="flex items-center">
                <button class="flex text-sm rounded-full focus:outline-none" @click="toggleProfileMenu">
                  <img loading="eager" :src="form.avatar" alt="User profile" eager class="h-8 w-8 rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p class="mt-1 text-gray-600">Manage your personal information and preferences</p>
      </div>

      <!-- Personal Information Card -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div class="px-6 py-5 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Personal Information</h2>
          <p class="mt-1 text-sm text-gray-500">Update your personal details and contact information</p>
        </div>

        <div class="px-6 py-6">
          <div class="flex items-center mb-8">
            <img loading="eager" :src="form.avatar" alt="User profile" class="h-20 w-20 rounded-full object-cover" />
            <div class="ml-6">
              <label
                for="photo-upload"
                class="inline-flex items-center bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Change Photo
              </label>
              <input id="photo-upload" type="file" accept="image/*" class="hidden" @change="onPhotoChange" />
              <p class="mt-2 text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>

          <form class="space-y-6" @submit.prevent="saveProfile">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                <div class="mt-1">
                  <input id="first-name" v-model="form.firstName" type="text" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                <div class="mt-1">
                  <input id="last-name" v-model="form.lastName" type="text" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-4">
                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                <div class="mt-1">
                  <input id="email" v-model="form.email" type="email" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone number</label>
                <div class="mt-1">
                  <input id="phone" v-model="form.phone" type="text" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                <div class="mt-1">
                  <select id="country" v-model="form.country" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                  </select>
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <div class="mt-1">
                  <input id="address" v-model="form.address" type="text" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <div class="mt-1">
                  <input id="city" v-model="form.city" type="text" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="state" class="block text-sm font-medium text-gray-700">State / Province</label>
                <div class="mt-1">
                  <input id="state" v-model="form.state" type="text" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-1">
                <label for="zip" class="block text-sm font-medium text-gray-700">ZIP / Postal</label>
                <div class="mt-1">
                  <input id="zip" v-model="form.zip" type="text" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <button type="button" @click="resetProfile" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                Cancel
              </button>
              <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Travel Preferences Card -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">Travel Preferences</h2>
          <p class="mt-1 text-sm text-gray-500">Customize your travel experience</p>
        </div>

        <div class="px-6 py-6">
          <form @submit.prevent="savePreferences" class="space-y-6">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="seat" class="block text-sm font-medium text-gray-700">Seat Preference</label>
                <div class="mt-1">
                  <select id="seat" v-model="prefs.seat" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm">
                    <option>Aisle</option>
                    <option>Window</option>
                    <option>Any</option>
                  </select>
                </div>
              </div>

              <div class="sm:col-span-3">
                <label for="meal" class="block text-sm font-medium text-gray-700">Meal Preference</label>
                <div class="mt-1">
                  <select id="meal" v-model="prefs.meal" class="form-input block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm">
                    <option>None</option>
                    <option>Vegetarian</option>
                    <option>Vegan</option>
                    <option>Kosher</option>
                    <option>Halal</option>
                  </select>
                </div>
              </div>

              <div class="sm:col-span-6">
                <fieldset>
                  <legend class="text-sm font-medium text-gray-700">Special Assistance</legend>
                  <div class="mt-4 space-y-4">
                    <div class="flex items-start">
                      <div class="h-5 flex items-center">
                        <input id="wheelchair" v-model="prefs.assistance.wheelchair" type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="wheelchair" class="font-medium text-gray-700">Wheelchair assistance</label>
                      </div>
                    </div>

                    <div class="flex items-start">
                      <div class="h-5 flex items-center">
                        <input id="visual" v-model="prefs.assistance.visual" type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="visual" class="font-medium text-gray-700">Visual impairment assistance</label>
                      </div>
                    </div>

                    <div class="flex items-start">
                      <div class="h-5 flex items-center">
                        <input id="hearing" v-model="prefs.assistance.hearing" type="checkbox" class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="hearing" class="font-medium text-gray-700">Hearing impairment assistance</label>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="flex justify-end">
              <button type="button" @click="resetPreferences" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                Cancel
              </button>
              <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none">
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // Import router for redirection

const router = useRouter()

// ... (loadScript helper function remains the same) ...
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

// Initial structure for the form (will be overwritten by fetched data)
const initial = {
  avatar: 'https://ui-avatars.com/api/?name=User&background=0ea5e9&color=ffffff',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'United States',
  address: '',
  city: '',
  state: '',
  zip: ''
}

const form = reactive({ ...initial })

// ... (prefs and other state variables remain the same)
const prefs = reactive({
  seat: 'Window',
  meal: 'None',
  assistance: {
    wheelchair: false,
    visual: false,
    hearing: false
  }
})

const profileMenuOpen = ref(false)

function toggleProfileMenu() {
  profileMenuOpen.value = !profileMenuOpen.value
}

function onPhotoChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 1_048_576) { // ~1MB
    alert('Image too large (max 1MB)')
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    form.avatar = reader.result
  }
  reader.readAsDataURL(file)
}

function resetProfile() {
  // Use the stored initial state for reset
  Object.assign(form, initial) 
  alert('Changes cancelled')
}

// ... (saveProfile, resetPreferences, savePreferences functions remain the same)
async function saveProfile() {
  try {
    // stub: replace with real API call
    const payload = { ...form }
    console.log('Saving profile', payload)
    // Example:
    // await fetch('/api/profile', { method: 'POST', body: JSON.stringify(payload) })
    alert('Profile saved')
  } catch (err) {
    console.error(err)
    alert('Failed to save profile')
  }
}

function resetPreferences() {
  prefs.seat = 'Window'
  prefs.meal = 'None'
  prefs.assistance.wheelchair = false
  prefs.assistance.visual = false
  prefs.assistance.hearing = false
  alert('Preferences reset')
}

async function savePreferences() {
  try {
    console.log('Saving preferences', JSON.stringify(prefs))
    // await fetch('/api/preferences', ...)
    alert('Preferences saved')
  } catch (err) {
    console.error(err)
    alert('Failed to save preferences')
  }
}

// --- NEW FUNCTION: Fetch User Profile for Form Population ---
async function fetchUserProfileForForm() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        router.push('/login');
        return;
    }

    try {
        const response = await fetch('http://localhost:8081/profile', { // Use the same protected endpoint
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            
            // Assuming data contains: { email, name, avatar_url }
            const fullName = data.name || '';
            const [firstName, ...lastNameParts] = fullName.split(' ');
            const lastName = lastNameParts.join(' ');

            // Populate the form with fetched data
            form.email = data.email || '';
            form.firstName = firstName || '';
            form.lastName = lastName || '';
            form.avatar = data.avatar_url ; // Use Google avatar if available

            // Update the initial state so 'Cancel' button works correctly
            Object.assign(initial, { ...form });
        } else if (response.status === 401) {
            localStorage.removeItem('authToken');
            router.push('/login');
        } else {
            console.error('Failed to fetch profile:', response.statusText);
        }
    } catch (error) {
        console.error('Network error fetching profile:', error);
    }
}
// --- END NEW FUNCTION ---


onMounted(async () => {
  // 1. Fetch user data immediately to populate the form
  await fetchUserProfileForForm();

  // 2. Load Feather icons
  try {
    if (!window.feather) {
      await loadScript('https://unpkg.com/feather-icons')
    }
    window.feather && window.feather.replace()
  } catch (e) {
    // ignore
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

/* small form focus styling */
.form-input {
  transition: all 0.2s ease;
  color: #000;
}
.form-input:focus {
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
}
</style>
