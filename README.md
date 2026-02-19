🚀 Paylance
License: Proprietary Status: Production Framework: Next.js

Paylance is an advanced, high-performance collaboration platform designed to secure and accelerate the freelancing ecosystem. By leveraging a milestone-driven escrow system and mandatory demo project evaluation, it ensures trust, transparency, and high-quality results for both clients and freelancers.

👥 Maintainers & Copyright
This project is built, maintained, and exclusively owned by:

- **Lokesh Khairnar** - [GitHub Profile](https://github.com/KhairnarLokesh)
- **Kanhaiya Bagul**  -  [GitHub Profile](https://github.com/KanhaiyaBagul)

⚠️ **RESTRICTED ACCESS NOTICE**
This software is Proprietary. Unauthorised use, modification, duplication, or distribution of this code without the explicit written permission of the authors listed above is strictly prohibited.

✨ Key Features
🛡️ Secure Escrow System
- **Milestone Payments**: Funds are released incrementally upon approval of specific deliverables.
- **Wallet Integration**: Secure tracking of transactions and project balances.
- **Fraud Prevention**: Mandatory demo project submissions to verify freelancer competence before hiring.

💬 Real-time Collaboration
- **Instant Messaging**: Real-time project chat between clients and freelancers.
- **Smart Notifications**: Automated email alerts for applications, project status changes, and milestones.
- **RBAC (Role-Based Access Control)**: Specialized dashboards and unique permissions for Clients and Freelancers.

⚡ Engineering Excellence
- **High Performance**: Optimized using Next.js 16 and Server-side Rendering for sub-second load times.
- **Robust Security**: Secure user sessions with encrypted JSON Web Tokens (JWT).
- **Offline-Hardened**: Efficient state management ensures consistency across multiple sessions.

🛠 Tech Stack
| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Core** | Next.js 16 (App Router) | High-performance full-stack framework |
| **Styling** | Tailwind CSS + ShadCN UI | Modern, rapid UI development with consistency |
| **Database** | MongoDB (Mongoose) | Scalable and flexible NoSQL data syncing |
| **Auth** | Custom JWT (Jose) | Lightweight and highly secure authentication |
| **Email** | Nodemailer | Reliable automated notification system |

🚀 Getting Started
Prerequisites
- Node.js 18+
- npm or pnpm
- MongoDB Atlas Account

Installation
1. **Clone the repository** (Requires Permissions)
   ```bash
   git clone https://github.com/KhairnarLokesh/Paylance
   cd Paylance
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file with your credentials:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   SMTP_HOST=smtp.gmail.com
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

📈 Performance Metrics
We take performance seriously. Recent benchmarks show:

- **Lighthouse Score**: 98/100 (Performance)
- **First Contentful Paint (FCP)**: 0.7s
- **Time to Interactive (TTI)**: 1.1s

📄 License
© 2026 Lokesh Khairnar All Rights Reserved.

This project is restricted. Please see the LICENSE file for more details. No external use allowed without permission.
