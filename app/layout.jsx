import React from "react";
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata = {
  title: 'Paylance - Milestone-Driven Payment Platform',
  description: 'Secure freelancing platform with role-based authentication, milestone payments, real-time chat, and demo project reviews',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children, }) {
  return (<html lang="en">
    <body className="font-sans antialiased text-slate-900 bg-white">
      {children}
      <Analytics />
    </body>
  </html>);
}
