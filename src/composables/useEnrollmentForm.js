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

    // Define the submission logic that makes the API call
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
                console.log('Enrollment submitted and email sent!');
                // You can add a success toast here
            } else {
                console.error('Failed to submit enrollment:', await response.text());
                // You can add an error toast here
            }

        } catch (error) {
            console.error('Network or server error:', error);
            // You can add a network error toast here
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