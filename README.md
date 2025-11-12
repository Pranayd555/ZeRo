# ZeRo Project

This project is a full-stack application with a separate backend (Node.js with Express and MongoDB) and frontend (Angular).

This project was developed to implement a state management system for an Angular application.

## Demo

![Demo GIF](assets/demo.gif)

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **Mongoose**: MongoDB object data modeling (ODM) for Node.js.
- **MongoDB**: NoSQL database (via Mongoose).
- **TypeScript**: Superset of JavaScript that adds static types.
- **bcryptjs**: Library for hashing passwords.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a `.env` file.
- **jsonwebtoken**: Library for implementing JSON Web Tokens for authentication.
- **nodemon**: Utility that monitors for any changes in your source and automatically restarts your server.

### Frontend
- **Angular**: A platform and framework for building single-page client applications using HTML and TypeScript.
- **TypeScript**: Superset of JavaScript that adds static types.
- **RxJS**: Reactive Extensions for JavaScript, used for reactive programming.
- **NgRx**: A framework for building reactive applications in Angular (using `@ngrx/effects`, `@ngrx/store`, `@ngrx/store-devtools`).
- **Angular Material**: Component library for Angular applications (using `@angular/cdk`, `@angular/material`).
- **Bootstrap**: CSS framework for responsive and mobile-first front-end web development.
- **ngx-toastr**: A library for displaying toast notifications.
- **jQuery**: A fast, small, and feature-rich JavaScript library.

## Project Structure

The project is divided into two main parts:

- `backend/`: Contains the Node.js/Express.js server with MongoDB integration.
- `frontend/`: Contains the Angular client application.

## Functionality

### Backend
The backend serves as the API for the application. It handles:
- **User Management**: Authentication (login, registration) using JWT and `bcryptjs` for password hashing.
- **Fruit Management**: Provides API endpoints for managing fruit-related data.
- **Database Interaction**: Connects to a MongoDB database using Mongoose.

### Frontend
The frontend is an Angular application that interacts with the backend API. It likely includes:
- **User Interface**: Built with Angular components, potentially using Angular Material and Bootstrap for styling.
- **State Management**: Utilizes NgRx for managing application state.
- **Routing**: Handles navigation within the single-page application.
- **API Communication**: Interacts with the backend API to fetch and send data (e.g., user data, fruit data).
- **Notifications**: Uses `ngx-toastr` for displaying user feedback.

## User Functionalities (Use Cases)

This application allows users to:

- **Register and Authenticate**: Users can create new accounts and log in securely.
- **Manage User Profiles**: (Implied by User Management in backend, though not explicitly detailed, it's a common feature).
- **Browse and Interact with Fruit Data**: Users can view and potentially manage fruit-related information through the frontend interface, which communicates with the backend's fruit management API.
- **Navigate the Application**: The Angular frontend provides a dynamic user interface for seamless navigation.
- **Receive Notifications**: The application provides user feedback through toast notifications.

## Getting Started

To get this project up and running, follow these steps:

### Prerequisites
- **Node.js**: Ensure Node.js is installed (version compatible with Angular 16).
- **Angular CLI**: Install the Angular CLI globally using `npm install -g @angular/cli`.

### Backend Setup
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `.env` with your MongoDB URI:
```bash
MONGO_URI=YOUR_MONGO_URI
```


4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```
   The frontend application will typically be available at `http://localhost:4200`.