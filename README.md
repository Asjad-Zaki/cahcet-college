# College Management System 🎓

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

<div align="center">
  <img src="https://user-images.githubusercontent.com/74038190/238353480-219bcc70-f5dc-466b-9a60-29653d8e8433.gif" alt="College Management System" width="400">
</div>

## 📑 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟 Overview

The College Management System is a comprehensive web application designed to modernize and streamline educational institution management. It provides an intuitive interface for managing student records, faculty information, assessments, and attendance tracking, all while ensuring a seamless user experience for all stakeholders.

## ✨ Features

### Core Functionality
- **🔐 Dual Authentication System**
  - Separate secure login portals for students and faculty
  - Role-based access control
  
- **📊 Assessment Management**
  - Track and display marks for CAT1, CAT2, and MODEL exams
  - Automated grade calculation
  - Progress tracking and reporting
  
- **📋 Attendance Tracking**
  - Real-time attendance management
  - Automated attendance reports
  - Absence notifications
  
- **💻 User Experience**
  - Responsive design for all devices
  - Intuitive navigation
  - Role-specific dashboards
  - Dark/Light mode support

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI development
- **Tailwind CSS** - Styling
- **Axios** - API integration

### Backend
- **Express.js** - Server framework
- **Node.js** - Runtime environment
- **MySQL** - Database
- **Sequelize** - ORM for MySQL

### Authentication & Security
- **Firebase Authentication** - User authentication
- **JWT** - Session management

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL Server
- Firebase Account
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Asjad-Zaki/cahcet-college.git
   cd cahcet-college
   ```

2. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Set up MySQL Database**
   ```bash
   # Log into MySQL
   mysql -u your_username -p

   # Create the database
   CREATE DATABASE college_management;
   ```

## ⚙️ Configuration

1. **Create Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=college_management
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

2. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication
   - Add your app to Firebase
   - Copy the configuration details to your `.env` file

## 📱 Usage

1. **Start the Backend Server**
   ```bash
   cd backend
   node server.js
   ```

2. **Start the Frontend Application**
   ```bash
   # From the root directory
   npm start
   ```

3. **Access the Application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - Use the following credentials for testing:
     - Student: student@example.com / password123
     - Faculty: faculty@example.com / password123

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Mohammed Faisal**
- Email: [mdfaisalffz02@gmail.com](mailto:mdfaisalffz02@gmail.com)

---
## Contributions

- Mohammed Faisal
- Mohammed Asjad Zaki
- Mohammed Thalha
<div align="center">
  <sub>Built with ❤️</sub>
</div>
