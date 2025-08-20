// helper.js

import { ref } from 'vue';

// Export functions and refs directly
export const scrollTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
};

export const showModal = ref(false);
export const showVideoModal = ref(false);
export const showSuccessToast = ref(false);

// Add new reactive states for toast messages
export const successMessage = ref('');
export const errorMessage = ref('');

// You can also export other state and logic if needed
export const mobileMenuOpen = ref(false);
export const progress = ref(0);
export const form = ref({
    name: '',
    email: '',
    phone: '',
    experience: '',
    agree: false
});

export const submitEnrollment = () => {
    console.log('Enrollment submitted:', form.value);
    form.value = {
        name: '',
        email: '',
        phone: '',
        experience: '',
        agree: false
    };
    showSuccessToast.value = true;
    showModal.value = false;
    setTimeout(() => {
        showSuccessToast.value = false;
    }, 5000);
};

// If you need to handle side effects like scroll listeners,
// you would do this within the component where it's used
// (e.g., in a component's onMounted hook), or create a composable.
// A composable is a function that leverages the Composition API
// to encapsulate and reuse stateful logic.