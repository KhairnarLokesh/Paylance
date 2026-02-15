import React from "react";
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
export const metadata = {
    title: 'Paylance - Milestone-Driven Payment Platform',
    description: 'Secure freelancing platform with role-based authentication, milestone payments, real-time chat, and demo project reviews',
    icons: {
        icon: '/logo.png',
    },
};
export default function RootLayout({ children, }) {
    return (<html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>);
}
