# Car Rental Website

A full-stack car rental application built with React, Node.js, Express, and MongoDB.

## Features
- **Authentication**: Email/Password signup & login with JWT.
- **Roles**: User and Admin roles.
- **Cars**: Browse, search, filter, and view car details.
- **Bookings**: Book cars with date conflict checking.
- **Dashboard**: Manage bookings and listings.
- **Admin**: Manage all listings and bookings.

## Prerequisites
- Node.js
- MongoDB (Local or Atlas URI)

## Setup & Run

### 1. Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car-rental-app
JWT_SECRET=your_jwt_secret_key_here
```

Seed the database (optional but recommended):
```bash
npm run seed
```
*Note: You need to add a script to package.json for this or run `node scripts/seed.js`*

Run the server:
```bash
npm run dev
```
*Note: Ensure you have `nodemon` installed or use `node server.js`*

### 2. Frontend
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

## API Endpoints (Quick Reference)
- `POST /api/auth/signup`: Register
- `POST /api/auth/login`: Login
- `GET /api/cars`: List cars (filters: location, minPrice, maxPrice)
- `POST /api/bookings`: Create booking (auth required)

## Testing
1. **Signup**: Create a new account.
2. **Login**: Log in with the new account.
3. **Browse**: Check the home page for cars.
4. **Book**: Select a car and book it for a date range.
5. **Dashboard**: Check your booking status.
