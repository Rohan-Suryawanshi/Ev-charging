# EV Charging Stations – Full Stack Documentation

This project is a full-stack solution for managing and visualizing EV charging stations.  
It includes a **Vue 3 + Vite** frontend and a **Node.js + Express + MongoDB** backend.

---

## 🚀 Demo URLs

- **Frontend Live:** [https://ev-charging-s5ya.vercel.app/](https://ev-charging-s5ya.vercel.app/)
- **Backend API Live:** [https://your-backend-demo-url.com](https://your-backend-demo-url.com)


---

## 📦 Project Structure

```
EV-Charging Stations/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── views/
│   │   ├── router/
│   │   ├── store/
│   │   ├── App.vue
│   │   └── main.js
│   └── package.json
└── ReadMe.md
```

---

## ✨ Features

- **User Authentication:** Register and login (JWT-based)
- **Charger Management:** Add, edit, delete, and list charging stations
- **Filtering:** Filter stations by status, power output, and connector type
- **Map View:** Visualize all stations on an interactive map (OpenStreetMap/Leaflet)
- **Responsive UI:** Built with Tailwind CSS
- **RESTful API:** Well-structured endpoints for all operations

---

## 🖥️ Frontend

- **Tech:** Vue 3, Vite, Vue Router, Vuex, Tailwind CSS, Leaflet
- **Key Pages:**
  - Login
  - Charger Listing (with filters)
  - Charger Form (add/edit)
  - Map View

### Setup

```sh
cd frontend
npm install
npm run dev
```

### Build

```sh
npm run build
```

### Configuration

- API base URL is set to `http://localhost:8000` for local development.
- Update fetch URLs if deploying elsewhere.

---

## 🛠️ Backend

- **Tech:** Node.js, Express, MongoDB, JWT, CORS, Cookie Parser, Morgan

### Setup

```sh
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in `/backend`:

```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=*
```

---

## 🔗 API Endpoints

### User

- `POST /api/v1/users/register` — Register a new user
- `POST /api/v1/users/login` — User login

### Stations

- `GET /api/v1/stations` — List all stations (supports filters)
- `POST /api/v1/stations` — Add a new station
- `PUT /api/v1/stations/:id` — Edit a station
- `DELETE /api/v1/stations/:id` — Delete a station

---

## 🗺️ Map Integration

- Uses [Leaflet](https://leafletjs.com/) and OpenStreetMap for map view.
- Ensure each station has `location.latitude` and `location.longitude`.

---

## 🧩 Troubleshooting

- **Frontend not connecting:** Check backend CORS and API URLs.
- **Map not showing:** Ensure Leaflet CSS is imported and station locations are valid.
- **Database errors:** Ensure MongoDB is running and URI is correct.

---

## 📄 License

MIT

---
