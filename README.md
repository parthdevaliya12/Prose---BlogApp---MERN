# Prose - BlogApp

Prose is a modern, full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js). It offers a rich publishing experience with features like Google OAuth, AI-powered content generation, interactive dashboards, and a sleek, responsive UI powered by Tailwind CSS.

## 🚀 Features

- **Authentication & Security:** 
  - Secure Email/Password signup and login with strict password validation (bcrypt).
  - Seamless Google OAuth integration (`@react-oauth/google`).
  - JWT-based authentication for secure API endpoints.
- **Rich Blog Publishing:**
  - Create, edit, and delete blog posts with image uploads (Multer).
  - **AI Content Generation:** Generate blog post drafts effortlessly using the integrated Google Gemini AI.
  - Categorize posts and track total views.
- **Engaging Interactions:**
  - Like, bookmark (save), and share posts.
  - Interactive comment section (add/delete comments).
  - Explore page with category filtering and related posts.
- **Dashboard & Analytics:**
  - View personal statistics and engagement metrics visualized beautifully with `Chart.js`.
- **Modern User Interface:**
  - Built with React + Vite for lightning-fast performance.
  - Styled with **Tailwind CSS v4** and customized components (`shadcn/ui`, `lucide-react`).
  - Smooth animations powered by `framer-motion`.
  - Elegant toast notifications (`sonner`).

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **State & UI:** Framer Motion, Chart.js, Sonner (Toasts), Lucide React
- **Auth:** `@react-oauth/google`

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **File Uploads:** Multer (Local storage)
- **AI Integration:** `@google/genai` (Gemini API)
- **CORS & Environment:** `cors`, `dotenv`

## ⚙️ Local Development Setup

### Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI


## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
