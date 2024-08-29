# PostgreSQL and Express.js Project

## Overview

This backend segment completes Tasks 4 through 8 of the Software Developer Assessment. The project is a simple blogging platform that allows users to create, read, update, and delete posts. It uses Express.js for the server, PostgreSQL for the database, and Passport.js for user authentication.

Task 9 was also completed through the integration of user-specific API endpoints through Passport.js.

## Features

- **User Authentication**: Signup, login, and logout functionality using Passport.js.
- **CRUD Operations**: Create, read, update, and delete operations for posts.
- **Database Interaction**: Connects to PostgreSQL to store user information and posts.
- **Middleware**: Logs incoming requests for debugging and monitoring.

## Key Considerations

- **Security**: Passwords are hashed before being stored in the database.
- **Database Schema**: Designed to handle basic blogging functionalities.
- **Error Handling**: Basic error handling for API endpoints and database operations.

## Setup and Installation

### Prerequisites

- Node.js (version 14 or later)
- PostgreSQL (version 12 or later)
- `psql` command-line tool (for database operations)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/T2LIPthedeveloper/bizinc-assessment.git
    cd bizinc-assessment/backend_assessments/pg-express-backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up the PostgreSQL Database**

    1. **Create the Database**

        ```bash
        psql -U postgres
        CREATE DATABASE your_database_name;
        \q
        ```

    2. **Run the Schema Script**

        ```bash
        psql -U postgres -d your_database_name -f schema.sql
        ```

    3. **Create `.env` File**

        Create a `.env` file in the root directory and add the following configuration:

        ```plaintext
        PGUSER=your_pg_user
        PGPASSWORD=your_pg_password
        PGHOST=localhost
        PGPORT=5432
        PGDATABASE=express_postgres_db
        SESSION_SECRET=your_secret_key
        ```

    4. **Initialise the database on your system**

        ```bash
        psql -U your_pg_user -d express_postgres_db -f database/init.sql
        ```

4. **Run the Server**

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.

## API Endpoints

- **Signup**
  - **URL**: `http://localhost:3000/signup`
  - **Method**: POST
  - **Body**: JSON
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```

- **Login**
  - **URL**: `http://localhost:3000/login`
  - **Method**: POST
  - **Body**: JSON
    ```json
    {
      "username": "testuser",
      "password": "testpassword"
    }
    ```

- **Logout**
  - **URL**: `http://localhost:3000/logout`
  - **Method**: GET

- **Get All Posts**
  - **URL**: `http://localhost:3000/posts`
  - **Method**: GET

- **Create a Post**
  - **URL**: `http://localhost:3000/posts`
  - **Method**: POST
  - **Body**: JSON
    ```json
    {
      "title": "New Post Title",
      "content": "This is the content of the new post."
    }
    ```

- **Retrieve Posts by User**
  - **URL**: `http://localhost:3000/posts/user/:userId`
  - **Method**: GET

- **Count Comments on a Post**
  - **URL**: `http://localhost:3000/comments/count/:postId`
  - **Method**: GET

## Challenges and Learnings

- **Challenge**: Setting up and configuring Passport.js for authentication required understanding session management and cookie handling. I was familiar with SQL, but not with PostgreSQL, so I had to learn the syntax and commands for creating tables and relationships. Additionally, I was new to Passport.js and had to learn how to integrate it with Express.js.
- **Learning**: Gained hands-on experience with Express.js middleware and integrating PostgreSQL with Node.js.

## Summary of the Approach

- **Backend Setup**: Established a Node.js server using Express.js, connected to a PostgreSQL database, and implemented CRUD operations.
- **Authentication**: Used Passport.js for secure user authentication.
- **Database Design**: Designed a schema to support users, posts, and comments with relational integrity.
- **Middleware**: Added custom middleware for logging incoming requests to assist with debugging.

By following these steps and using the provided API endpoints, you can interact with the application and test its functionalities.