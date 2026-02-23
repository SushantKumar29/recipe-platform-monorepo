## Recipe Platform Monorepo

This repository contains the full-stack Recipe Sharing Platform, combining both the backend API and frontend application into a single monorepo. The backend is built with Node.js, Express, and TypeScript, while the frontend uses React with Vite. PostgreSQL is used as the database. The project supports development with local tooling and production deployment using Docker Compose.

## Tech Stack

Backend

- Node.js – JavaScript runtime
- Express.js – Web framework
- TypeScript – Static typing
- PostgreSQL – Relational database
- Prisma / node-postgres – Database access (adjust based on actual ORM)
- Cloudinary – Image hosting
- JWT – Authentication
- bcrypt – Password hashing
- Upstash Redis – Rate limiting
- Swagger – API documentation

Frontend

- Vite + React – Build tool and UI library
- TypeScript – Static typing
- React Router – Client-side routing
- Redux Toolkit – State management
- Tailwind CSS – Styling
- shadcn/ui – UI components
- Axios – API client
- Lucide Icons – Icons

## Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (v18 or later)
- npm or yarn
- Docker and Docker Compose (for production mode)
- PostgreSQL (for local development, or use Docker)

## Environment Variables

Create a .env file in the root of the monorepo (or separately in each package) with the following variables. Adjust the values according to your setup.

Backend Variables

- PORT=3000
- NODE_ENV=development
- PG_DATABASE_URL=postgresql://user:password@localhost:5432/recipe_platform_db
- ACCESS_TOKEN=your_jwt_secret_key
- UPSTASH_REDIS_REST_URL=your_upstash_redis_url
- UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
- CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
- CLOUDINARY_API_KEY=your_cloudinary_api_key
- CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Frontend Variables (Development)

- VITE_API_BASE_URL=http://localhost:3000/api/v1
  In production, the frontend is served by the backend on the same port, so the API base URL will be relative (e.g., /api/v1).

## Development Mode

In development, the frontend and backend run separately for hot reload and easier debugging.

1. Start PostgreSQL Locally
   Ensure PostgreSQL is running and a database named recipe_platform (or as per PG_DATABASE_URL) is created.

2. Install Dependencies
   From the monorepo root, install dependencies for both packages:

   ```
   npm run build
   ```

# or setup backend and frontend individually

- Backend

  ```
  cd backend && npm install && npx prisma generate && npx prisma migrate deploy && npm run dev
  ```

The backend API will be available at http://localhost:3000.

- Frontend

  ```
  cd frontend && npm install && npm run dev
  ```

The Vite dev server will start at http://localhost:5173. It proxies API requests to the backend (via VITE_API_BASE_URL).

## Production Mode with Docker Compose

In production, the entire stack runs in Docker containers. The backend serves the built frontend static files on the same port, eliminating the need for a separate frontend server. The PostgreSQL database runs in its own container.

# Docker Compose Services

- backend – Node.js application serving both the API and the frontend static files.
- postgres – PostgreSQL database (pulled from Docker Hub).

1. ENV changes
   Make sure your .env file is updated with production values.
   - NODE_ENV=production
   - PG_DATABASE_URL=postgresql://user:password@postgres:5432/recipe_platform_db

2. Build and Run
   Make sure Docker and Docker Compose are installed. Then execute:

   ```
   docker compose build --no-cache
   docker compose up # or docker compose up -d
   ```

This command:

- Builds the backend image (which includes the pre-built frontend).
- Pulls the PostgreSQL image.
- Starts both containers.

The application will be available at http://localhost:3000.

3. Stopping the Containers

   ```
   docker-compose down
   ```

   To also remove volumes (database data):

   ```
   docker-compose down -v
   ```

## Notes

- Ensure that the backend’s ACCESS_TOKEN is a strong secret in production.
- Redis (Upstash) is used for rate limiting – configure the URL and token.
- Cloudinary credentials are required for image uploads.
- For local development without Docker, PostgreSQL must be installed and running.
- In production, the backend serves the frontend static files; make sure the frontend build is placed in the correct directory (e.g., backend/public).

Happy cooking! 🍳
