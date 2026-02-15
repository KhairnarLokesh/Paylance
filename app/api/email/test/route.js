import { sendEmail } from '@/lib/emailService';
export async function POST(req) {
    try {
        const { toEmail } = await req.json();
        if (!toEmail) {
            return Response.json({ error: 'Email address required' }, { status: 400 });
        }
        // Test email
        const testHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px; }
                    .content { background: #f9f9f9; padding: 30px; margin-top: 20px; border-radius: 10px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>✅ Email Configuration Successful!</h1>
                    </div>
                    <div class="content">
                        <h2>Congratulations! 🎉</h2>
                        <p>Your Paylance email notification system is working correctly.</p>
                        <p>You can now receive notifications for:</p>
                        <ul>
                            <li>✉️ New projects posted</li>
                            <li>✉️ New applications received</li>
                        </ul>
                        <p><strong>Test completed at:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        const testText = `
            Email Configuration Test - Paylance
            
            Your email notification system is working correctly!
            
            Test completed at: ${new Date().toLocaleString()}
        `;
        const result = await sendEmail(toEmail, '✅ Paylance Email Test - Configuration Successful', testHtml, testText);
        if (result.success) {
            return Response.json({
                success: true,
                message: 'Test email sent successfully!',
                messageId: result.messageId
            });
        }
        else {
            return Response.json({
                success: false,
                error: 'Failed to send test email'
            }, { status: 500 });
        }
    }
    catch (error) {
        console.error('Test email error:', error);
        return Response.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
