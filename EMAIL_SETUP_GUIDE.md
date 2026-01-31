# Email Notification Setup Guide

This guide will help you set up email notifications for the Paylance application using **Nodemailer** with Gmail.

---

## 🚀 Features Added

### 1. **New Project Posted** 
- When a client posts a project → **All registered freelancers** receive an email notification
- Email includes: project title, description, category, skills, budget, and milestones

### 2. **Freelancer Applied**
- When a freelancer applies to a project → **Client** receives an email notification
- Email includes: freelancer name, rating, skills, portfolio/demo URL, and cover letter

---

## 📧 Gmail Setup Instructions

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Select **Security** from the left menu
3. Under "Signing in to Google", select **2-Step Verification**
4. Follow the steps to enable 2FA if not already enabled

### Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
   - Or navigate: Google Account → Security → 2-Step Verification → App passwords
2. In the "Select app" dropdown, choose **Mail**
3. In the "Select device" dropdown, choose **Other (Custom name)**
4. Enter a name like "Paylance App"
5. Click **Generate**
6. **Copy the 16-character password** (you won't be able to see it again)

### Step 3: Update Environment Variables

Open your `.env.local` file and update the following:

```bash
# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com          # Replace with your Gmail address
SMTP_PASSWORD=xxxx xxxx xxxx xxxx        # Replace with the 16-char App Password
```

**Important:** 
- Use the **App Password**, NOT your regular Gmail password
- Remove spaces from the App Password if copying directly

### Step 4: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🧪 Testing Email Notifications

### Test 1: New Project Email

1. **Login as a Client**
2. **Create a new project**:
   - Title: "Test Project"
   - Description: "Testing email notifications"
   - Category: "Web Development"
   - Skills: ["React", "Node.js"]
   - Budget: 1000
3. **Submit the project**
4. **Check the terminal** for: `Email notification sent to X freelancers`
5. **Check all freelancer emails** - they should receive the notification

### Test 2: Application Email

1. **Login as a Freelancer**
2. **Browse Projects** and find the test project
3. **Apply to the project**:
   - Demo URL: Your portfolio link
   - Cover Letter: Short message
4. **Submit application**
5. **Check the terminal** for: `Email notification sent to client: [email]`
6. **Check the client's email** - they should receive the notification

---

## 🎨 Email Templates

Both email notifications feature:
- ✅ **Professional design** with gradient headers
- ✅ **Responsive HTML layout**
- ✅ **Styled information cards**
- ✅ **Call-to-action buttons**
- ✅ **Plain text fallback** for email clients that don't support HTML

### Email 1: New Project Notification (to Freelancers)
- Beautiful project card with all details
- Skills displayed as badges
- Budget highlighted prominently
- Direct link to view and apply

### Email 2: Application Notification (to Client)
- Freelancer profile with avatar
- Rating and completed projects
- Skills listed
- Demo URL link
- Cover letter in styled quote block
- Direct link to review application

---

## 🔧 Troubleshooting

### Problem: Emails not sending

**Solution 1: Check credentials**
```bash
# Verify in .env.local:
# - SMTP_USER is your full Gmail address
# - SMTP_PASSWORD is the 16-character App Password
# - No extra spaces in the password
```

**Solution 2: Check Gmail security**
- Make sure 2-Factor Authentication is enabled
- Generate a new App Password if needed
- Check if Gmail is blocking the login attempt

**Solution 3: Check terminal logs**
```bash
# Look for error messages like:
# "Error sending email: Invalid login"
# "Error sending email: Connection timeout"
```

### Problem: Emails go to spam

**Solutions:**
- Add your email to the recipient's contacts
- In production, use a custom domain email (not @gmail.com)
- Consider using a professional email service (SendGrid, AWS SES, Mailgun)

### Problem: Rate limiting

Gmail has sending limits:
- **Free Gmail:** ~500 emails/day
- **Google Workspace:** ~2,000 emails/day

**Solutions:**
- The code already implements batch sending (50 emails at a time)
- For production, consider professional email services
- Implement queuing for large freelancer bases

---

## 🌐 Using Other Email Providers

### Using Outlook/Hotmail

```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```

### Using SendGrid (Recommended for Production)

1. Sign up at https://sendgrid.com/
2. Get your API key
3. Update `.env.local`:

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

### Using AWS SES

1. Set up AWS SES in your AWS account
2. Verify your domain
3. Get SMTP credentials
4. Update `.env.local`:

```bash
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASSWORD=your-ses-smtp-password
```

---

## 📊 Email Flow Architecture

```
Client Posts Project
    ↓
API: POST /api/projects
    ↓
1. Create project in MongoDB
2. Get all freelancers from database
3. Send in-app notifications to matching freelancers
4. Send EMAIL to ALL freelancers ✉️
    ↓
Freelancers receive beautiful HTML email
```

```
Freelancer Applies to Project
    ↓
API: POST /api/projects/[id]/apply
    ↓
1. Add application to project
2. Create in-app notification for client
3. Get client and freelancer details
4. Send EMAIL to client ✉️
    ↓
Client receives application notification email
```

---

## 🔐 Security Best Practices

1. **Never commit `.env.local`** to version control
   - Already in `.gitignore`
   - Contains sensitive credentials

2. **Use App Passwords**, not regular passwords
   - More secure
   - Can be revoked independently

3. **Production considerations:**
   - Use environment variables in hosting platform
   - Consider using dedicated email services
   - Implement rate limiting
   - Add unsubscribe functionality for compliance

---

## 📝 Code Structure

### Files Modified/Created

1. **`lib/emailService.js`** ✨ NEW
   - Email templates
   - Nodemailer configuration
   - Send functions

2. **`app/api/projects/route.js`** 🔄 UPDATED
   - Added email notification when project is created
   - Sends to all freelancers

3. **`app/api/projects/[id]/apply/route.js`** 🔄 UPDATED
   - Added email notification when freelancer applies
   - Sends to project client

4. **`.env.local`** 🔄 UPDATED
   - Added SMTP configuration variables

---

## 🎯 Next Steps

### Optional Enhancements

1. **Email Preferences**
   - Let users opt-in/opt-out of email notifications
   - Add preference settings in user profile

2. **Email Queue**
   - Use Bull Queue or similar for large-scale sending
   - Better handling of failures and retries

3. **Email Analytics**
   - Track open rates
   - Track click-through rates
   - Use services like Mailgun or SendGrid

4. **Additional Email Notifications**
   - Application approved/rejected
   - Milestone submitted
   - Milestone approved
   - Payment received
   - New message

5. **Digest Emails**
   - Instead of instant emails, send daily/weekly digests
   - Reduces email volume for active users

---

## ✅ Checklist

Before going live, ensure:

- [ ] Gmail App Password generated
- [ ] `.env.local` updated with correct credentials
- [ ] Development server restarted
- [ ] Tested new project creation → emails sent to freelancers
- [ ] Tested application submission → email sent to client
- [ ] Verified email formatting looks good on mobile and desktop
- [ ] Checked spam folder for test emails
- [ ] Considered production email service for scale
- [ ] Added proper error handling and logging

---

## 🆘 Support

If you encounter issues:

1. Check the **terminal logs** for detailed error messages
2. Verify your **Gmail settings** and App Password
3. Test with a **simple email** first to verify SMTP connection
4. Check **Gmail's security page** for blocked login attempts

---

## 📚 Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)
- [Google Sending Limits](https://support.google.com/a/answer/166852)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)

---

**🎉 Congratulations!** Your Paylance application now has professional email notifications!
