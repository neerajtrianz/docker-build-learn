# docker-componse-project

A simple Express.js REST API for managing items, using PostgreSQL and Docker.

## Features

- Health check endpoint (`/health`)
- CRUD operations for items (`/items`)
- PostgreSQL connection via [Neon](https://neon.tech/)
- Dockerized for easy deployment

## Endpoints

- `GET /health` — Check API and DB status
- `GET /items` — List all items
- `GET /items/:id` — Get item by ID
- `POST /items` — Create new item (`{ name, done }`)
- `PUT /items/:id` — Update item (`{ name, done }`)
- `DELETE /items/:id` — Delete item

## Setup

## Installation

### Manual (Local)

1. **Clone the repository:**
   ```sh
   git clone https://github.com/neerajtrianz/docker-build-learn.git
   cd docker-build-learn
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the project root.
   - Add your PostgreSQL connection string and desired port:
     ```
     PORT=3000
     DATABASE_URL=your_postgres_connection_url
     ```

4. **Start the server:**
   ```sh
   npm start
   ```

### Using Docker

1. **Build the Docker image:**
   ```sh
   docker build -t docker-compose-project .
   ```

2. **Run the container:**
   ```sh
   docker run --env-file .env -p 3000:3000 docker-compose-project
   ```

   - Make sure your `.env` file is present and contains the required variables.

**Note:**  
The Dockerfile installs only production dependencies and exposes port

## Database Schema

Run this SQL to create the table:
```sql
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
