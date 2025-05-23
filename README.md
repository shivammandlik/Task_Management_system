# Secure Task Management System

This is a Secure Task Management System built using the MERN stack (MongoDB, Express.js, React, and Node.js) with JWT-based authentication. The application allows users to manage tasks efficiently with features like task categorization(priority), filtering, and security-enhanced CRUD operations.

## Features
- User authentication with JWT
- Secure task creation, updating, and deletion
- Task priority filtering
- Proper error handling and validation
- Postman API with Express.js and MongoDB

## Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/) 
- [Git](https://git-scm.com/)



## Installation and Setup

### 1. Clone the Repository
```sh
git clone https://github.com/shivammandlik/Task_Management_system.git
cd Task_Management_system
```

### 2. Setup Backend (Express.js & MongoDB)
```sh
cd backend_tms
npm install
```

#### Create a `.env` file inside the `backend` directory and add the following environment variables:
```

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### Run the Backend Server
```sh
npm run dev
```
The backend server should now be running on `http://localhost:5000`.

### 3. Setup Frontend (React)
```sh
cd ../frontend_tms
npm install
```

#### Start the Frontend
```sh
npm start
```
The React frontend should now be running on `http://localhost:3000`.

## Usage
- Register or log in with valid credentials.
- Create, update, delete, and filter tasks.
- Manage tasks efficiently with security-enhanced authentication.

## Created By
- shivam mandlik
<<<<<<< HEAD
- CSE-2 ID-210041218
=======
>>>>>>> 5afd64a3e55246008d971b4c880292392e71b1fc

