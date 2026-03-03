🚀 Linkly | Production-Ready URL Shortener
Linkly is a high-performance URL shortening platform built to demonstrate scalable system design. Unlike basic CRUD apps, Linkly implements Read-Through Caching with Redis and a strict Smart/Dumb component architecture to ensure the system remains fast and maintainable under load.

🛠️ Tech Stack
Frontend: React (Vite), Tailwind CSS, Context API.

Backend: Node.js, Express.js, JWT, Bcrypt.

Database: MongoDB Atlas (Persistent), Redis (Cache).

Infrastructure: Docker, Render (Backend), Netlify (Frontend).

🏗️ Architecture Spotlight: The "Smart/Dumb" Pattern
To keep the dashboard manageable as features scale, I separated the UI into two distinct layers:

Smart Containers (/pages): Components like DashboardPage.jsx handle all the "side effects." They fetch data from the API, manage loading/error states, and contain the business logic.

Presentational "Dumb" Components (/components): Components like LinkCard.jsx or StatsModal.jsx are purely functional. They receive data via props and emit events via callbacks.

The Benefit: This makes the UI 100% testable and decoupled from the backend. I can redesign the entire dashboard UI without touching a single line of API logic.

⚡ Performance: The Redirect Flow
To minimize latency during redirects, the system uses a Redis-first approach:

Request hits API: The system checks Redis for the shortId.

Cache Hit (O(1)): Returns the original URL instantly. A non-blocking analytics write is sent to MongoDB in the background.

Cache Miss: The system queries MongoDB, hydrates the Redis cache with a 1-hour TTL, and then redirects the user.

🏃 How to Run the App
1. Prerequisites
Node.js (v18+)

MongoDB Atlas account (or local MongoDB)

Redis instance (Local or Upstash)

2. Environment Setup
Create a .env file in the /server directory:

Code snippet
```
PORT=5000
MONGO_URI=your_mongodb_uri
REDIS_URL=your_redis_url
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
```
3. Installation & Execution
Bash
# Clone the repository
git clone https://github.com/yourusername/linkly.git

# Setup Backend
```
cd server
npm install
npm run dev
```

# Setup Frontend (in a new terminal)
```
cd client
npm install
npm run dev
```
The app will be live at http://localhost:5173.

📈 Future Roadmap
Rate Limiting: Implementing express-rate-limit for guest users.

Custom Slugs: Allowing authenticated users to define branded back-halves.

Batch Export: Exporting link analytics to CSV/JSON.
