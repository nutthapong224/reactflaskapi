# Full-Stack Application with Docker Compose

A containerized full-stack application featuring React frontend, Flask backend, MongoDB database, and Cloudflare tunnel for secure external access.

## 🏗️ Architecture

- **Frontend**: React application served on port 80
- **Backend**: Flask API running on port 8000
- **Database**: MongoDB 6.0 for data persistence
- **Tunnel**: Cloudflare tunnel for secure external access
- **Network**: Custom bridge network for inter-service communication

## 📋 Prerequisites

- Docker and Docker Compose installed
- Cloudflare account with tunnel token (for external access)
- Basic knowledge of Docker containers

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/nutthapong224/reactflaskapi
   cd reactflaskapi
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8000
   TUNNEL_TOKEN=your_cloudflare_tunnel_token_here
   MONGO_INITDB_DATABASE=flaskdb
   ```

3. **Start the application**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:8000
   - Health check: http://localhost:8000/api/items

## 📁 Project Structure

```
project/
├── docker-compose.yml
├── .env
├── frontend-react/
│   ├── Dockerfile
│   └── nginx.conf
├── backend/
│   ├── Dockerfile
│   └── ... (Flask app files)
└── mongo-init/
    └── ... (MongoDB initialization scripts)
```

## 🐳 Services Overview

### Frontend React (`frontend-react`)
- **Port**: 80
- **Build Context**: `./frontend-react`
- **https and reverse**: `./frontend-react/nginx.conf` make https in the file
- **Environment**: Uses `VITE_API_URL` from .env file
- **Dependencies**: Backend service

### Backend Flask (`backend`)
- **Port**: 8000
- **Build Context**: `./backend`
- **Container Name**: `flask_api`
- **Health Check**: Monitors `/api/items` endpoint
- **Dependencies**: MongoDB service

### MongoDB (`mongo_db`)
- **Image**: mongo:6.0
- **Container Name**: `mongo_db`
- **Database**: `flaskdb` (initialized automatically)
- **Volume**: Persistent storage with `mongo_data`
- **Initialization**: Scripts from `./mongo-init` directory

### Cloudflare Tunnel (`cloudflared`)
- **Image**: cloudflare/cloudflared:latest
- **Purpose**: Secure external access without port forwarding
- **Token**: Set via `TUNNEL_TOKEN` environment variable

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Frontend API endpoint URL | `http://localhost:8000` |
| `TUNNEL_TOKEN` | Cloudflare tunnel token | `your_tunnel_token_here` |
| `MONGO_INITDB_DATABASE` | MongoDB initial database name | `flaskdb` |

### Health Checks

The backend service includes a health check that:
- Tests the `/api/items` endpoint every 30 seconds
- Times out after 10 seconds
- Retries up to 3 times before marking as unhealthy

## 📝 Common Commands

### Start services
```bash
docker compose up -d --build
```

### View logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
```

### Stop services
```bash
docker compose down
```

### Rebuild and restart
```bash
docker compose down
docker compose up --build -d
```

### Check service status
```bash
docker compose ps
```

## 🔍 Troubleshooting

### Backend Health Check Failing
- Verify the Flask app is serving on `/api/items`
- Check if MongoDB connection is working
- Review backend logs: `docker-compose logs backend`

### Frontend Can't Connect to Backend
- Ensure `VITE_API_URL` points to correct backend URL
- Verify backend service is running and healthy
- Check network connectivity between containers

### MongoDB Connection Issues
- Confirm MongoDB container is running
- Check if initialization scripts executed properly
- Verify database credentials and connection string

### Cloudflare Tunnel Not Working
- Validate `TUNNEL_TOKEN` in .env file
- Check Cloudflare dashboard for tunnel status
- Review cloudflared logs: `docker-compose logs cloudflared`

## 🛠️ Development

### Local Development Setup
1. Ensure all services are running with `docker-compose up -d`
2. Frontend hot-reload should work automatically
3. Backend changes require container rebuild: `docker-compose up --build backend`

### Database Management
- MongoDB data persists in the `mongo_data` Docker volume
- Initialization scripts in `./mongo-init/` run only on first container creation
- To reset database: `docker-compose down -v` (⚠️ This deletes all data)

### Network Communication
All services communicate through the `flaskapi_network` bridge network, allowing:
- Frontend to call backend APIs
- Backend to connect to MongoDB
- Cloudflare tunnel to proxy requests

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Cloudflare Tunnel Setup](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

