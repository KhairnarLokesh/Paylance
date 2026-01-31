# 📧 Email Notification - Quick Reference

## ⚡ Quick Setup (5 Minutes)

### 1. Gmail App Password Setup
```
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" + "Other (Custom)" → Name it "Paylance"
3. Copy the 16-character password
```

### 2. Update Environment Variables
```bash
# Open .env.local and update:
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx  # Your App Password
```

### 3. Restart Server
```bash
# Press Ctrl+C to stop
npm run dev
```

### 4. Test It!
```bash
# Send test email
curl -X POST http://localhost:3000/api/email/test \
  -H "Content-Type: application/json" \
  -d '{"toEmail":"your-test-email@gmail.com"}'
```

---

## 🎯 Email Triggers

| Event | Recipients | Trigger File |
|-------|-----------|-------------|
| **Project Posted** | All freelancers | `app/api/projects/route.js` |
| **Application Submitted** | Project client | `app/api/projects/[id]/apply/route.js` |

---

## 📁 Files Added/Modified

```
✨ NEW FILES:
├── lib/emailService.js              # Email service & templates
├── app/api/email/test/route.js      # Test endpoint
├── components/EmailTestButton.jsx   # Test UI component
├── EMAIL_SETUP_GUIDE.md             # Full setup guide
└── EMAIL_IMPLEMENTATION.md          # Implementation summary

🔄 UPDATED FILES:
├── app/api/projects/route.js        # Added project email
├── app/api/projects/[id]/apply/route.js  # Added application email
├── .env.local                       # Added SMTP config
└── package.json                     # Added nodemailer
```

---

## 🧪 Testing Checklist

- [ ] SMTP credentials configured in `.env.local`
- [ ] Dev server restarted
- [ ] Test endpoint works: `POST /api/email/test`
- [ ] Create project → freelancers get email
- [ ] Apply to project → client gets email
- [ ] Emails land in inbox (not spam)
- [ ] HTML formatting looks good on mobile & desktop

---

## 🚨 Troubleshooting

### ❌ "Invalid login"
→ Use App Password, not your regular Gmail password
→ Remove spaces from the 16-character password

### ❌ "Connection timeout"
→ Check internet connection
→ Try port 465 with `secure: true` in emailService.js

### ❌ Emails go to spam
→ Add sender to contacts
→ Mark "Not spam" in Gmail
→ For production: use SendGrid/AWS SES

### ❌ Rate limiting
→ Gmail limit: 500 emails/day (free), 2000/day (Workspace)
→ Code already batches sends (50 at a time)
→ For scale: use professional email service

---

## 🔗 Important Links

- **Gmail App Passwords:** https://myaccount.google.com/apppasswords
- **Nodemailer Docs:** https://nodemailer.com/
- **Full Setup Guide:** `EMAIL_SETUP_GUIDE.md`
- **Implementation Details:** `EMAIL_IMPLEMENTATION.md`
- **App Flow:** `.agent/APPLICATION_FLOW.md`

---

## 📧 Email Template Features

### New Project Email (to Freelancers)
- ✅ Project title & description
- ✅ Category badge
- ✅ Skills required (as badges)
- ✅ Budget highlighted
- ✅ Milestone count
- ✅ "View & Apply" button

### Application Email (to Client)
- ✅ Freelancer name & avatar
- ✅ Rating stars ⭐
- ✅ Completed projects count
- ✅ Skills badges
- ✅ Portfolio/demo link
- ✅ Cover letter in quote block
- ✅ "Review Application" button

---

## 🎨 Email Design

Both emails feature:
- 🎨 Purple gradient header (#667eea → #764ba2)
- 🎨 Responsive layout (mobile + desktop)
- 🎨 Professional typography
- 🎨 Clean white cards with shadows
- 🎨 Brand colors throughout
- 🎨 Plain text fallback

---

## 🔐 Security Notes

- ✅ Environment variables (not in git)
- ✅ App passwords (not account passwords)
- ✅ Graceful error handling
- ✅ No sensitive data in emails
- ✅ TLS/STARTTLS encryption

---

## 🚀 Production Recommendations

### Email Service Upgrade
Consider these for production:

1. **SendGrid** (Recommended)
   - 100 emails/day free
   - Professional deliverability
   - Analytics included

2. **AWS SES**
   - Very cheap ($0.10/1000 emails)
   - Requires AWS account
   - Domain verification needed

3. **Mailgun**
   - 5,000 emails/month free
   - Great API
   - Good documentation

### Additional Features
- [ ] Email preferences (opt-in/opt-out)
- [ ] Email queue (Bull/BullMQ)
- [ ] More notification types
- [ ] Digest emails (daily/weekly)
- [ ] Unsubscribe links
- [ ] Email verification

---

## 💡 Pro Tips

1. **Test Early:** Test email config before deploying
2. **Monitor Logs:** Check console for send confirmations
3. **Spam Check:** Send test emails to different providers (Gmail, Outlook, Yahoo)
4. **Mobile Test:** Check emails on mobile devices
5. **Batch Wisely:** Current batch size is 50, adjust if needed
6. **Error Handling:** Emails fail gracefully (app continues working)

---

## 🎉 You're All Set!

Your Paylance app now has professional email notifications!

**What happens now:**
1. Client posts project → 📧 All freelancers notified
2. Freelancer applies → 📧 Client notified
3. Users stay engaged → 💼 More activity on your platform

**Remember:** Configure `.env.local` before testing!
