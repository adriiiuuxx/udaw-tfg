# 🍽️ UDAW-EATS

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

## 🚀 Setup Instructions

### 📋 Prerequisites
- ☕ Java 21 or higher
- 📦 Node.js 16 or higher
- 🐬 MySQL 8.0 or higher
- 🏗️ Maven 3.6 or higher
- 📂 Git

### ⚙️ Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/udaw-tfg.git
   cd udaw-tfg
   ```

2. **Configure MySQL Database**
   - Create a MySQL database named `udaw_eats`
   ```sql
   CREATE DATABASE udaw_eats;
   ```
   - Ensure your MySQL server is running on port 3306
   - The application uses the following database credentials (as specified in `application.properties`):
     - Username: `root`
     - Password: `9999`
   - If you need to use different credentials, update the `application.properties` file

3. **Build and Run the Backend**

   ```bash
   cd udaw-eats-backend
   mvn clean install
   mvn spring-boot:run
   ```
   - The backend server will start on port 8080
   - API will be accessible at http://localhost:8080

### 🖥️ Frontend Setup

1. **Navigate to the frontend directory**

   ```bash
   cd ../udaw-eats-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```
   - The frontend development server will start on port 5173
   - Access the application at http://localhost:5173

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
