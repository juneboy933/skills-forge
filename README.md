# Skills Forge

A backend API for managing user skills, projects, and project tasks. Built with **Node.js**, **Express**, and **MongoDB** (Mongoose). Users can create accounts, manage profiles, add projects, and organize tasks within projects.

---

## 🚀 Features

- User authentication (signup, login) with hashed passwords.
- Profile management (bio, profile picture, skills).
- Project management (CRUD operations).
- Task management as subdocuments inside projects (CRUD operations).
- Role-based authorization (`user`, `admin`).
- Proper error handling and validation.

---

## 📂 Folder Structure

skills-forge/
├─ controllers/ # Business logic for users, projects, tasks
├─ models/ # Mongoose schemas
├─ routes/ # API route definitions
├─ middlewares/ # Authentication, authorization, error handling
├─ config/ # DB connections, environment configs
├─ utils/ # Helper functions
├─ server.js # Entry point of the application
├─ package.json
├─ .env # Environment variables (ignored in Git)
└─ README.md


---

## ⚡ Installation

1. Clone the repository:
```bash
git clone https://github.com/juneboy933/skills-forge.git
cd skills-forge

2. Install dependncies
npm install

3. Create a .env file in the root and add the following variables:

PORT=4000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_jwt_secret
