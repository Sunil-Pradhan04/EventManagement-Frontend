# 🎉 GEC EventHub - Event Management System

<div align="center">

![Event Management Banner](https://via.placeholder.com/1200x400/1a1a2e/00eaff?text=GEC+EventHub+-+Manage+Events+Seamlessly)

*A modern, full-stack event management platform built with MERN stack for colleges and organizations*

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Overview

**GEC EventHub** is a comprehensive event management platform designed for educational institutions and organizations. It streamlines the entire event lifecycle - from creation and announcement to registration and post-event management. The system features role-based access control with separate interfaces for students, teachers/admins, and includes AI-powered assistance for enhanced user experience.

### 🎯 Key Highlights

- 🔐 **Dual Authentication System** - Separate login portals for students and teachers/admins
- 🎫 **Complete Event Lifecycle** - Create, manage, announce, and track events seamlessly
- 🤖 **AI-Powered Assistant** - Integrated chatbot using OpenAI for event recommendations and queries
- 📧 **Smart Email Notifications** - Automated email system for enrollments and announcements
- 📊 **Admin Dashboard** - Comprehensive tools for event management and analytics
- 🎨 **Modern UI/UX** - Beautiful dark theme with smooth animations and responsive design
- 🔒 **Secure** - JWT authentication, session management, and bcrypt password hashing

---

## ✨ Features

### 👥 User Management
- **Student Portal**
  - Register with email verification
  - Secure login with session management
  - Browse and enroll in events
  - View enrollment history and status
  - AI chatbot for event assistance
  - Password reset with email verification

- **Teacher/Admin Portal**
  - Separate admin authentication
  - Create and manage events
  - Control event visibility
  - Send announcements and notifications
  - View enrollment lists
  - Mass email notifications to participants

### 🎪 Event Management
- **Event Creation & Editing**
  - Rich event details (title, description, date, venue)
  - Event categorization (clubs, workshops, competitions)
  - Upload event images/banners
  - Set enrollment limits and deadlines
  - Draft/Publish functionality

- **Event Discovery**
  - Filter events by category, date, and status
  - Search functionality
  - Event detail pages with complete information
  - Real-time enrollment status
  - Featured events carousel

- **Enrollment System**
  - One-click event registration
  - Automatic enrollment confirmation emails
  - Waiting list support for full events
  - View enrolled participants
  - Cancel enrollment option

### 🤖 AI Integration
- **Smart Chatbot**
  - Powered by OpenAI GPT
  - Event recommendations based on user preferences
  - Answer queries about events, venues, and dates
  - Natural language understanding
  - Context-aware responses

### 📧 Communication
- **Email System**
  - Welcome emails on registration
  - Enrollment confirmation emails
  - Event announcements
  - Password reset emails
  - Custom email templates
  - Bulk email to event participants

### 🎨 User Interface
- **Modern Design**
  - Dark theme with gradient accents
  - Glassmorphism effects
  - Smooth animations and transitions
  - Loading states and progress indicators
  - Responsive mobile design
  - Toast notifications for user feedback

---

## 🎬 Demo

### 📸 Screenshots

#### 1. Student Login Page
![Student Login](https://via.placeholder.com/800x500/1a1a2e/00eaff?text=Student+Login+Page)
*Secure student login with email verification and password recovery options*

---

#### 2. Teacher/Admin Login
![Teacher Login](https://via.placeholder.com/800x500/1a1a2e/7000ff?text=Admin+Login+Page)
*Dedicated admin portal with enhanced security features*

---

#### 3. Landing Page
![Landing Page](https://via.placeholder.com/800x500/1a1a2e/00eaff?text=GEC+EventHub+Landing+Page)
*Beautiful landing page showcasing featured events and quick navigation*

---

#### 4. Events Gallery
![Events Page](https://via.placeholder.com/800x500/1a1a2e/00eaff?text=Browse+All+Events)
*Browse all events with filters, search, and category organization*

---

#### 5. Event Details
![Event Detail](https://via.placeholder.com/800x500/1a1a2e/7000ff?text=Event+Details+Page)
*Comprehensive event information with enrollment button and announcements*

---

#### 6. Clubs Section
![Clubs](https://via.placeholder.com/800x500/1a1a2e/00eaff?text=College+Clubs+%26+Organizations)
*Discover college clubs and their upcoming events*

---

#### 7. AI Chatbot
![AI Assistant](https://via.placeholder.com/800x500/1a1a2e/7000ff?text=AI+Event+Assistant)
*Smart AI chatbot for event recommendations and queries*

---

#### 8. User Profile
![Profile Page](https://via.placeholder.com/800x500/1a1a2e/00eaff?text=User+Profile+Dashboard)
*User profile with enrolled events and personal information*

---

#### 9. Create Event (Admin)
![Create Event](https://via.placeholder.com/800x500/1a1a2e/7000ff?text=Create+New+Event)
*Admin interface for creating and managing events*

---

#### 10. Email Notification System
![Email System](https://via.placeholder.com/800x500/1a1a2e/00eaff?text=Automated+Email+Notifications)
*Automated email notifications for enrollments and announcements*

---

### 🎥 Demo Video

> **Note:** Add your demo video here showcasing the complete user journey from login to event enrollment

[![Demo Video](https://via.placeholder.com/800x450/1a1a2e/00eaff?text=▶+Watch+Demo+Video)](https://your-demo-video-link.com)

*Click to watch the complete walkthrough of GEC EventHub features*

---

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library for building interactive interfaces
- **Redux Toolkit** - State management for global app state
- **React Router DOM** - Client-side routing and navigation
- **Vite** - Next-generation frontend build tool
- **React Icons** - Beautiful icon library
- **CSS3** - Custom styling with animations and gradients

### Backend
- **Node.js** - JavaScript runtime environment
- **Express 5.1.0** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and security
- **Nodemailer** - Email sending functionality
- **Express Session** - Session management
- **Cookie Parser** - Cookie handling

### AI & External Services
- **OpenAI API** - GPT-powered chatbot integration
- **Pinecone** - Vector database for AI embeddings
- **Axios** - HTTP client for API requests
- **CORS** - Cross-Origin Resource Sharing support

### DevOps
- **Vercel** - Frontend deployment
- **MongoDB Atlas** - Cloud database hosting
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager
- OpenAI API key (for AI features)

### Clone the Repository
```bash
git clone https://github.com/Sunil-Pradhan04/EventManagement.git
cd EventManagement
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd Event_Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the backend root:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
SESSION_SECRET=your_jwt_secret_key

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment

# Frontend URL
clientURL=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:3000`

---

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd React/EVENT
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the frontend root:
```env
VITE_API_URL=http://localhost:3000
```

4. Update `src/config.js` if needed:
```javascript
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

5. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

### First-Time Setup

1. **Create Admin Account**
   - Use the backend API endpoint `/api/EVENT/createAdmin` to create your first admin account
   - Example using Postman or curl:
   ```bash
   curl -X POST http://localhost:3000/api/EVENT/createAdmin \
   -H "Content-Type: application/json" \
   -d '{
     "name": "Admin Name",
     "email": "admin@college.edu",
     "password": "securepassword",
     "role": "admin"
   }'
   ```

2. **Test Student Registration**
   - Navigate to `http://localhost:5173`
   - Create a student account and verify email

3. **Explore Features**
   - Login as admin at `http://localhost:5173/teacher_login`
   - Create your first event
   - Test enrollment as a student

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/EVENT
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create` | Register new student | No |
| POST | `/login` | Student login | No |
| POST | `/createAdmin` | Create admin account | No |
| POST | `/verification` | Verify email with code | No |
| POST | `/resendCode` | Resend verification email | No |
| POST | `/requestPasswordChange` | Request password reset | No |
| POST | `/createPasswordResetSession` | Create reset session | No |
| POST | `/changePassword` | Change password | No |
| POST | `/logout` | Logout user | Yes |
| GET | `/check-session` | Check if user logged in | No |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all users | Student/Admin |

### Event Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/createEvent` | Create new event | Admin Only |
| GET | `/getEvent` | Get all events | Student/Admin |
| GET | `/getEventById/:id` | Get event by ID | Student/Admin |
| PUT | `/updateEvent/:id` | Update event details | Admin Only |
| DELETE | `/deleteEvent/:id` | Delete event | Admin Only |
| PATCH | `/visibility/:id` | Toggle event visibility | Admin Only |
| POST | `/finishEvent` | Mark event as finished | Admin Only |

### Enrollment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/Enrollment` | Enroll in event | Student/Admin |
| GET | `/getEventEnrollments/:eventName` | Get event enrollments | Student/Admin |

### Announcement Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/AddAnnousement` | Add event announcement | Admin Only |
| GET | `/getEventAnoussments/:Ename` | Get announcements | Student/Admin |
| DELETE | `/deleteAnnouncement/:id` | Delete announcement | Admin Only |

### Email Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/CreateMail` | Create email template | Admin Only |
| POST | `/sendEmail` | Send email to participants | Admin Only |

### AI Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/chatWithAi` | Chat with AI assistant | Student/Admin |

---

## 📁 Project Structure

### Backend Structure
```
Event_Backend/
├── DB/
│   └── dbConnection.js          # MongoDB connection
├── model/
│   ├── userSchema1.js           # User model
│   └── HubSchema.js             # Event & Hub models
├── middleware/
│   └── Auth.js                  # Authentication middleware
├── function/
│   ├── function.js              # User functions
│   └── EventFunction.js         # Event functions
├── routes/
│   └── userRoutes.js            # API routes
├── services/                    # External services
├── app.js                       # Express app setup
├── server.js                    # Server entry point
└── .env                         # Environment variables
```

### Frontend Structure
```
React/EVENT/
├── src/
│   ├── component/
│   │   ├── Student_Login.jsx    # Student login page
│   │   ├── Teacher_Login.jsx    # Admin login page
│   │   ├── Home.jsx             # Main app component
│   │   ├── verification.jsx     # Email verification
│   │   ├── ChangePassword.jsx   # Password management
│   │   ├── Toast.jsx            # Notification component
│   │   ├── Loader.jsx           # Loading component
│   │   ├── mainRouter/
│   │   │   ├── Landing.jsx      # Landing page
│   │   │   ├── Events.jsx       # Events listing
│   │   │   ├── EventPage.jsx    # Event details
│   │   │   ├── Clubs.jsx        # Clubs page
│   │   │   ├── Ai.jsx           # AI chatbot
│   │   │   ├── Profile.jsx      # User profile
│   │   │   ├── createEvent.jsx  # Create event form
│   │   │   └── EnrollmentPage.jsx # Enrollment management
│   │   └── style/               # CSS files
│   ├── Store/
│   │   └── ProfileSlice.js      # Redux slices
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   └── config.js                # Configuration
├── public/                      # Static assets
├── package.json
└── vite.config.js
```

---

## 🔐 Security Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcrypt encryption for passwords
- ✅ **Session Management** - HTTP-only cookies for sessions
- ✅ **Email Verification** - Two-factor verification for new users
- ✅ **CORS Protection** - Configured for specific origins
- ✅ **Role-Based Access** - Admin and student role separation
- ✅ **Input Validation** - Server-side validation for all inputs
- ✅ **Password Reset** - Secure password recovery flow

---

## 🎨 UI/UX Features

- 🌑 **Dark Theme** - Modern dark mode design
- 🎭 **Glassmorphism** - Beautiful frosted glass effects
- 🌈 **Gradients** - Vibrant color gradients throughout
- ✨ **Animations** - Smooth transitions and micro-interactions
- 📱 **Responsive** - Mobile-first design approach
- 🔔 **Toast Notifications** - User-friendly feedback messages
- ⚡ **Loading States** - Progress indicators and loaders
- 🎯 **Intuitive Navigation** - Easy-to-use interface

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically on push

### Database (MongoDB Atlas)
- Use MongoDB Atlas for cloud database
- Configure IP whitelist
- Set up connection string in `.env`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sunil Pradhan**

- GitHub: [@Sunil-Pradhan04](https://github.com/Sunil-Pradhan04)
- LinkedIn: [Sunil Pradhan](https://linkedin.com/in/sunil-pradhan)

---

## 🙏 Acknowledgments

- OpenAI for GPT API
- React and Node.js communities
- All contributors and testers
- College administration for support

---

## 📞 Support

For questions or support, please:
- Open an issue on GitHub
- Contact: your.email@example.com
- Join our Discord community

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ for educational institutions**

</div>
