Skills Forge

Skills Forge is a backend-focused project built with Node.js, Express, and MongoDB, designed to help users manage their skills, projects, and tasks efficiently. It features user authentication, project management, and task tracking as sub-documents within projects.

Features

User registration and login with secure password hashing

Role-based access control (user and admin)

Manage user profile with bio, skills, and profile picture

CRUD operations for projects

Nested CRUD operations for tasks inside projects

Track project skills and task statuses (pending, in-progress, completed)

JWT authentication for secure endpoints

Error handling and validations

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JWT, bcrypt

Tools: Postman for API testing

Folder Structure
skills-forge/
├─ config/             # Configuration files
├─ controllers/        # Route handlers
├─ middlewares/        # Authentication and error handling
├─ models/             # Mongoose models
├─ routes/             # API routes
├─ util/               # Utility functions
├─ server.js           # Entry point
├─ package.json
├─ .gitignore

API Endpoints
User

POST /api/auth/register – Register new user

POST /api/auth/login – Login user

GET /api/auth/profile – Get logged-in user profile

Projects

GET /api/projects – Get all projects

POST /api/projects – Add new project

PUT /api/projects/:projectId – Update a project

DELETE /api/projects/:projectId – Delete a project

Tasks

GET /api/tasks/:projectId – Get tasks for a project

POST /api/tasks/:projectId – Add new task

PUT /api/tasks/:projectId/:taskId – Update task

DELETE /api/tasks/:projectId/:taskId – Delete task

Installation

Clone the repo:

git clone https://github.com/juneboy933/skills-forge.git
cd skills-forge


Install dependencies:

npm install


Setup environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


Start the server:

npm run dev


The API will be available at http://localhost:5000.

Testing

Use Postman or any API client to test the routes.

Ensure you include the JWT token in the Authorization header for protected routes.

Contributions

Contributions are welcome! Please fork the repository and create a pull request with improvements or bug fixes.

License

MIT License