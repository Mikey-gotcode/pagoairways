import { createTransport } from 'nodemailer';

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, email, phone, experience } = JSON.parse(event.body);

        // Ensure all required fields are present
        if (!name || !email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Name and email are required.' }),
            };
        }

        // Create a Nodemailer transporter using your Gmail account
        const transporter = createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Your Gmail address
                pass: process.env.GMAIL_PASS, // Your App Password
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'pagoairways@example.com', // The recipient's email
            subject: 'New IATA Course Enrollment',
            text: `
                New enrollment from Pago Airways website.

                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Experience: ${experience}
            `,
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' }),
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send email.' }),
        };
    }
}