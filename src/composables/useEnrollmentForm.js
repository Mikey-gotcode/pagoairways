// src/composables/useEnrollmentForm.js
import { ref } from 'vue';

// The composable function
export default function useEnrollmentForm(showModal) {
    // Define reactive form state
    const form = ref({
        name: '',
        email: '',
        phone: '',
        experience: '',
        agree: false
    });

    // Define the submission logic
    const handleSubmit = () => {
        // Here you would typically send data to a server
        console.log('Enrollment submitted:', form.value);
        
        // Reset the form
        form.value = {
            name: '',
            email: '',
            phone: '',
            experience: '',
            agree: false
        };

        // Close the modal
        showModal.value = false;

        // Optionally, show a success message or toast
        // showSuccessToast.value = true;
    };

    // Return the state and methods that the component needs
    return {
        form,
        handleSubmit
    };
}