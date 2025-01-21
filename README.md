# Assignment 1 - FirstBench.ai

## Project Description
This project serves as a backend implementation for managing user and admin functionalities using Node.js, Express, Prisma, and MongoDB. The system provides APIs for user registration, login, profile updates, and admin operations, such as fetching user data and creating admin accounts. Zod is used for schema validation to ensure input data integrity.

## Features

### User APIs
- **User Signup**: Allows new users to register with their name, email, password, and phone number.
- **User Signin**: Enables users to log in with their credentials.
- **Update User**: Permits users to update their profile information, including name, email, and phone number.
- **Delete User**: Allows users to mark their account as deleted.
- **Health Check**: Confirms that the user service is running.

### Admin APIs
- **Create Admin**: Enables the creation of new admin accounts with a username and password.
- **Fetch Admin**: Retrieves an admin's details by their ID.
- **Fetch All Users**: Lists all users registered in the system.
- **Health Check**: Confirms that the admin service is running.

## Project Setup

### Steps to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/charityrymbai/assignment-1-firstBench-ai
   cd assignment-1-firstbench.ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
   - Create a `.env` file in the root directory and add the following:
     ```env
     DATABASE_URL=mongodb_url
     ```

4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

5. Apply Prisma migrations:
   ```bash
   npx prisma db push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```


7. Access the API at:
   ```
   http://localhost:3000
   ```

## API Endpoints

### User Routes
| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| GET    | `/api/v1/user/health`  | Check if the user service is running. |
| POST   | `/api/v1/user/signup`  | Register a new user.              |
| POST   | `/api/v1/user/signin`  | Log in a user.                    |
| PUT    | `/api/v1/user/update-user/:id` | Update user details.        |
| DELETE | `/api/v1/user/delete-user/:id` | Soft delete a user account. |

### Admin Routes
| Method | Endpoint                    | Description                       |
|--------|-----------------------------|-----------------------------------|
| GET    | `/api/v1/admin/health`      | Check if the admin service is running. |
| POST   | `/api/v1/admin/create`      | Create a new admin account.       |
| GET    | `/api/v1/admin/get-admin/:id` | Fetch details of a specific admin. |
| GET    | `/api/v1/admin/getAllUsers` | Fetch all registered users.       |

## Technologies Used
- **TypeScript**: For type safety.
- **Express**: For building RESTful APIs.
- **Prisma ORM**: For database interactions.
- **Zod**: For input validation.
- **MongoDB**: As the database.

Feel free to contribute or report issues!