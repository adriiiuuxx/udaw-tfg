# UDAW-Eats Installation Guide

This guide provides two different methods to run the UDAW-Eats application using Docker:

1. **Docker Compose Setup** - Building and running containers locally
2. **Docker Hub Images** - Using pre-built Docker images

Choose the method that best suits your needs and environment.

> **Note**: For local development setup without Docker (running directly on your machine), please check the commit before this one. The previous version contains detailed instructions for setting up the development environment with Java, Node.js, and MySQL installed locally.

## Option 1: Docker Compose Setup

This option uses Docker Compose to build and run the application locally.

### Prerequisites

- Docker and Docker Compose
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/adriiiuuxx/udaw-tfg.git
cd udaw-tfg
```

### Step 2: Create .env File

Create a `.env` file in the root directory with the following content:

```
# MySQL
MYSQL_ROOT_PASSWORD=9999
MYSQL_DATABASE=udaw_eats
MYSQL_USER=root
MYSQL_PASSWORD=9999

# Backend (Spring)
SPRING_DATASOURCE_URL=jdbc:mysql://mysql-udaw:3306/udaw_eats
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=9999
STRIPE_API_KEY=sk_test_your_stripe_api_key
```

### Step 3: Build and Start the Containers

```bash
docker-compose up -d
```

### Step 4: Import the Database Data

```bash
docker exec -i mysql-udaw mysql -uroot -p9999 udaw_eats < udaw_eats_data.sql
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:8080

## Option 2: Docker Hub Images

This option uses pre-built Docker images from Docker Hub, which is the easiest way to run the application.

### Prerequisites

- Docker and Docker Compose

### Step 1: Create a Project Directory

```bash
mkdir udaw-eats
cd udaw-eats
```

### Step 2: Create docker-compose.yml

Create a file named `docker-compose.yml` with the following content:

```yaml
version: '3.8'

services:
  mysql:
    image: adriiiuuxx/udaw-eats-mysql:latest
    container_name: mysql-udaw
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD:-9999}
      MYSQL_DATABASE: ${MYSQL_DATABASE:-udaw_eats}
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - udaw-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p${MYSQL_ROOT_PASSWORD:-9999}"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: adriiiuuxx/udaw-eats-backend:latest
    container_name: backend-udaw
    depends_on:
      mysql:
        condition: service_healthy
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql-udaw:3306/udaw_eats
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: ${MYSQL_ROOT_PASSWORD:-9999}
      STRIPE_API_KEY: ${STRIPE_API_KEY:-sk_test_your_stripe_api_key}
      FRONTEND_BASE_URL: http://udaweats.es
    ports:
      - "8080:8080"
    networks:
      - udaw-network

  frontend:
    image: adriiiuuxx/udaw-eats-frontend:latest
    container_name: frontend-udaw
    depends_on:
      - backend
    ports:
      - "80:80"
    networks:
      - udaw-network

networks:
  udaw-network:
    driver: bridge

volumes:
  mysql-data:
```

### Step 3: Create .env File (Optional)

Create a `.env` file with the following content:

```
MYSQL_ROOT_PASSWORD=9999
MYSQL_DATABASE=udaw_eats
```

### Step 4: Pull and Start the Containers

```bash
docker-compose pull
docker-compose up -d
```

### Step 5: Download and Import the Database Data

Download the `udaw_eats_data.sql` file from the repository and import it:

```bash
# Wait for MySQL to start (about 30 seconds)
docker exec -i mysql-udaw mysql -uroot -p9999 udaw_eats < udaw_eats_data.sql
```

The application will be available at:
- Frontend: http://udaweats.es
- Backend API: http://localhost:8080

## Using Custom Domain (udaweats.es) for Local Development

If you want to access the application using `udaweats.es` instead of `localhost`, follow these steps:

### 1. Modify your hosts file

#### On Windows:
1. Open Notepad as Administrator
2. Open the file: `C:\Windows\System32\drivers\etc\hosts`
3. Add this line: `127.0.0.1  udaweats.es`
4. Save the file

#### On Linux/Mac:
```bash
sudo nano /etc/hosts
# Add this line: 127.0.0.1 udaweats.es
# Save with Ctrl+O, then Exit with Ctrl+X
```

### 2. Update the docker-compose.yml file

Change the `FRONTEND_BASE_URL` environment variable in the backend service:

```yaml
backend:
  # other configuration...
  environment:
    # other environment variables...
    FRONTEND_BASE_URL: http://udaweats.es
```

### 3. Restart the containers

```bash
docker-compose down
docker-compose up -d
```

### 4. Access the application

Now you can access the application at http://udaweats.es instead of http://localhost.

**Note:** This modification only works on your local machine. Other users will need to make the same changes to access the application using the custom domain.

## Troubleshooting

### Port Conflicts

If ports 80 or 8080 are already in use on your system, modify the docker-compose.yml file to use different ports:
```yaml
ports:
  - "8081:8080"  # Change 8081 to any available port for backend
```
```yaml
ports:
  - "8000:80"    # Change 8000 to any available port for frontend
```

### Database Connection Issues

If the backend can't connect to the database, ensure:
1. The MySQL container is running: `docker ps`
2. The database was imported correctly
3. The environment variables in docker-compose.yml are correct
