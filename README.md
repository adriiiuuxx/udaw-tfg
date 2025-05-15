# 🍽️ UDAW-EATS

![UDAW-EATS Logo](udaw-eats-frontend/public/assets/favicon.png)

## 📖 Introduction

UDAW-EATS is a comprehensive food delivery application designed to celebrate and promote Galician culture and gastronomy. This platform connects local Galician restaurants with customers, making authentic regional cuisine accessible to everyone. 

The application features a user-friendly interface for customers to browse restaurants, explore menus, and place orders, while providing restaurant owners with powerful tools to manage their menus, track orders, and grow their business.

## ✨ Features

- 🔐 **User Authentication**: Secure JWT-based authentication system
- 🔍 **Restaurant Discovery**: Browse and search for restaurants
- 📋 **Menu Management**: Restaurant owners can create and manage menu items
- 📱 **Order Tracking**: Real-time order status updates
- 🥕 **Ingredient Management**: Detailed ingredient tracking for food items
- 💻 **Responsive Design**: Works on desktop and mobile devices
- 📊 **Admin Dashboard**: Comprehensive tools for restaurant management

## 🛠️ Technology Stack

### 🧮 Backend

- ☕ Java 21
- 🍃 Spring Boot
- 🔒 Spring Security with JWT
- 🗃️ Spring Data JPA
- 🐬 MySQL Database
- 🏗️ Maven

### 🖥️ Frontend

- ⚛️ React 18
- 🔄 Redux for state management
- 🎨 Material-UI components
- 📝 Formik and Yup for form validation
- ⚡ Vite as build tool

## 🚀 Installation Options

UDAW-Eats can be installed and run in two different ways using Docker:

### 🐳 Option 1: Docker Compose Setup

Build and run the application using Docker Compose from the source code.

**Best for**: Testing in an isolated environment that mirrors production.

**Prerequisites**:
- 🐳 Docker and Docker Compose
- 📂 Git

### 🚢 Option 2: Docker Hub Images

Run the application using pre-built Docker images from Docker Hub.

**Best for**: Quick deployment without building anything locally.

**Prerequisites**:
- 🐳 Docker and Docker Compose

> **Note**: For local development setup without Docker (running directly on your machine), please check the commit before this one. The previous version contains detailed instructions for setting up the development environment with Java, Node.js, and MySQL installed locally.

📚 **For detailed installation instructions for both options, see [INSTALLATION-GUIDE.md](INSTALLATION-GUIDE.md)**

## 🚀 Docker Setup Instructions

> **Note**: The detailed setup instructions below are for the local development environment. For the current Docker-based approach, please refer to the [INSTALLATION-GUIDE.md](INSTALLATION-GUIDE.md) file.
>
> If you want to run the application directly on your machine without Docker, please check the commit before this one, which contains the complete local development setup instructions.

### Docker Prerequisites

- 🐳 Docker and Docker Compose
- 📂 Git (if cloning the repository)

### Option 1: Building Docker Containers Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/adriiiuuxx/udaw-tfg.git
   cd udaw-tfg
   ```

2. **Create .env file**

   Create a file named `.env` with the following content:
   ```
   MYSQL_ROOT_PASSWORD=9999
   MYSQL_DATABASE=udaw_eats
   SPRING_DATASOURCE_URL=jdbc:mysql://mysql-udaw:3306/udaw_eats
   SPRING_DATASOURCE_USERNAME=root
   SPRING_DATASOURCE_PASSWORD=9999
   STRIPE_API_KEY=sk_test_your_stripe_api_key
   ```

3. **Build and start the containers**

   ```bash
   docker-compose up -d
   ```

4. **Import the database data**

   ```bash
   docker exec -i mysql-udaw mysql -uroot -p9999 udaw_eats < udaw_eats_data.sql
   ```

### Option 2: Using Pre-built Docker Hub Images

1. **Create a project directory**

   ```bash
   mkdir udaw-eats
   cd udaw-eats
   ```

2. **Download the docker-compose.dist.yml file**

3. **Rename and run**

   ```bash
   mv docker-compose.dist.yml docker-compose.yml
   docker-compose pull
   docker-compose up -d
   ```

4. **Import the database data**

   ```bash
   docker exec -i mysql-udaw mysql -uroot -p9999 udaw_eats < udaw_eats_data.sql
   ```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:8080

## 🗄️ Key Entities

### 👤 User

- Manages user accounts with different roles (CUSTOMER, RESTAURANT_OWNER, ADMIN)
- Stores user profile information and authentication details

### 🍴 Restaurant

- Stores restaurant details including name, description, cuisine type, and contact information
- Manages restaurant menu items, categories, and orders

### 🍲 Food

- Represents menu items with details like name, description, price, and availability
- Links to categories and ingredients

### 🛒 Order

- Tracks customer orders with status (PENDING, OUT_FOR_DELIVERY, DELIVERED, COMPLETED)
- Maintains relationships with customers, restaurants, and order items

## 🤝 Contributing

Contributions to UDAW-EATS are welcome! Please feel free to submit pull requests or open issues to improve the application.

## 👨‍💻 Author

- 👨‍💻 **Adrián López** - [GitHub](https://github.com/adriiiuuxx)

## 🙏 Acknowledgments

- 🍲 Special thanks to the rich culinary traditions of Galicia that inspired this project
- 👥 All the contributors who have invested their time and expertise

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.