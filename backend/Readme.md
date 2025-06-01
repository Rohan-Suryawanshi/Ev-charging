# EV Charging Stations Backend

This is the backend for the EV Charging Stations project, built with **Node.js**, **Express**, and **MongoDB**.

## Live URL

- **Backend API Live URL:** [https://ev-charging-three.vercel.app](https://ev-charging-three.vercel.app)  
  _Replace with your actual deployed backend URL._

## Features

- User registration and login (JWT authentication)
- CRUD operations for charging stations
- Filtering stations by status, power output, and connector type
- CORS and cookie support for frontend integration
- Centralized error handling

## Project Structure
```
src/ 
├── controllers/ 
│ ├── user.controller.js 
│ └── station.controller.js 
├── models/ 
│ ├── user.model.js 
│ └── station.model.js 
├── routes/ 
│ ├── user.routes.js 
│ └── station.routes.js 
├── middlewares/ 
│ └── auth.middleware.js 
├── app.js 
└── server.js

```

## API Endpoints

### User

- `POST /api/v1/users/register` — Register a new user
- `POST /api/v1/users/login` — User login

### Stations

- `GET /api/v1/stations` — List all stations (supports filters)
- `POST /api/v1/stations` — Add a new station
- `PUT /api/v1/stations/:id` — Edit a station
- `DELETE /api/v1/stations/:id` — Delete a station

## Environment Variables

Create a `.env` file in the backend root with:
```
PORT=8000 
MONGODB_URI=your_mongodb_connection_string JWT_SECRET=your_jwt_secret 
CORS_ORIGIN=*
```

## Running Locally

```
npm install
npm run dev
```
The backend will run at http://localhost:8000 by default.