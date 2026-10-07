# Weather Dashboard

A full-stack weather app for searching current conditions and a five-day forecast, switching temperature units, and managing saved cities with a personal account.

Built with React and Vite, an Express API, MongoDB, and OpenWeatherMap. The backend handles weather requests so the OpenWeatherMap API key is not exposed in the frontend.

## Features

- Current weather details including temperature, humidity, wind, pressure, visibility, sunrise, and sunset
- Five-day forecast with metric and imperial unit support
- Account registration and login using JWT authentication and hashed passwords
- Personal favourites stored in MongoDB, with user-scoped access
- Responsive dashboard and a Postman collection for API testing

## Tech Stack

| Frontend | Backend | Services |
| --- | --- | --- |
| React 18, Vite, React Router, Axios | Node.js, Express, Mongoose, JWT | MongoDB, OpenWeatherMap |

## Run Locally

### Requirements

- Node.js 18 or newer and npm
- MongoDB running locally or a MongoDB Atlas connection string
- An [OpenWeatherMap API key](https://openweathermap.org/api)

### 1. Configure the backend

From the project root, create the backend environment file:

```bash
cp backend/.env.example backend/.env
```

Set the values in `backend/.env`. Use a private, randomly generated value for `JWT_SECRET` and your own OpenWeatherMap key.

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/weather_dashboard
JWT_SECRET=replace_with_a_long_random_secret
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

### 2. Start the backend

In a terminal at the project root:

```bash
cd backend
npm install
npm run dev
```

The API starts at `http://localhost:5000` after connecting to MongoDB.

### 3. Start the frontend

Open a second terminal at the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`. The frontend is configured to use `http://localhost:5000/api`.

## API

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | No | Create an account |
| `POST` | `/auth/login` | No | Sign in and receive a JWT |
| `GET` | `/auth/me` | Bearer token | Get the current user |
| `GET` | `/weather?city={city}&unit={unit}` | No | Get current weather (`metric` or `imperial`) |
| `GET` | `/weather/forecast?city={city}&unit={unit}` | No | Get the five-day forecast |
| `GET` | `/favourites` | Bearer token | List saved cities |
| `POST` | `/favourites` | Bearer token | Save a city |
| `PUT` | `/favourites/:id` | Bearer token | Update a saved city |
| `DELETE` | `/favourites/:id` | Bearer token | Remove a saved city |

Import [`Postman_Collection.json`](Postman_Collection.json) into Postman to try the API requests. Authenticated endpoints require `Authorization: Bearer <token>`.

## Project Layout

```text
.
├── backend/                 # Express API, MongoDB models, routes, and controllers
├── frontend/                # React application and Vite configuration
├── Postman_Collection.json  # API request collection
└── README.md
```

## Security Notes

- Keep `backend/.env` private; it contains database credentials and API secrets. It is excluded by `.gitignore`.
- Never put the OpenWeatherMap API key in frontend code or commit real credentials.
- Replace the example JWT secret with a strong, unique secret before running or deploying the app.