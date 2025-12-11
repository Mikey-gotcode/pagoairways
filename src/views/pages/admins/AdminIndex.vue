<template>
  <div class="bg-gray-100 font-sans min-h-screen">
    <!-- Navbar -->
    <nav class="bg-white shadow-lg fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between pl-14 items-center h-16">
          <!-- Logo and brand -->
          <div class="flex items-center space-x-4">
            <button @click="toggleSidebar" class="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none">
              <i class="fas fa-bars text-xl"></i>
            </button>
            <router-link to="/" class="flex items-center space-x-2">
              <i class="fas fa-rocket text-blue-600 text-2xl"></i>
              <span class="text-xl font-bold text-gray-800">HOME</span>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link to="/super-admin/accommodations" :class="navLinkClass('/accommodations')">
              Accommodations
            </router-link>
            <router-link to="/super-admin/destinations" :class="navLinkClass('/destinations')">
              Destinations
            </router-link>
            <router-link to="/super-admin/flightsAdd" :class="navLinkClass('/flightsAdd')">
              Flights
            </router-link>
          </div>

          <!-- Right side items -->
          <div class="flex items-center space-x-4">
            <button class="text-gray-700 hover:text-blue-600 focus:outline-none">
              <i class="fas fa-search text-lg"></i>
            </button>
            <button class="text-gray-700 hover:text-blue-600 focus:outline-none">
              <i class="fas fa-bell text-lg"></i>
            </button>
            <div class="relative" v-if="userData">
              <button @click="toggleDropdown" class="flex items-center space-x-2 focus:outline-none">
                <img loading="eager" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" class="w-8 h-8 rounded-full">
                <span class="hidden md:inline text-gray-700 font-medium">{{ userData.name }}</span>
                <i class="fas fa-chevron-down text-xs text-gray-500"></i>
              </button>
              <!-- Dropdown menu -->
              <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="" @click.prevent="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar Overlay (for mobile) -->
    <div v-if="sidebarOpen" @click="toggleSidebar" class="sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-40"></div>

    <!-- Sidebar -->
    <aside
      :class="['sidebar fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform md:translate-x-0',
               {' -translate-x-full': !sidebarOpen}]"
    >
      <div class="flex flex-col h-full">
        <!-- Sidebar header -->
        <div class="flex items-center justify-between p-4 border-b">
          <div class="flex items-center space-x-2">
            <i class="fas fa-rocket text-blue-600 text-2xl"></i>
            <span class="text-Xl font-bold text-gray-800">PAGO AIRWAYS</span>
          </div>
          <button @click="toggleSidebar" class="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Sidebar content -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-4">
            <nav class="space-y-2">
              <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Content</h3>
              <router-link to="/super-admin/accommodations" :class="sidebarLinkClass('/accommodations')">
                <i class="fas fa-bed text-lg"></i>
                <span>Accommodations</span>
              </router-link>
              <router-link to="/super-admin/destinations" :class="sidebarLinkClass('/destinations')">
                <i class="fas fa-map-marked-alt text-lg"></i>
                <span>Destinations</span>
              </router-link>
              <router-link to="/super-admin/flightsAdd" :class="sidebarLinkClass('/flightsAdd')">
                <i class="fas fa-map-marked-alt text-lg"></i>
                <span>Flights</span>
              </router-link>
              <router-link to="/super-admin/settings" :class="sidebarLinkClass('/settings')">
                <i class="fas fa-map-marked-alt text-lg"></i>
                <span>Settings</span>
              </router-link>
            </nav>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="pt-16 md:ml-64 min-h-screen">
      <div class="p-6">
        <!-- The component for the active route will be rendered here -->
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Import new API functions
import { getUser, logout } from '@/api.js';

const route = useRoute();
const router = useRouter();
const sidebarOpen = ref(false);
const dropdownOpen = ref(false);
const userData = ref(null);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const fetchUser = async () => {
  try {
    const user = await getUser();
    userData.value = user;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    // Redirect to login if token is invalid or user data cannot be fetched
    router.push('../login' );
  }
};

const handleLogout = async () => {
  try {
    await logout();
    userData.value = null; // Clear user data
    router.push('/login' ); // Redirect to login page
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

// Functions to apply active classes to links based on current route
const navLinkClass = (path) => {
  const baseClasses = 'nav-item text-gray-700 hover:text-blue-600 font-medium';
  return route.path.includes(path) ? `${baseClasses} text-blue-600` : baseClasses;
};

const sidebarLinkClass = (path) => {
  const baseClasses = 'sidebar-item flex items-center space-x-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg';
  return route.path.includes(path) ? `${baseClasses} text-blue-600 bg-blue-50` : baseClasses;
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  const dropdownButton = document.querySelector('.relative button');
  const dropdownMenu = document.querySelector('.relative .absolute');

  if (dropdownOpen.value && dropdownMenu && !dropdownMenu.contains(event.target) && dropdownButton && !dropdownButton.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  fetchUser();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
/* Custom CSS for transitions and animations */
.sidebar {
  transition: transform 0.3s ease-in-out;
}
.sidebar-overlay {
  transition: opacity 0.3s ease-in-out;
}
.nav-item::after, .sidebar-item::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s;
}
.nav-item:hover::after, .sidebar-item:hover::after {
  width: 100%;
}
.nav-item.router-link-active::after, .sidebar-item.router-link-active::after {
  width: 100%;
}
</style>