# SpendWise – Expense Tracker

A minimal, production-ready full-stack expense tracker built as a hiring assignment demonstration.

## Tech Stack

| Layer     | Technology                        |
| --------- | --------------------------------- |
| Frontend  | React 19 + Vite 7 + Tailwind v4  |
| Backend   | Node.js + Express 4               |
| Database  | MongoDB + Mongoose                |
| HTTP      | Axios                             |

## Folder Structure

```
SpendWise/
├── server/                  # Backend API
│   ├── src/
│   │   ├── config/db.js     # MongoDB connection
│   │   ├── controllers/     # HTTP request handlers
│   │   ├── middleware/       # Error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express route definitions
│   │   ├── services/        # Business logic layer
│   │   ├── utils/           # Constants & helpers
│   │   └── index.js         # Entry point
│   ├── .env
│   └── package.json
├── client/                  # Frontend SPA
│   ├── src/
│   │   ├── components/      # React UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API integration (Axios)
│   │   ├── App.jsx          # Root component
│   │   ├── main.jsx         # Vite entry point
│   │   └── index.css        # Tailwind + design tokens
│   ├── .env
│   └── package.json
├── .gitignore
└── README.md
```

## Setup

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)

### 1. Backend

```bash
cd server
cp .env.example .env        # Edit MONGO_URI if using Atlas
npm install
npm run dev                  # Starts on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
npm run dev                  # Starts on http://localhost:5173
```

## API Endpoints

| Method | Endpoint          | Description                             |
| ------ | ----------------- | --------------------------------------- |
| POST   | `/api/expenses`   | Create expense (idempotent)             |
| GET    | `/api/expenses`   | List expenses (`?category=`, `?sort=`)  |
| GET    | `/api/categories` | List valid categories                   |
| GET    | `/api/health`     | Health check                            |

## Design Decisions

### 1. Idempotency (Duplicate Prevention)
The client generates a unique UUID (`idempotencyKey`) for every form submission. The backend stores this key with a **unique sparse index** in MongoDB. If a retry/refresh sends the same key, the backend returns the existing expense (HTTP 200) instead of creating a duplicate (HTTP 201). This is safer than client-side debouncing alone because it survives network retries and browser refreshes.

### 2. Money Handling (Cents)
Amounts are stored as **integers in cents** (e.g., `$12.50` → `1250`). This avoids floating-point rounding errors inherent in JavaScript's `Number` type. The frontend converts dollars ↔ cents at the boundary.

### 3. Controller → Service → Model
A thin three-layer architecture:
- **Controllers** handle HTTP (parse request, format response)
- **Services** contain business logic (idempotency check, query building)
- **Models** define the data schema

This gives clean separation without the overhead of enterprise patterns like repositories, DTOs, or dependency injection.

### 4. Validation Strategy
Uses `express-validator` for request validation in the controller layer, combined with Mongoose schema-level validation as a safety net. This provides both user-friendly error messages (from express-validator) and data integrity guarantees (from Mongoose).

### 5. Frontend State Management
A single custom hook (`useExpenses`) centralizes all expense state, API calls, and error handling. Components receive data and callbacks via props, keeping them purely presentational and reusable.

### 6. Tailwind CSS v4
Uses Tailwind's new CSS-first configuration (no `tailwind.config.js`). Custom design tokens are defined directly in `index.css` using `@theme`, providing a cohesive dark theme with glassmorphism effects.

## Environment Variables

### Server (`server/.env`)
| Variable     | Default                              | Description                 |
| ------------ | ------------------------------------ | --------------------------- |
| PORT         | 5000                                 | Server port                 |
| MONGO_URI    | mongodb://localhost:27017/spendwise  | MongoDB connection string   |
| CLIENT_URL   | http://localhost:5173                 | CORS allowed origin         |

### Client (`client/.env`)
| Variable       | Default                     | Description      |
| -------------- | --------------------------- | ---------------- |
| VITE_API_URL   | http://localhost:5000/api   | Backend API URL  |

## License

ISC
