# CorperCompass 🧭

> Your all-in-one relocation guide for a smooth NYSC transition.

CorperCompass helps NYSC corpers navigate their new state — find safe areas, browse lodges, learn local culture, track your pre-arrival checklist, and estimate your monthly budget. No bookings, no payments. Just reliable information so you can focus on your service year.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Authentication** — JWT in HTTP-only cookies with role-based access (user/admin)
- **Area Intelligence** — Browse states and areas with safety ratings, rent ranges, transport and lifestyle notes
- **Lodge Directory** — Admin-managed lodge listings with prices, amenities and contacts
- **Cultural Onboarding** — Local languages, festivals, cuisines and etiquette by state
- **Relocation Checklist** — Track progress through pre- and post-arrival tasks
- **Budget Estimator** — Calculate estimated monthly expenses with buffer and risk alerts
- **Interactive Map** — Area and lodge markers with heatmap overlays (Google Maps or Leaflet)
- **Messaging & Negotiations** — Foundation for corper-to-corper communication
- **Admin Panel** — Full CRUD for areas, lodges and cultural content

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (v18+) |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + HTTP-only cookies |
| Password Hashing | bcrypt (salt rounds: 12) |
| Validation | express-validator |
| Security | helmet, cors, express-rate-limit, cookie-parser |
| Testing | Jest + Supertest |

---

## Project Structure

```
corpercompass-backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── areaController.js
│   │   ├── lodgeController.js
│   │   ├── checklistController.js
│   │   ├── cultureController.js
│   │   ├── budgetController.js
│   │   ├── messageController.js
│   │   ├── negotiationController.js
│   │   └── mapController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── validationMiddleware.js
│   │   ├── rateLimitMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Area.js
│   │   ├── Lodge.js
│   │   ├── JourneySection.js
│   │   ├── ChecklistItem.js
│   │   ├── UserChecklistProgress.js
│   │   ├── CulturalContent.js
│   │   ├── Message.js
│   │   ├── Negotiation.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── areaRoutes.js
│   │   ├── lodgeRoutes.js
│   │   ├── checklistRoutes.js
│   │   ├── cultureRoutes.js
│   │   ├── budgetRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── negotiationRoutes.js
│   │   ├── mapRoutes.js
│   │   └── adminRoutes.js
│   ├── services/
│   │   └── budgetService.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── app.js
│   └── server.js
├── tests/
│   ├── auth.test.js
│   └── budget.test.js
├── .env
├── .gitignore
├── package.json
├── Dockerfile
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/copper-compass/CorperCompass.git
cd CorperCompass/backend

# Install dependencies
npm install

# Copy environment file and fill in values
cp .env.example .env
```

### Running the server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

API will be available at `http://localhost:5000/api`

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/corpercompass
JWT_SECRET=your_strong_secret_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5500
```

For testing, optionally set:
```env
MONGO_URI_TEST=mongodb://localhost:27017/corpercompass_test
```

---

## API Reference

All routes are prefixed with `/api`.

### Auth

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login and receive JWT cookie | Public |
| GET | `/auth/me` | Get current authenticated user | User |

### Users

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/users/profile` | Get user profile | User |
| PUT | `/users/profile` | Update profile (posted state, phone, preferences) | User |

### Areas

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/areas` | List all areas | Public |
| GET | `/areas/:id` | Get a specific area | Public |
| POST | `/areas` | Create area(s) — supports single object or array | Admin |
| PUT | `/areas/:id` | Update area | Admin |
| DELETE | `/areas/:id` | Delete area | Admin |

### Lodges

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/lodges` | List all lodges | Public |
| GET | `/lodges/:id` | Get a specific lodge | Public |
| POST | `/lodges` | Create lodge | Admin |
| PUT | `/lodges/:id` | Update lodge | Admin |
| DELETE | `/lodges/:id` | Delete lodge | Admin |

### Checklist

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/checklist/journey` | Get journey sections and checklist items | User |
| GET | `/checklist/progress` | Get user's checklist progress | User |
| PATCH | `/checklist/:itemId` | Toggle checklist item completion | User |
| POST | `/checklist/sections` | Create journey section | Admin |
| POST | `/checklist/items` | Create checklist item | Admin |

### Cultural Content

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/culture` | Get all cultural content | Public |
| GET | `/culture/:id` | Get specific cultural content | Public |
| POST | `/culture` | Create cultural content | Admin |
| PUT | `/culture/:id` | Update cultural content | Admin |
| DELETE | `/culture/:id` | Delete cultural content | Admin |

### Budget

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/budget` | Estimate monthly budget | Public |

### Map

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/map/markers` | Get area and lodge map markers | Public |
| GET | `/map/heatmap` | Get heatmap data (weighted by rent) | Public |

### Messages

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/messages` | Send a message | User |
| GET | `/messages` | Get all messages for current user | User |
| GET | `/messages/conversation/:userId` | Get conversation with a user | User |
| PATCH | `/messages/:id/read` | Mark message as read | User |

### Negotiations

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/negotiations` | Start a negotiation | User |
| GET | `/negotiations` | Get current user's negotiations | User |
| GET | `/negotiations/:id` | Get a specific negotiation | User |
| PUT | `/negotiations/:id` | Update negotiation | User |
| POST | `/negotiations/:id/messages` | Add message to negotiation | User |

### Admin

All `/admin` routes require authentication and admin role.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/areas` | Create area |
| PUT | `/admin/areas/:id` | Update area |
| DELETE | `/admin/areas/:id` | Delete area |
| POST | `/admin/lodges` | Create lodge |
| PUT | `/admin/lodges/:id` | Update lodge |
| DELETE | `/admin/lodges/:id` | Delete lodge |
| POST | `/admin/culture` | Create cultural content |
| PUT | `/admin/culture/:id` | Update cultural content |
| DELETE | `/admin/culture/:id` | Delete cultural content |

---

## Testing

```bash
cd backend
npm test
```

Tests use Jest and Supertest. Make sure MongoDB is running locally or set `MONGO_URI_TEST` in your `.env`.

---

## Deployment

### Railway (Recommended)

1. Push your code to GitHub
2. Create a new project on [Railway](https://railway.app)
3. Connect your GitHub repo
4. Add all environment variables from the section above
5. Railway auto-detects Node.js and deploys

### Docker

```bash
docker-compose up -d
```

Make sure your `.env` is configured before running.

### Other Platforms (Render, Heroku)

Set `NODE_ENV=production` and configure all environment variables on the platform. Use a MongoDB Atlas URI for the database.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a pull request against `sandbox`

Please follow conventional commit messages and ensure all tests pass before opening a PR.

---

## License

MIT