import { ref } from 'vue';
import { successMessage, errorMessage } from '@/helper';

export default function useNewsletterForm() {
    const email = ref('');

    const subscribe = async () => {
        if (!email.value) {
            errorMessage.value = 'Please enter a valid email address.';
            return;
        }

        try {
            const response = await fetch('/.netlify/functions/subscribe-newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.value }),
            });

            if (response.ok) {
                successMessage.value = 'You have successfully subscribed to our newsletter!';
                email.value = ''; // Clear the input
            } else {
                errorMessage.value = 'Failed to subscribe. Please try again later.';
            }
        } catch (error) {
            errorMessage.value = 'Network error. Please check your connection.';
            console.error('Subscription error:', error);
        }
    };

    return {
        email,
        subscribe,
    };
}