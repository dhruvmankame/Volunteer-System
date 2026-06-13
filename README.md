# 🌟 NayePankh Foundation - Volunteer Registration System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

A complete Full Stack web application built for the **NayePankh Foundation Internship Selection Task**. This system allows users to seamlessly register as volunteers and provides a secure, interactive dashboard for administrators to manage and export volunteer data.

---

## 🎯 Purpose

The primary goal was to digitize and automate the volunteer onboarding process, moving away from manual entry and creating a centralized, secure database for the organization to easily manage their growing community of change-makers.

### ✨ Features Implemented (Including All Bonus Requirements)
- **Public Registration Portal:** A beautifully styled, responsive form for capturing volunteer details.
- **Strict Data Validation:** Enforces correct phone number lengths (10 digits) and authenticates common email domains (e.g., @gmail.com) to ensure data hygiene.
- **Connected Database:** Seamless integration with MongoDB Atlas for persistent cloud storage.
- **Secure Authentication:** JWT (JSON Web Token) and Bcrypt password hashing protect the administrative routes.
- **Admin Dashboard:** A protected portal displaying a searchable, sortable list of all registered volunteers.
- **Generate Reports:** One-click CSV export functionality for offline data analysis.
- **Premium UI/UX:** Built with Tailwind CSS, Lucide Icons, and Framer Motion for a production-ready, highly polished user experience.

---

## 📂 Project Architecture & File Structure

The project follows a standard MERN stack architecture, separated into two distinct environments:

```text
volunteer-system/
│
├── backend/                  # Node.js + Express Server
│   ├── models/               # Mongoose Database Schemas
│   │   ├── Admin.js          # Admin credentials schema
│   │   └── Volunteer.js      # Volunteer data schema
│   ├── .env                  # Backend environment variables
│   ├── seedAdmin.js          # Script to generate the first admin user
│   └── server.js             # Main Express server and API routes
│
└── frontend/                 # React + Vite Application
    ├── src/
    │   ├── pages/            
    │   │   ├── Dashboard.jsx # Protected Admin Dashboard UI
    │   │   ├── Login.jsx     # Admin JWT Login UI
    │   │   └── Register.jsx  # Public Volunteer Form UI
    │   ├── App.jsx           # React Router configuration
    │   ├── index.css         # Tailwind global styles
    │   └── main.jsx          # React entry point
    ├── tailwind.config.js    # Tailwind theme and custom UI settings
    └── .env                  # Frontend environment variables (API URLs)
```

---

## 🚀 How to Run Locally

Follow these steps to get the project running on your local machine.

### Prerequisites
- Node.js (v16 or higher)
- A MongoDB Atlas Account (Free Tier is fine)

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend folder and add your MongoDB connection string and a secret key:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string_here/volunteer_db
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Run the seed script to create your first Admin account:
   ```bash
   node seedAdmin.js
   ```
   *(This will create an admin with email: `admin@nayepankh.org` and password: `password123`)*
5. Start the backend development server:
   ```bash
   npx nodemon server.js
   ```

### 2. Frontend Setup
1. Open a **new** terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend folder to link it to your backend:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

### 3. View the App
- Open your browser and navigate to: `http://localhost:5173`
- To view the Admin Dashboard, go to `/admin/login` and use the credentials generated in Step 1.4.

---

## 🛠️ Built With

* **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios, React Router Dom, React-CSV.
* **Backend:** Node.js, Express.js, Mongoose, JSONWebToken, BcryptJS.
* **Database:** MongoDB Atlas.

---
*Developed with ❤️ for the NayePankh Foundation.*
