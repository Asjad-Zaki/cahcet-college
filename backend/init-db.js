const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT
} = process.env;

async function initializeDatabase() {
  try {
    // Create connection
    const connection = await mysql.createConnection({
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      port: MYSQL_PORT
    });

    // Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`);
    await connection.query(`USE ${MYSQL_DATABASE}`);

    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS subjects (
        subject_id INT AUTO_INCREMENT PRIMARY KEY,
        subject_code VARCHAR(50) NOT NULL, 
        subject_name VARCHAR(100) NOT NULL,
        batchYear INT NOT NULL, 
        semester INT NOT NULL,
        branch VARCHAR(50) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Attendance (
        attendance_id INT AUTO_INCREMENT PRIMARY KEY,
        rollNumber INT NOT NULL,
        batchYear INT NOT NULL, 
        semester INT NOT NULL,
        section VARCHAR(2),
        subject_code VARCHAR(50) NOT NULL,
        branch VARCHAR(50) NOT NULL,
        attendance_date DATE NOT NULL,
        record VARCHAR(1) DEFAULT 'P'
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS Marks (
        marks_id INT AUTO_INCREMENT PRIMARY KEY,
        rollNumber INT NOT NULL,
        subject_code VARCHAR(50) NOT NULL,
        cat1_marks DECIMAL(5,2),
        cat2_marks DECIMAL(5,2),
        model_marks DECIMAL(5,2),
        batchYear INT NOT NULL, 
        semester INT NOT NULL,
        section VARCHAR(2),
        branch VARCHAR(50) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        rollNumber INT,
        dob DATE,
        registerNumber INT,
        branch VARCHAR(50),
        section VARCHAR(2),
        batchYear INT,
        yearOfEntry INT,
        fatherName VARCHAR(255),
        fatherOccupation VARCHAR(255),
        educationOccupation VARCHAR(255),
        familyBackground VARCHAR(255),
        parentPhoneNo INT,
        address VARCHAR(255),
        languagesKnown VARCHAR(255),
        guardianName VARCHAR(255),
        lastSchoolName VARCHAR(255),
        mediumOfInstructions VARCHAR(255),
        maths INT,
        physics INT,
        chemistry INT,
        cutOff INT,
        quota VARCHAR(255),
        firstYearCounselor VARCHAR(255),
        secondYearCounselor VARCHAR(255),
        thirdYearCounselor VARCHAR(255),
        finalYearCounselor VARCHAR(255),
        createdAt DATETIME,
        updatedAt DATETIME
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS faculties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        branch VARCHAR(50) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase(); 