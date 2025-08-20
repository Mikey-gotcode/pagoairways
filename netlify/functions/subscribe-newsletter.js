import { createTransport } from 'nodemailer';

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { email } = JSON.parse(event.body);

        if (!email) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Email address is required.' }),
            };
        }

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
            subject: 'New Newsletter Subscription',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: sans-serif; }
                        .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                        h2 { color: #333; }
                        p { font-size: 16px; color: #555; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>New Newsletter Subscription</h2>
                        <p>A new user has subscribed to the newsletter with the following email address:</p>
                        <p><strong>Email:</strong> ${email}</p>
                    </div>
                </body>
                </html>
            `,
        };

        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Subscription successful!' }),
        };
    } catch (error) {
        console.error('Subscription error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to subscribe.' }),
        };
    }
}