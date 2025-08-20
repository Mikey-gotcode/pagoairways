import { ref } from 'vue';
import { showModal, successMessage } from '@/helper';

// The composable function
export default function useEnrollmentForm() {
    // Define reactive form state
    const form = ref({
        name: '',
        email: '',
        phone: '',
        experience: '',
        agree: false
    });

    // Define the submission logic
    const handleSubmit = async () => {
        try {
            // Make the API call to your Netlify Function
            const response = await fetch('/.netlify/functions/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form.value),
            });

            if (response.ok) {
                // Set the success message to be displayed
                successMessage.value = 'Enrollment submitted successfully! We will contact you shortly.';
                
                // Automatically clear the message after 5 seconds
                setTimeout(() => {
                  successMessage.value = '';
                }, 5000);

            } else {
                // Handle server-side errors
                errorMessage.value = 'Failed to submit enrollment. Please try again.';
                console.error('Failed to submit enrollment:', await response.text());
            }

        } catch (error) {
            // Handle network errors
            errorMessage.value = 'Network error. Please check your connection.';
            console.error('Network or server error:', error);
        } finally {
            // Reset the form and close the modal regardless of the outcome
            form.value = {
                name: '',
                email: '',
                phone: '',
                experience: '',
                agree: false
            };
            showModal.value = false;
        }
    };

    // Return the state and methods that the component needs
    return {
        form,
        handleSubmit
    };
}