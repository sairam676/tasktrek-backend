# TaskTrek
## TaskTrek – Task Management Backend API

### 🛠 Tools & Technologies
**Node.js**, **Express.js**, **MongoDB Atlas**, **Mongoose**, **JWT**, **Render**

---

### 📘 Overview
TaskTrek is a backend REST API for a task management system.  
The project focuses on secure authentication, clean backend architecture, and real-world API design patterns.

It provides authenticated APIs for managing user-specific tasks and is deployed in a production environment.

---

### ⚙️ Features
- JWT-based authentication for user registration and login  
- Authenticated user profile endpoint (`GET /api/users/me`)  
- User-level authorization (users can only access their own tasks)  
- Task CRUD operations with status workflow (`todo`, `in-progress`, `done`)  
- Query-based filtering of tasks by status  
- Pagination support for scalable task retrieval  
- Soft delete and restore functionality  
- Centralized error handling middleware  
- Production deployment on Render  

---

### 🔐 Authentication
Authentication is handled using JSON Web Tokens (JWT).

---

### 📡 API Endpoints

#### Authentication
- `POST /api/users/register` – Register a new user  
- `POST /api/users/login` – Login and receive JWT  
- `GET /api/users/me` – Get current authenticated user  

#### Tasks (Protected Routes)
- `GET /api/tasks` – Get all tasks for the logged-in user  
- `GET /api/tasks?status=todo` – Filter tasks by status  
- `GET /api/tasks?page=1&limit=10` – Paginated task results  
- `POST /api/tasks` – Create a new task  
- `PUT /api/tasks/:id` – Update a task  
- `DELETE /api/tasks/:id` – Soft delete a task  
- `PATCH /api/tasks/:id/restore` – Restore a deleted task  

---

### 🚀 Deployment
The backend is deployed on **Render** and connected to **MongoDB Atlas**.

Live API:
---

### 📡 API Endpoints

#### Authentication
- `POST /api/users/register` – Register a new user  
- `POST /api/users/login` – Login and receive JWT  
- `GET /api/users/me` – Get current authenticated user  

#### Tasks (Protected Routes)
- `GET /api/tasks` – Get all tasks for the logged-in user  
- `GET /api/tasks?status=todo` – Filter tasks by status  
- `GET /api/tasks?page=1&limit=10` – Paginated task results  
- `POST /api/tasks` – Create a new task  
- `PUT /api/tasks/:id` – Update a task  
- `DELETE /api/tasks/:id` – Soft delete a task  
- `PATCH /api/tasks/:id/restore` – Restore a deleted task  
---
### Backend Design Highlights
- Secure JWT authentication and authorization
- Ownership validation for all protected resources
- Soft delete pattern using `isDeleted` flag
- Query-driven filtering and pagination
- Environment-aware configuration for production
---

### 📦 Setup (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/sairam676/tasktrek-backend.git
cd tasktrek-backend

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env file with:
# MONGO_URI, JWT_SECRET, NODE_ENV

# 4. Run the development server
npm run dev
---

