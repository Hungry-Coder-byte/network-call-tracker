# Network Call Tracker

## Overview

Network Call Tracker is a web application designed to monitor and display all network calls occurring within a WiFi network. It provides a user-friendly interface to visualize payloads and responses, making it easier for users to track and analyze network activity.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: Express, TypeScript, MongoDB
- **Database**: MongoDB

## Features

- View all network calls tracked in the current session.
- Detailed view of specific network calls.
- User authentication and session management.
- Update user settings and preferences.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd network-call-tracker
   
2. Install dependencies for the backend:

   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory based on the `.env.example` file provided. Ensure to set the necessary environment variables for your MongoDB connection and any other configurations.

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints

### Fetch All Network Calls

- **Method**: `GET`
- **Path**: `/api/calls`
- **Description**: Fetches all network calls tracked in the current session.

### Fetch Network Call Details

- **Method**: `GET`
- **Path**: `/api/calls/:id`
- **Description**: Fetches details of a specific network call by ID.

### User Authentication

- **Method**: `POST`
- **Path**: `/api/login`
- **Description**: Authenticates a user and returns a session token.

### Update User Settings

- **Method**: `PATCH`
- **Path**: `/api/settings`
- **Description**: Updates user settings and preferences.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.