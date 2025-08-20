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
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: sans-serif; }
                        .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                        h2 { color: #333; }
                        ul { list-style-type: none; padding: 0; }
                        li { margin-bottom: 10px; }
                        .label { font-weight: bold; color: #555; }
                        .value { color: #000; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>New IATA Course Enrollment</h2>
                        <p>A new enrollment has been submitted through the Pago Airways website.</p>
                        <ul>
                            <li><span class="label">Name:</span> <span class="value">${name}</span></li>
                            <li><span class="label">Email:</span> <span class="value">${email}</span></li>
                            <li><span class="label">Phone:</span> <span class="value">${phone}</span></li>
                            <li><span class="label">Experience:</span> <span class="value">${experience}</span></li>
                        </ul>
                    </div>
                </body>
                </html>
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