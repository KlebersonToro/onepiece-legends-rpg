# Gemini Project Helper: onepiece-legends-rpg

This document provides context and commands for the `onepiece-legends-rpg` project to assist the Gemini AI agent.

## About the Project

This is a full-stack web application for a One Piece-themed RPG. It features a React frontend and a Node.js (Express) backend with a Prisma ORM for database management. The application seems to focus on Devil Fruits, allowing users to view and manage them.

## Project Structure

The project is organized into two main directories:

-   `client/`: Contains the React frontend application.
-   `server/`: Contains the Node.js backend API and database logic.

Each directory is a separate Node.js project with its own `package.json` and dependencies.

## Tech Stack

-   **Client (Frontend):**
    -   React
    -   TypeScript
    -   Sass/SCSS
    -   React Scripts (Create React App)

-   **Server (Backend):**
    -   Node.js
    -   Express.js
    -   TypeScript
    -   Prisma (ORM)
    -   PostgreSQL

## Common Commands

**Note:** Run commands from within their respective directories (`client/` or `server/`).

### Client

-   **Install dependencies:**
    ```bash
    npm install
    ```
-   **Run development server:**
    ```bash
    npm start
    ```
-   **Build for production:**
    ```bash
    npm run build
    ```
-   **Run tests:**
    ```bash
    npm run test
    ```

### Server

-   **Install dependencies:**
    ```bash
    npm install
    ```
-   **Run development server:**
    ```bash
    npm run dev
    ```
-   **Generate Prisma client:** (After changing `schema.prisma`)
    ```bash
    npx prisma generate
    ```
-   **Run database migrations:**
    ```bash
    npx prisma migrate dev
    ```
-   **Seed the database:**
    ```bash
    npx prisma db seed
    ```
