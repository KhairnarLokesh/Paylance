# Paylance Application Flow

**Paylance** is a comprehensive freelance marketplace platform built with **Next.js**, **MongoDB**, and **React**, featuring role-based dashboards, project management, escrow payments, and real-time messaging.

---

## 📋 Table of Contents

1. [Technology Stack](#technology-stack)
2. [User Roles](#user-roles)
3. [Application Architecture](#application-architecture)
4. [Complete Application Flow](#complete-application-flow)
5. [API Endpoints](#api-endpoints)
6. [Database Models](#database-models)
7. [Key Features](#key-features)

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **Radix UI** - Component library (40+ components)
- **Lucide React** - Icons
- **React Hook Form + Zod** - Form validation

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB + Mongoose** - Database
- **Jose** - JWT authentication
- **bcryptjs** - Password hashing

### State Management
- **React Context API** - Global state (AppContext)
- **localStorage** - Session persistence

---

## 👥 User Roles

### 1. **Client**
- Posts projects
- Reviews freelancer applications
- Manages escrow payments
- Approves milestones
- Tracks project progress

### 2. **Freelancer**
- Browses available projects
- Submits applications with demos
- Works on assigned projects
- Submits milestone deliverables
- Manages wallet/earnings

---

## 🏗️ Application Architecture

```
Paylance/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.jsx            # Main app router
│   ├── globals.css         # Global styles
│   └── api/                # API routes
│       ├── auth/
│       │   ├── login/
│       │   └── register/
│       ├── projects/
│       │   ├── [id]/
│       │   │   ├── apply/
│       │   │   ├── applications/[freelancerId]/
│       │   │   └── milestones/[milestoneId]/
│       ├── messages/
│       ├── notifications/
│       ├── wallet/
│       └── users/[id]/
├── components/
│   ├── LandingPage.jsx
│   ├── AuthPages.jsx
│   ├── DashboardLayout.jsx
│   ├── ClientDashboard.jsx
│   ├── FreelancerDashboard.jsx
│   ├── ProjectPages.jsx
│   ├── MessagesPage.jsx
│   ├── WalletPage.jsx
│   └── ui/                 # 57 UI components
├── context/
│   └── AppContext.jsx      # Global state management
├── models/
│   ├── User.js
│   ├── Project.js
│   ├── Message.js
│   ├── Notification.js
│   └── Transaction.js
└── lib/
    └── mongodb.js          # Database connection
```

---

## 🔄 Complete Application Flow

### **Phase 1: Authentication Flow**

#### 1.1 Landing Page
```
User visits app → LandingPage component
├── Hero section with platform features
├── "Get Started" → Navigate to Register
└── "Sign In" → Navigate to Login
```

#### 1.2 Registration
```
RegisterPage (AuthPages.jsx)
├── User selects role: Client or Freelancer
├── Fills form: name, email, password, skills (if freelancer)
├── Submit → API: POST /api/auth/register
│   ├── Hash password (bcryptjs)
│   ├── Create User in MongoDB
│   └── Return user data + JWT token
├── Save user to localStorage
├── Set AppContext user state
└── Redirect to role-based dashboard
```

#### 1.3 Login
```
LoginPage (AuthPages.jsx)
├── Enter email & password
├── Submit → API: POST /api/auth/login
│   ├── Verify credentials
│   ├── Generate JWT token (jose)
│   └── Return user data
├── Save user to localStorage
├── Fetch user data (projects, notifications, transactions)
└── Redirect to role-based dashboard
```

---

### **Phase 2: Client Flow**

#### 2.1 Client Dashboard
```
ClientDashboard Component
├── Overview Cards
│   ├── Active Projects count
│   ├── Total spent amount
│   ├── Pending applications
│   └── Wallet balance
├── Quick Actions
│   ├── Post New Project
│   └── View All Projects
└── Recent Activity
    ├── Latest applications
    └── Milestone updates
```

#### 2.2 Create Project Flow
```
CreateProjectPage
├── Fill Project Form
│   ├── Title
│   ├── Description
│   ├── Category (Web Dev, Mobile, Design, AI/ML, etc.)
│   ├── Required skills (tags)
│   ├── Budget
│   └── Milestones
│       ├── Milestone title
│       ├── Amount
│       └── Deadline
├── Submit → API: POST /api/projects
│   ├── Create Project in MongoDB
│   │   ├── clientId: user._id
│   │   ├── status: 'open'
│   │   ├── milestones: []
│   │   └── applications: []
│   └── Return new project
├── Add to projects state
└── Navigate to MyProjectsPage
```

#### 2.3 Review Applications Flow
```
MyProjectsPage → Click Project → ProjectDetailPage
├── View project details
├── See all freelancer applications
│   ├── Freelancer name & rating
│   ├── Demo URL
│   ├── Cover letter
│   └── Applied date
├── Review Application Options:
│   ├── ✅ APPROVE
│   │   ├── API: PATCH /api/projects/[id]/applications/[freelancerId]
│   │   │   ├── Set application status: 'approved'
│   │   │   ├── Set project.assignedTo: freelancerId
│   │   │   ├── Set project.status: 'in_progress'
│   │   │   └── Create notification for freelancer
│   │   └── Prompt to deposit escrow
│   └── ❌ REJECT
│       └── Set application status: 'rejected'
```

#### 2.4 Escrow Deposit Flow
```
ProjectDetailPage → Deposit Escrow Button
├── Enter amount (usually total budget)
├── Submit → API: POST /api/wallet
│   ├── type: 'escrow_deposit'
│   ├── Deduct from client wallet
│   ├── Update project.escrowAmount
│   ├── Create transaction record
│   └── Update user.walletBalance
└── Escrow held until milestones approved
```

#### 2.5 Milestone Approval Flow
```
ProjectDetailPage → Milestones Section
├── Freelancer submits milestone
│   └── milestone.status: 'submitted'
├── Client reviews submission
│   ├── Check deliverable URL/description
│   └── **APPROVE MILESTONE**
│       ├── API: PATCH /api/projects/[id]/milestones/[milestoneId]
│       ├── Set milestone.status: 'approved'
│       ├── Transfer milestone.amount from escrow to freelancer wallet
│       ├── Create transaction records
│       └── Notify freelancer
└── When all milestones approved → Project status: 'completed'
```

---

### **Phase 3: Freelancer Flow**

#### 3.1 Freelancer Dashboard
```
FreelancerDashboard Component
├── Overview Cards
│   ├── Active projects count
│   ├── Total earnings
│   ├── Pending applications
│   └── Wallet balance
├── Quick Actions
│   ├── Browse Projects
│   └── View My Work
└── Skill Match Recommendations
    └── Projects matching freelancer skills
```

#### 3.2 Browse & Apply to Projects Flow
```
BrowseProjectsPage
├── Fetch all open projects → API: GET /api/projects
├── Filter by:
│   ├── Category
│   ├── Skills
│   └── Budget range
├── Click Project → ProjectDetailPage
├── **APPLY TO PROJECT**
│   ├── Fill Application Form
│   │   ├── Demo URL (portfolio/previous work)
│   │   └── Cover letter
│   ├── Submit → API: POST /api/projects/[id]/apply
│   │   ├── Add application to project.applications[]
│   │   │   ├── freelancerId
│   │   │   ├── status: 'pending'
│   │   │   ├── demoUrl
│   │   │   └── coverLetter
│   │   ├── Create notification for client
│   │   └── Return updated project
│   └── Navigate to MyWorkPage
```

#### 3.3 Work on Project Flow
```
MyWorkPage → Assigned Projects
├── When application approved:
│   ├── Project appears in "My Work"
│   ├── Status: 'in_progress'
│   └── View milestones
├── **SUBMIT MILESTONE**
│   ├── Click milestone → Enter submission details
│   │   └── submission: URL/description of deliverable
│   ├── Submit → API: PATCH /api/projects/[id]/milestones/[milestoneId]
│   │   ├── action: 'submit'
│   │   ├── Set milestone.status: 'submitted'
│   │   └── Create notification for client
│   └── Wait for client approval
└── After approval → Payment transferred to wallet
```

#### 3.4 Earnings & Withdrawals Flow
```
WalletPage (Freelancer)
├── View wallet balance
├── Transaction history
│   ├── Milestone payments
│   ├── Withdrawals
│   └── Dates & amounts
└── **WITHDRAW FUNDS**
    ├── Enter amount
    ├── Submit → API: POST /api/wallet
    │   ├── type: 'withdrawal'
    │   ├── Deduct from freelancer wallet
    │   ├── Create transaction record
    │   └── Update user.walletBalance
    └── (In production: integrate with payment gateway)
```

---

### **Phase 4: Messaging & Notifications**

#### 4.1 Messaging Flow
```
MessagesPage
├── View all conversations grouped by project
├── Click conversation → Open chat
├── **SEND MESSAGE**
│   ├── Enter message content
│   ├── Submit → API: POST /api/messages
│   │   ├── Create Message document
│   │   │   ├── projectId
│   │   │   ├── senderId
│   │   │   ├── receiverId
│   │   │   └── content
│   │   └── Return new message
│   └── Update messages state
└── Real-time updates via polling/WebSocket (future)
```

#### 4.2 Notifications Flow
```
DashboardLayout → Notification Bell
├── Fetch → API: GET /api/notifications?userId=[id]
├── Display unread count badge
├── Notification Types:
│   ├── New application on your project
│   ├── Application approved/rejected
│   ├── Milestone submitted
│   ├── Milestone approved
│   ├── Payment received
│   └── New message
├── Click notification
│   ├── Mark as read → API: PATCH /api/notifications
│   └── Navigate to relevant page
```

---

### **Phase 5: Wallet & Payments**

#### 5.1 Wallet System
```
Wallet Features (Both Roles)
├── Add Funds (Clients)
│   ├── API: POST /api/wallet
│   │   ├── type: 'deposit'
│   │   └── Increase wallet balance
│   └── (Production: integrate Stripe/PayPal)
├── Escrow Deposits (Clients)
│   ├── Hold funds for project
│   └── Release on milestone approval
├── Receive Payments (Freelancers)
│   └── From approved milestones
└── Withdraw Funds (Freelancers)
    └── Transfer to bank account
```

#### 5.2 Transaction Types
```
Transaction Model
├── deposit - Client adds funds
├── escrow_deposit - Client locks funds for project
├── milestone_payment - Freelancer receives payment
└── withdrawal - Freelancer withdraws to bank
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/login` | Authenticate user |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create new project |
| GET | `/api/projects/[id]` | Get project by ID |
| PATCH | `/api/projects/[id]` | Update project |
| POST | `/api/projects/[id]/apply` | Apply to project |
| PATCH | `/api/projects/[id]/applications/[freelancerId]` | Review application |
| PATCH | `/api/projects/[id]/milestones/[milestoneId]` | Update milestone |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages?projectId=[id]` | Get messages for project |
| POST | `/api/messages` | Send new message |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications?userId=[id]` | Get user notifications |
| PATCH | `/api/notifications` | Mark notification as read |

### Wallet
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wallet?userId=[id]` | Get transactions |
| POST | `/api/wallet` | Create transaction |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/[id]` | Get user by ID |

---

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'client' | 'freelancer',
  avatar: String,
  walletBalance: Number,
  skills: [String],
  rating: Number,
  completedProjects: Number,
  createdAt: Date
}
```

### Project Model
```javascript
{
  clientId: ObjectId → User,
  title: String,
  description: String,
  category: String,
  skills: [String],
  budget: Number,
  status: 'open' | 'in_progress' | 'completed',
  assignedTo: ObjectId → User,
  escrowAmount: Number,
  milestones: [
    {
      title: String,
      amount: Number,
      status: 'pending' | 'submitted' | 'approved',
      deadline: String,
      submission: String
    }
  ],
  applications: [
    {
      freelancerId: ObjectId → User,
      status: 'pending' | 'approved' | 'rejected',
      demoUrl: String,
      coverLetter: String,
      appliedAt: Date
    }
  ],
  createdAt: Date
}
```

### Message Model
```javascript
{
  projectId: ObjectId → Project,
  senderId: ObjectId → User,
  receiverId: ObjectId → User,
  content: String,
  read: Boolean,
  createdAt: Date
}
```

### Notification Model
```javascript
{
  userId: ObjectId → User,
  type: String,
  message: String,
  read: Boolean,
  relatedId: ObjectId,
  createdAt: Date
}
```

### Transaction Model
```javascript
{
  userId: ObjectId → User,
  type: 'deposit' | 'escrow_deposit' | 'milestone_payment' | 'withdrawal',
  amount: Number,
  description: String,
  projectId: ObjectId → Project,
  createdAt: Date
}
```

---

## ✨ Key Features

### 1. **Role-Based Dashboards**
- Separate views and actions for clients and freelancers
- Customized navigation and features

### 2. **Project Management**
- Create projects with detailed requirements
- Milestone-based tracking
- Application review system

### 3. **Escrow Payment System**
- Secure fund locking
- Milestone-based releases
- Transaction history

### 4. **Real-time Communication**
- Project-based messaging
- Notification system
- Activity tracking

### 5. **Wallet Management**
- Add funds (clients)
- Receive payments (freelancers)
- Withdraw earnings
- Transaction history

### 6. **Application System**
- Demo submission
- Cover letters
- Approval/rejection workflow

### 7. **Skill Matching**
- Filter projects by skills
- Recommended projects for freelancers

---

## 🔐 Security Features

1. **Password Hashing** - bcryptjs
2. **JWT Authentication** - jose library
3. **Protected Routes** - User authentication required
4. **Session Persistence** - localStorage with auto-login
5. **Role-Based Access Control** - Different permissions for clients/freelancers

---

## 📱 Navigation Structure

```
Landing Page
├── Login
└── Register

Client Dashboard
├── Create Project
├── Browse Projects
├── My Projects
│   └── Project Detail
│       ├── Applications
│       ├── Milestones
│       └── Messages
├── Messages
└── Wallet

Freelancer Dashboard
├── Browse Projects
│   └── Apply to Project
├── My Work
│   └── Project Detail
│       ├── Milestones
│       └── Messages
├── Messages
└── Wallet
```

---

## 🚀 Deployment & Production

### Current Setup
- Development mode: `npm run dev`
- Build: `npm run build`
- Production: `npm start`

### Environment Variables (.env.local)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📈 Future Enhancements

Based on conversation history, potential features:
1. Real-time messaging with WebSocket
2. Payment gateway integration (Stripe/PayPal)
3. Rating/review system
4. Advanced search/filtering
5. File upload for project deliverables
6. Dispute resolution system
7. Analytics dashboard
8. Email notifications

---

## 🎯 Summary

**Paylance** is a complete freelance marketplace that connects clients with freelancers through a secure, milestone-based payment system. The application handles the entire workflow from project posting to payment release, with built-in messaging, notifications, and wallet management.

The dual-role system ensures both clients and freelancers have optimized experiences tailored to their needs, while the escrow system provides security and trust for both parties.
