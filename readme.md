# Country Info App

## Description

The **Country Info App** provides detailed information about countries, including borders, population, and flags. The backend is built with **Node.js** using **Express**, and the frontend is developed with **Next.js**. Country data is fetched from external APIs and displayed graphically using **Chart.js**.

## Technologies Used

### Backend (Node.js/Express):

- **Node.js**: Server for the backend.
- **Express**: Node.js framework to create API endpoints.
- **Axios**: Library to make HTTP requests to external APIs.

### Frontend (Next.js):

- **Next.js**: React framework for building server-rendered applications.
- **Chart.js**: Used to graphically represent population data over time.
- **Tailwind CSS**: CSS framework for designing the interface.

## Installation

## 1. Clone this repository:

- git clone https://github.com/kevocode22/Country-Info-App.git

- Create a .env file in the `backend` folder and define the PORT=5000

- Create a .env file in the `frontend` folder and define NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api

## Useful Scripts

### Backend:

- `npm run dev`: Starts the server in development mode (with nodemon).

### Frontend:

- `npm run dev`: Starts the Next.js development server on localhost:3000

