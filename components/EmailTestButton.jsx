/**
 * Email Test Utility Component
 *
 * This component can be temporarily added to your dashboard to test email configuration.
 *
 * Usage:
 * 1. Import this component in your ClientDashboard or FreelancerDashboard
 * 2. Add <EmailTestButton /> to the dashboard
 * 3. Click the button to send a test email
 * 4. Remove this component once email is confirmed working
 */
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, Loader2, CheckCircle2, XCircle } from 'lucide-react';
export default function EmailTestButton() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const { toast } = useToast();
    const sendTestEmail = async () => {
        if (!email) {
            toast({
                title: "Email Required",
                description: "Please enter an email address to test",
                variant: "destructive"
            });
            return;
        }
        setLoading(true);
        setStatus(null);
        try {
            const response = await fetch('/api/email/test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toEmail: email })
            });
            const data = await response.json();
            if (data.success) {
                setStatus('success');
                toast({
                    title: "✅ Test Email Sent!",
                    description: `Check ${email} for the test message`,
                });
            }
            else {
                setStatus('error');
                toast({
                    title: "❌ Email Failed",
                    description: data.error || "Failed to send test email. Check console for details.",
                    variant: "destructive"
                });
            }
        }
        catch (error) {
            setStatus('error');
            toast({
                title: "❌ Error",
                description: error.message,
                variant: "destructive"
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="p-6 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
            <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-purple-600"/>
                <h3 className="font-semibold text-lg">Email Configuration Test</h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Test your email notification setup by sending a test email.
            </p>

            <div className="flex gap-2 items-start">
                <div className="flex-1">
                    <Input type="email" placeholder="Enter email address to test" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="w-full"/>
                </div>

                <Button onClick={sendTestEmail} disabled={loading || !email} className="gap-2">
                    {loading ? (<>
                            <Loader2 className="h-4 w-4 animate-spin"/>
                            Sending...
                        </>) : (<>
                            <Send className="h-4 w-4"/>
                            Send Test
                        </>)}
                </Button>

                {status === 'success' && (<div className="flex items-center text-green-600 dark:text-green-400">
                        <CheckCircle2 className="h-5 w-5"/>
                    </div>)}

                {status === 'error' && (<div className="flex items-center text-red-600 dark:text-red-400">
                        <XCircle className="h-5 w-5"/>
                    </div>)}
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-md border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> Make sure you've configured your SMTP settings in .env.local before testing.
                    See EMAIL_SETUP_GUIDE.md for detailed instructions.
                </p>
            </div>
        </div>);
}
