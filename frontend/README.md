# ev-charging

This is the frontend for the EV Charging Stations project, built with **Vue 3** and **Vite**.

## Features

- User login via backend API
- Charger listing with filters (status, power output, connector type)
- Add, edit, and delete chargers
- Map view of all chargers using OpenStreetMap (Leaflet)
- Responsive and modern UI with Tailwind CSS

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Project Structure

```
src/
├── assets/
├── components/
│   ├── ChargerList.vue
│   ├── ChargerFilters.vue
│   ├── ChargerForm.vue
│   └── MapView.vue
├── views/
│   ├── LoginView.vue
│   ├── ChargerListingView.vue
│   └── MapViewPage.vue
├── router/
│   └── index.js
├── store/
│   └── index.js
├── App.vue
└── main.js
```

## API Endpoints Used

- `POST /api/v1/users/login` — User login
- `GET /api/v1/stations` — List all chargers (with optional filters)
- `POST /api/v1/stations` — Add a new charger
- `PUT /api/v1/stations/:id` — Edit a charger
- `DELETE /api/v1/stations/:id` — Delete a charger

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Map Integration

- Uses [Leaflet](https://leafletjs.com/) and OpenStreetMap for the map view.
- Ensure charger data includes `location.latitude` and `location.longitude`.

## Troubleshooting

- Make sure your backend is running at `http://localhost:8000` and CORS is enabled.
- If the map does not display, ensure Leaflet CSS is imported and charger locations are valid.

## License

MIT