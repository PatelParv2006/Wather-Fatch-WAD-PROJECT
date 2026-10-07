# Weather Dashboard Web Application

**Experiment No. 10** – Web Application Development Laboratory  

---

## Academic Information

- **Student Name:** YOUR NAME
- **Enrollment Number:** YOUR ENROLLMENT NUMBER
- **Semester / Branch:** Computer Engineering / Information Technology
- **Course Name:** Web Application Development (WAD)
- **Academic Year:** 2026 – 2027

---

## 1. Problem Statement

Modern individuals and businesses require prompt and reliable weather reports to make informed everyday decisions. Traditional weather services often present fragmented, bloated interfaces, or expose sensitive API credentials on client devices. This project addresses the need for a unified, secure, light-themed full-stack Weather Dashboard application that allows users to search real-time global weather conditions, review 5-day forecasts, switch temperature units dynamically, and securely manage persistent favourite cities.

---

## 2. Objective

1. To construct a decoupled full-stack web application using **React.js (Vite)** on the frontend and **Node.js / Express.js** on the backend.
2. To utilize **MongoDB** and **Mongoose ODM** for persisting authenticated user accounts and personalized favourite cities.
3. To implement **JSON Web Token (JWT)** authentication and **bcryptjs** password hashing to safeguard user data and protect private API routes.
4. To implement a secure backend proxy layer that interacts with the **OpenWeatherMap API**, keeping external API keys confidential.
5. To develop a clean, responsive, light-themed UI adhering to strict lab manual color and typography specifications.
6. To test and validate every REST API endpoint using **Postman**.

---

## 3. Key Features

- **Global City Search:** Look up current weather metrics for any supported city globally (default: Ahmedabad).
- **Comprehensive Weather Metrics:**
  - Real-time Temperature & Feels Like temperature
  - Humidity percentage (%)
  - Wind speed (with directional degrees)
  - Atmospheric pressure (hPa)
  - Visibility distance (in km)
  - Sunrise and sunset times (UTC)
  - Weather description with official OpenWeatherMap condition icons
- **5-Day Weather Forecast:** Transformed daily summaries showing day/date, condition icon, minimum/maximum temperature range, and average humidity.
- **Dynamic Unit Switching:** Seamlessly toggle between **Celsius (°C / metric)** and **Fahrenheit (°F / imperial)** with immediate UI updates.
- **User Authentication:** Secure user signup and login utilizing JWT tokens and salted bcrypt password hashing.
- **Personalized Favourites CRUD:**
  - Authenticated users can save favourite cities to their MongoDB account.
  - Strict ownership isolation: User A can never view or delete User B's favourites.
  - Quick-access tags and dedicated Favourites page.
  - One-click weather lookup for any saved city.
- **User Experience & Feedback:**
  - Explicit loading spinners ("Searching...", "Loading weather...", "Loading forecast...").
  - Clear user alerts for invalid city names, network timeouts, duplicate additions, and missing credentials.
  - Friendly empty states.
- **Responsive Light Theme:** Clean aesthetic using the college lab manual palette (`#F8FAFC`, `#FFFFFF`, `#2563EB`, `#0EA5E9`, `#0F172A`, `#64748B`, `#E2E8F0`).

---

## 4. Technology Stack

### Frontend
- **Framework:** React.js 18 (using Vite build tool)
- **Routing:** React Router DOM (v6)
- **HTTP Client:** Axios (with request & response interceptors)
- **Icons:** Lucide React & OpenWeatherMap Official Weather Icons
- **Styling:** Custom Light Theme Vanilla CSS (no dark mode, clean cards, responsive grid)

### Backend
- **Runtime:** Node.js (v22+)
- **Server Framework:** Express.js
- **Database:** MongoDB (Local Community Server / Atlas)
- **ODM:** Mongoose (v8+)
- **Authentication:** JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **Environment Management:** `dotenv`
- **Cross-Origin Resource Sharing:** `cors`

### External API
- **OpenWeatherMap API:** Current Weather (`/weather`) & 5-Day Forecast (`/forecast`)

---

## 5. Project Structure

```
Wather app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection using Mongoose
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, and auth validation
│   │   ├── favouriteController.js# CRUD operations for user favourite cities
│   │   └── weatherController.js  # OpenWeatherMap API proxy & error handling
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification middleware
│   │   └── errorMiddleware.js    # Centralized Express error handler (400, 401, 404, 409, 500)
│   ├── models/
│   │   ├── FavouriteCity.js      # Mongoose schema for saved cities with user ObjectId
│   │   └── User.js               # Mongoose schema with bcrypt hashing hook
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   ├── favouriteRoutes.js    # /api/favourites routes (protected)
│   │   └── weatherRoutes.js      # /api/weather routes
│   ├── utils/
│   │   └── weatherFormatter.js   # Transforms raw API responses to clean frontend models
│   ├── .env                      # Local environment configuration (PORT, DB, JWT, API Key)
│   ├── .env.example              # Sample environment template
│   ├── package.json              # Backend dependencies and start scripts
│   └── server.js                 # Express application entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js          # Centralized Axios instance with auth interceptor
│   │   ├── components/
│   │   │   ├── FavouriteCard.jsx # Saved city card with quick-view and delete
│   │   │   ├── Forecast.jsx      # 5-day forecast grid container
│   │   │   ├── ForecastCard.jsx  # Single day forecast card
│   │   │   ├── Loading.jsx       # Standardized loading indicator
│   │   │   ├── Navbar.jsx        # Navigation header with user info and logout
│   │   │   ├── ProtectedRoute.jsx# Route guard redirecting guests to /login
│   │   │   ├── SearchBar.jsx     # City search input and submission button
│   │   │   ├── UnitToggle.jsx    # Metric (°C) vs Imperial (°F) toggle switch
│   │   │   ├── WeatherCard.jsx   # Primary weather card with metrics and favorite button
│   │   │   └── WeatherDetails.jsx# Grid showing humidity, wind, pressure, visibility, etc.
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication context & persistent local session
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx     # Main weather dashboard page
│   │   │   ├── Favourites.jsx    # User saved cities management page
│   │   │   ├── Login.jsx         # Sign-in page
│   │   │   ├── Register.jsx      # Account creation page
│   │   │   └── NotFound.jsx      # 404 error page
│   │   ├── App.jsx               # React Router routes setup
│   │   ├── index.css             # Light theme design system and responsive styles
│   │   └── main.jsx              # React DOM mounting
│   ├── index.html                # Application HTML with meta tags
│   ├── package.json              # Frontend dependencies and Vite scripts
│   └── vite.config.js            # Vite configuration
│
├── Postman_Collection.json       # Complete Postman test collection
├── .gitignore                    # Git ignore for node_modules, .env, and dist
└── README.md                     # Experiment report and documentation
```

---

## 6. Database Schema Design

### 6.1 User Model (`User.js`)

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto-generated | Primary Key |
| `name` | String | Required, Trim | Full name of the user |
| `email` | String | Required, Unique, Lowercase | User email address for authentication |
| `password` | String | Required, minlength: 6, `select: false` | Salted bcrypt hash |
| `createdAt` | Date | Auto-timestamp | Account registration timestamp |

### 6.2 FavouriteCity Model (`FavouriteCity.js`)

| Field | Type | Attributes | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto-generated | Primary Key |
| `user` | ObjectId | Ref: `'User'`, Required | Foreign key pointing to `User._id` |
| `cityName` | String | Required, Trim | Name of saved city |
| `country` | String | Trim, Optional | Country code / name |
| `state` | String | Trim, Optional | State or province |
| `latitude` | Number | Optional | Geographic latitude coordinate |
| `longitude`| Number | Optional | Geographic longitude coordinate |
| `createdAt` | Date | Auto-timestamp | Date city was favorited |

> **Compound Index:** `{ user: 1, cityName: 1 }` guarantees that a single user cannot accidentally save duplicate entries for the same city, while multiple users can independently favourite the same city.

---

## 7. REST API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/auth/register` | No | Register a new user |
| `POST` | `/auth/login` | No | Authenticate user and receive JWT token |
| `GET` | `/auth/me` | Yes (`Bearer <token>`) | Retrieve authenticated user profile |
| `GET` | `/weather?city={city}&unit={unit}` | No | Fetch real-time weather for a city |
| `GET` | `/weather/forecast?city={city}&unit={unit}`| No | Fetch 5-day weather forecast |
| `GET` | `/favourites` | Yes (`Bearer <token>`) | Get logged-in user's favourite cities |
| `POST` | `/favourites` | Yes (`Bearer <token>`) | Add a new city to favourites |
| `DELETE`| `/favourites/:id` | Yes (`Bearer <token>`) | Delete a favourite city (ownership verified) |
| `PUT` | `/favourites/:id` | Yes (`Bearer <token>`) | Update favourite city metadata |

### Sample API Requests & Responses

#### 1. User Registration
- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "Parv Patel",
    "email": "parv@example.com",
    "password": "password123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "_id": "6abe9459206236248c0c67f2",
        "name": "Parv Patel",
        "email": "parv@example.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

#### 2. Get Current Weather
- **Endpoint:** `GET /api/weather?city=Ahmedabad&unit=metric`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Weather fetched successfully",
    "data": {
      "city": "Ahmedabad",
      "country": "IN",
      "coordinates": { "lat": 23.0225, "lon": 72.5714 },
      "temperature": 28,
      "feelsLike": 29,
      "tempMin": 28,
      "tempMax": 28,
      "humidity": 45,
      "pressure": 1012,
      "visibility": "6.0",
      "windSpeed": 4,
      "weatherDescription": "Clear sky",
      "weatherMain": "Clear",
      "weatherIcon": "01d",
      "weatherIconUrl": "https://openweathermap.org/img/wn/01d@2x.png",
      "sunrise": "06:32",
      "sunset": "18:25",
      "unit": "metric",
      "tempUnit": "°C",
      "windUnit": "m/s"
    }
  }
  ```

#### 3. Error Response (City Not Found)
- **Endpoint:** `GET /api/weather?city=NonExistentPlace99`
- **Response (404 Not Found):**
  ```json
  {
    "success": false,
    "message": "City 'NonExistentPlace99' not found. Please check the spelling."
  }
  ```

---

## 8. OpenWeatherMap Integration & Security

1. **Backend Proxy Pattern:** All requests to OpenWeatherMap are performed strictly on the Node.js server. The frontend client communicates only with our Express API routes.
2. **API Key Confidentiality:** The API key `OPENWEATHER_API_KEY` is loaded securely via `dotenv` from `backend/.env`. It is never included in frontend JavaScript bundles or HTML.
3. **Data Transformation:** The backend normalizes the OpenWeatherMap 40-step 3-hour forecast into a concise 5-day daily forecast format before sending it to the client.

### How to Obtain an OpenWeatherMap API Key:
1. Visit [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a free account.
3. Navigate to **API Keys** section in your profile.
4. Copy your API key and paste it into `backend/.env`:
   ```env
   OPENWEATHER_API_KEY=your_copied_api_key
   ```

---

## 9. How to Install and Run Locally

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- MongoDB Server running locally on port 27017 or a MongoDB Atlas URI

### Step 1: Clone or Navigate to the Workspace
```bash
cd "Wather app"
```

### Step 2: Configure Backend Environment Variables
```bash
cd backend
cp .env.example .env
```
Edit `.env` and verify your settings:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/weather_dashboard
JWT_SECRET=supersecret_weather_dashboard_jwt_key_2026
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

### Step 3: Install Backend Dependencies & Start Server
```bash
# In the backend directory
npm install
npm run dev
```
*The server will start at `http://localhost:5000` after establishing a successful MongoDB connection.*

### Step 4: Install Frontend Dependencies & Start Client
Open a second terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The frontend client will start at `http://localhost:5173`.*

---

## 10. Postman Testing Guide

A complete, pre-configured collection is included in the project root: `Postman_Collection.json`.

### How to Import and Test:
1. Open **Postman**.
2. Click **Import** (top left).
3. Select `Postman_Collection.json` from the project directory.
4. Run requests in sequential order:
   1. `1.1 Register User` – Registers a test student account.
   2. `1.2 Login User` – Returns JWT token and automatically saves it in the collection's `{{authToken}}` variable.
   3. `1.3 Get Current User Profile` – Validates JWT authorization.
   4. `2.1 Get Current Weather (Metric)` – Tests weather lookup in Celsius.
   5. `2.2 Get Current Weather (Imperial)` – Tests weather lookup in Fahrenheit.
   6. `2.3 Get 5-Day Forecast` – Tests forecast data transformation.
   7. `2.4 Test Invalid City Name` – Validates 404 error response handling.
   8. `2.5 Test Empty City Name` – Validates 400 validation response.
   9. `3.1 Get All Favourites` – Reads user favourites.
   10. `3.2 Add Favourite City` – Creates a persistent favourite in MongoDB.
   11. `3.4 Delete Favourite City` – Removes the favourite.
   12. `3.5 Test Unauthorized Request` – Verifies route protection returns 401.

---

## 11. Screenshots Section (For College Lab Submission)

*(Insert lab practical demonstration screenshots below)*

1. **Dashboard Home (Current Weather & 5-Day Forecast for Ahmedabad):**
   *(Attach screenshot of current weather card, temperature, humidity, wind, pressure, visibility, and 5-day forecast cards)*

2. **Unit Toggle Action (°C vs °F):**
   *(Attach screenshot demonstrating temperature and wind speed values updating upon toggling)*

3. **User Authentication (Sign In & Sign Up):**
   *(Attach screenshot of login and registration form with validation)*

4. **Favourites Management:**
   *(Attach screenshot showing saved favourite cities list and the favourite star toggle)*

5. **Postman API Test Results:**
   *(Attach screenshot of Postman runner showing 200 OK responses)*

---

## 12. Viva-Voce Questions & Concepts

1. **Why is the OpenWeatherMap API called through our Express backend instead of directly from React?**  
   *Answer:* Security and Architecture. Calling third-party APIs directly from the browser exposes private API keys in client-side network traffic. The backend proxy keeps secret credentials safe, prevents rate-limit abuse, normalizes external payloads, and enforces server-side caching or validation.

2. **How does JWT authentication work in this application?**  
   *Answer:* When the user logs in with valid credentials, the server signs a JSON Web Token containing the user's ID using a private secret (`JWT_SECRET`). The client stores this token and sends it in the `Authorization: Bearer <token>` header with subsequent protected requests. The `protect` middleware verifies the token signature on the server before granting access.

3. **How is data isolation maintained between users for favourite cities?**  
   *Answer:* In MongoDB, every `FavouriteCity` document stores an ObjectId reference (`user`) pointing to the owning `User`. When a user requests or deletes favourites, the backend queries strictly against `req.user._id`, preventing any user from modifying or querying records belonging to another student or user.

4. **What is the purpose of Axios interceptors in `frontend/src/api/axios.js`?**  
   *Answer:* The request interceptor automatically attaches the user's JWT Bearer token to every HTTP request if present in `localStorage`. The response interceptor centrally catches 401 Unauthorized errors and logs the user out if their session has expired.

---

## 13. Conclusion

Experiment No. 10 – **Weather Dashboard** was successfully designed, developed, and evaluated. The application fulfills all functional, architectural, and visual requirements specified in the college laboratory manual. It demonstrates best practices in RESTful API development, MERN stack integration, secure credential handling, component-based frontend architecture, responsive design, and automated API testing.
# Wather-Fatch-WAD-PROJECT
