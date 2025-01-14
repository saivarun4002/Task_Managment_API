# Task Management API

A RESTful API built with Node.js, Express, and MongoDB to manage tasks. This API basically supports user authentication and basic CRUD operations for tasks.


## Instructions to Set Up and Run the API
### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud-based, such as [MongoDB Atlas](https://www.mongodb.com/atlas))
- A terminal or command prompt

## To Install Dependencies
-Run the command npm install

## Environment Variables
Create a .env file in the root directory and add the following variables:

MONGO_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_jwt_secret_key
PORT=5007

Replace MONGO_URI with your own MongoDB connection string.
Replace JWT_SECRET with a secure secret key for generating JWT tokens.

## Run the API
Start the server with the following command:

npm start



## Features Implemented

## Authentication
User Registration: Allows users to register with name, email, password, and optional details (DOB, gender).
**POST /api/auth/register** - Register a new user.

User Login: Authenticates users and provides a JWT token for secure access to protected routes.
**POST /api/auth/login** - Login and receive a JWT token.

## Task Management

1. Create a Task: Add new tasks with a title, description, status, and due date.
**POST /api/tasks** - Add a new task (protected).

2. Read Tasks:
**GET /api/tasks** - Retrieve all tasks.
**GET /api/tasks/:id** - Retrieve a single task by specifying its ID.

3. Update a Task:
**PUT /api/tasks/:id** - Modify details of an existing task (title, description, status, due date).

4. Delete a Task:
**DELETE /api/tasks/:id** - Remove a task from the database.


## Filtering and Sorting
Filter by Status: Retrieve tasks based on their status (Pending or Completed).
Filter by Title: Retrieve tasks with titles containing a specific keyword (case-insensitive).


## Combine Filters and Sorting:
Example: GET /api/tasks?status=Pending&sortBy=dueDate:asc


## Additional Features
Protected Routes: Secure endpoints using JWT authentication.
Validation: Input validation for required fields and MongoDB ObjectIds.
Error Handling: Meaningful error messages for invalid input, authentication failures, or missing data.


## Challenges Faced During Development

Validation of IDs
Ensuring that MongoDB ObjectIds are validated before querying the database to avoid unnecessary server errors.