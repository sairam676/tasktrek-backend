# TaskTrek – Backend System

A production-style backend system for task management built to deeply understand
authentication, authorization, real-time systems, and backend architecture.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas (Mongoose)**
- **JWT Authentication**
- **Socket.io (Real-time)**
- **Render (Deployment)**

---

## 📌 Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication for HTTP APIs.
- JWT-authenticated Socket.io connections.
- Strict ownership validation on all protected resources.

### 🗂️ Task Management
- Full CRUD APIs for tasks.
- Task status workflow (`todo`, `in-progress`, `done`).
- Pagination, filtering, and sorting.
- Soft delete and restore using a lifecycle-based data model.

### 👥 Task Assignment
- Tasks can be assigned to other users.
- Ownership enforced (only task owners can assign).
- Assignment triggers real-time updates and notifications.

### ⚡ Real-Time System (Socket.io)
- Real-time task events:
  - `task:created`
  - `task:updated`
  - `task:deleted`
  - `task:assigned`
- Room-based event scoping:
  - `user:<userId>` for personal events
  - `task:<taskId>` for shared task updates

### 🟢 Presence System
- Online/offline presence tracking.
- Multi-tab safe presence handling.
- Presence state managed server-side using socket lifecycle.

### 🔔 Notifications
- Persisted notifications stored in MongoDB.
- Real-time notification delivery when users are online.
- Notifications remain available when users reconnect.
- Mark notifications as read / unread.

### 🧱 Architecture
- **Controller–Service separation**
  - Controllers handle HTTP only.
  - Services encapsulate business logic, socket events, and notifications.
- Clean separation of concerns for maintainability and scalability.

---

## 🧠 Learning Goals Achieved

- Built a real-time backend system beyond basic CRUD.
- Designed event-driven communication using Socket.io rooms.
- Implemented persisted notifications alongside real-time delivery.
- Applied clean backend architecture patterns used in production systems.
- Gained hands-on understanding of presence, sockets, and authorization.

---

## 🌍 Deployment

- Deployed on **Render** with environment-based configuration.
- MongoDB Atlas used for production-grade database hosting.

---

## 🧪 API Highlights

- `POST /api/users` – Register
- `POST /api/users/login` – Login
- `GET /api/tasks` – List tasks (pagination & filters)
- `POST /api/tasks` – Create task
- `PUT /api/tasks/:id` – Update task
- `PATCH /api/tasks/:id/assign` – Assign task
- `PATCH /api/tasks/:id/status` – Update status
- `DELETE /api/tasks/:id` – Soft delete
- `PATCH /api/tasks/:id/restore` – Restore task
- `GET /api/notifications` – Fetch notifications

---

## 📄 License
MIT

