# Movie Review App – Part 1 (Local Docker)

Single-command local setup for a 3‑tier app using Docker:
- Frontend: React + Vite (served by Nginx)
- Backend: Node.js + Express + MongoDB (Mongoose)
- Database: MongoDB (with Docker volume for data persistence)

## Ports
- Frontend (Nginx): http://localhost:8080
- Backend (API):    http://localhost:5000
- MongoDB:          localhost:27017

## Run (one command)
```bash
docker compose up --build
```
Then open: http://localhost:8080

## Stop
```bash
docker compose down
```
(Your DB data stays safe in the named Docker volume `mongodb_data`.)

## Clean DB data (optional)
```bash
docker compose down -v
```
This removes the volume and all MongoDB data.

## Health checks
- API health: `curl http://localhost:5000/api/health`
- List movies: `curl http://localhost:5000/api/movies`

## Folder Structure
```
movie-review-app-part1/
├─ docker-compose.yml
├─ README.md
├─ .gitignore
├─ backend/
│  ├─ Dockerfile
│  ├─ .dockerignore
│  ├─ .env
│  ├─ package.json
│  └─ src/
│     ├─ index.js
│     └─ models/
│        └─ Movie.js
├─ frontend/
│  ├─ Dockerfile
│  ├─ .dockerignore
│  ├─ .env
│  ├─ nginx.conf
│  ├─ package.json
│  ├─ vite.config.js
│  ├─ index.html
│  └─ src/
│     ├─ main.jsx
│     ├─ App.jsx
│     ├─ App.css
│     └─ api.js
└─ mongo-init/
   └─ README.txt (placeholder for future seed scripts)
```

## Notes
- CORS is configured in the backend to allow the frontend origin (`http://localhost:8080`).
- The backend auto-seeds two sample movies on first run if the collection is empty.
- Environment variables are wired through `.env` files and Docker Compose.
- This is **Part 1 only** (local Docker). No Jenkins/K8s/Terraform yet; we’ll add them in later parts.
