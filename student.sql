CREATE DATABASE student;
Use student;
CREATE TABLE subjects (
  subject_id INT AUTO_INCREMENT PRIMARY KEY,
  subject_code VARCHAR(50) NOT NULL, 
  subject_name VARCHAR(100) NOT NULL,
  batchYear INT NOT NULL, 
  semester INT NOT NULL,
  branch VARCHAR(50) NOT NULL);

CREATE TABLE Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    rollNumber INT NOT NULL,
    batchYear INT NOT NULL, 
    semester INT NOT NULL,
    section VARCHAR(2),
    subject_code VARCHAR(50) NOT NULL,
    branch VARCHAR(50) NOT NULL,
    attendance_date DATE NOT NULL,
    record VARCHAR(1) DEFAULT 'P' -- Default to 'P' for Present
    );
SELECT rollNumber, subject_code, branch
FROM Attendance
WHERE attendance_date = '2025-03-08';

Drop table attendance;
        truncate attendance;
SELECT rollNumber, COUNT(*) FROM Attendance GROUP BY rollNumber HAVING COUNT(*) > 1;

CREATE TABLE Marks (
    marks_id INT AUTO_INCREMENT PRIMARY KEY,
    rollNumber INT NOT NULL,
    subject_code VARCHAR(50) NOT NULL,
    cat1_marks DECIMAL(5,2),
    cat2_marks DECIMAL(5,2),
    model_marks DECIMAL(5,2),
    batchYear INT NOT NULL, 
	semester INT NOT NULL,
    section VARCHAR(2),
    branch VARCHAR(50) NOT NULL);
CREATE TABLE students (
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
  createdAt DATETIME,faculties
  updatedAt DATETIME
) ENGINE=InnoDB;
CREATE TABLE faculties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  branch VARCHAR(50) NOT NULL
);

INSERT INTO subjects (subject_id, subject_code, subject_name, batchYear, semester, branch)
VALUES 
    (1, 'HS3152', 'Professional English - I',2025,1,'CSE'),
    (2,'MA3151', 'Matrices and Calculus ',2025,1, 'CSE'),
    (3,'PH3151',' Engineering Physics',2025,1, 'CSE'),
    (4,'CY3151', 'Engineering Chemistry',2025,1, 'CSE'),
    (5,'GE3151', 'Problem Solving and Python Programming', 2025, 1,'IT'),
    (6,'GE3152', 'தமிழர்மரபு /Heritage of Tamils', 2025, 1,'IT'),
    (7,'S3252', 'Professional English - II', 2025, 2, 'CSE'),
    (8,'MA3251', 'Statistics and Numerical Methods',2025,2, 'CSE'),
    (9,'PH3256', 'Physics for Information Science',2025,2, 'CSE'),
    (10,'BE3251', 'Basic Electrical and Electronics Engineering',2025,2,'MECH');
    
    truncate attendance;
    INSERT INTO subjects (subject_code, subject_name, batchYear, semester, branch)
VALUES 
    ('HS3152', 'Professional English - I', 2025, 1, 'CSE'),
    ('MA3151', 'Matrices and Calculus', 2025, 1, 'CSE'),
    ('PH3151', 'Engineering Physics', 2025, 1, 'CSE'),
    ('CY3151', 'Engineering Chemistry', 2025, 1, 'CSE'),
    ('GE3151', 'Problem Solving and Python Programming', 2025, 1, 'CSE'),
    ('GE3152', 'தமிழர்மரபு /Heritage of Tamils', 2025, 1, 'CSE'),
    -- Semester 2
    ('S3252', 'Professional English - II', 2025, 2, 'CSE'),
    ('MA3251', 'Statistics and Numerical Methods', 2025, 2, 'CSE'),
    ('PH3256', 'Physics for Information Science', 2025, 2, 'CSE'),
    ('BE3251', 'Basic Electrical and Electronics Engineering', 2025, 2, 'CSE'),
    ('GE3251', 'Engineering Graphics', 2025, 2, 'CSE'),
    ('CS3251', 'Programming in C', 2025, 2, 'CSE'),
    ('GE3252', 'தமிழரும் ததொழில்நுட்பமும்/Tamils and Technology', 2025, 2, 'CSE'),
    -- Semester 3
    ('MA3354', 'Discrete Mathematics', 2025, 3, 'CSE'),
    ('CS3351', 'DPCO', 2025, 3, 'CSE'),
    ('CS3352', 'Foundations of Data Science', 2025, 3, 'CSE'),
    ('CS3301', 'Data Structures', 2025, 3, 'CSE'),
    ('CS3391', 'Object Oriented Programming', 2025, 3, 'CSE'),
    -- Semester 4
    ('CS3452', 'Theory of Computation', 2025, 4, 'CSE'),
    ('CS3491', 'Artificial Intelligence and Machine Learning', 2025, 4, 'CSE'),
    ('CS3492', 'Database Management Systems', 2025, 4, 'CSE'),
    ('CS3401', 'Algorithms', 2025, 4, 'CSE'),
    ('CS3451', 'Introduction to Operating Systems', 2025, 4, 'CSE'),
    ('GE3451', 'Environmental Sciences and Sustainability', 2023, 4, 'CSE'),
    -- Semester 5
    ('CS3591', 'Computer Networks', 2025, 5, 'CSE'),
    ('CS3501', 'Compiler Design', 2025, 5, 'CSE'),
    ('CB3491', 'Cryptography and Cyber Security', 2025, 5, 'CSE'),
    ('CS3551', 'Distributed Computing', 2025, 5, 'CSE'),
    ('CCS366', 'Software Testing and Automation', 2025, 5, 'CSE'),
    ('CCS375', 'Web Technologies', 2025, 5, 'CSE'),
    -- Semester 6
    ('CCS356', 'Object Oriented Software Engineering', 2023, 6, 'CSE'),
    ('CS3691', 'Embedded Systems and IoT', 2025, 6, 'CSE'),
    ('CCS354', 'Network Security', 2025, 6, 'CSE'),
    ('CCW331', 'Business Analytics', 2025, 6, 'CSE'),
    ('CCS372', 'Virtualization', 2025, 6, 'CSE'),
    ('CCS341', 'Data Warehousing', 2025, 6, 'CSE'),
    -- Semester 7
    ('GE3791', 'Human Values and Ethics', 2025, 7, 'CSE'),
    ('CME365', 'Renewable Energy Technologies', 2025, 7, 'CSE'),
    ('GE3752', 'Total Quality Management', 2025, 7, 'CSE'),
    ('AI3021', 'IT in Agricultural System', 2025, 7, 'CSE'),
    -- Semester 8
    ('CS3811', 'Project Work/Internship', 2025, 8, 'CSE');

    
INSERT INTO students
  (name, rollNumber, dob, registerNumber, branch, section, batchYear, yearOfEntry,
   fatherName, fatherOccupation, educationOccupation, familyBackground, parentPhoneNo,
   address, languagesKnown, guardianName, lastSchoolName, mediumOfInstructions,
   maths, physics, chemistry, cutOff, quota, firstYearCounselor, secondYearCounselor,
   thirdYearCounselor, finalYearCounselor, createdAt, updatedAt)
VALUES
 
  ('Bob Smith', 102, '1999-08-22', 1002, 'IT', 'B', 2024, 2021,
   'John Smith', 'Doctor', 'Teacher', 'Upper middle', 876543210,
   '456 Elm St, Townsville', 'English, French', 'Jane Smith', 'High School B', 'English',
   78, 82, 80, 79, 'OBC', 'Mr. Wilson', 'Ms. Green', 'Dr. Brown', 'Mrs. Taylor', NOW(), NOW()),

  ('Charlie Brown', 103, '2001-01-15', 1003, 'ECE', 'A', 2024, 2021,
   'Michael Brown', 'Businessman', 'Engineer', 'Lower middle', 122334455,
   '789 Oak St, Villageville', 'English', 'Patricia Brown', 'High School C', 'English',
   92, 88, 91, 90, 'SC', 'Ms. Adams', 'Mr. Baker', 'Dr. Clark', 'Mrs. Evans', NOW(), NOW());
   
   INSERT INTO students
  (name, rollNumber, dob, registerNumber, branch, section, batchYear, yearOfEntry,
   fatherName, fatherOccupation, educationOccupation, familyBackground, parentPhoneNo,
   address, languagesKnown, guardianName, lastSchoolName, mediumOfInstructions,
   maths, physics, chemistry, cutOff, quota, firstYearCounselor, secondYearCounselor,
   thirdYearCounselor, finalYearCounselor, createdAt, updatedAt)
VALUES
     ('Raj Patel', 102, '2000-07-18', 1002, 'CSE', 'A', 2024, 2021,
   'Vikram Patel', 'Doctor', 'Professor', 'Upper middle class', 987654321,
   '45 Park Avenue, Techtown', 'English, Hindi, Gujarati', 'Priya Patel', 'City Public School', 'English',
   92, 88, 91, 90, 'Merit', 'Dr. Smith', 'Ms. Parker', 'Mr. Lee', 'Mrs. Davis', NOW(), NOW()),
   
  ('Sarah Chang', 103, '2001-02-25', 1003, 'CSE', 'A', 2024, 2021,
   'James Chang', 'Businessman', 'Accountant', 'Middle class', 876543210,
   '78 Oak Street, Suburbia', 'English, Mandarin', 'Linda Chang', 'Westside High', 'English',
   94, 89, 87, 90, 'General', 'Dr. Smith', 'Ms. Parker', 'Mr. Lee', 'Mrs. Davis', NOW(), NOW()),
   
  ('Michael Rodriguez', 104, '2000-11-30', 1004, 'CSE', 'A', 2024, 2021,
   'Carlos Rodriguez', 'Architect', 'Professor', 'Upper middle class', 765432109,
   '14 Maple Drive, Downtown', 'English, Spanish, Portuguese', 'Ana Rodriguez', 'Excellence Academy', 'English',
   83, 92, 90, 88, 'Management', 'Dr. Smith', 'Ms. Parker', 'Mr. Lee', 'Mrs. Davis', NOW(), NOW()),
   
  ('Aisha Khan', 105, '2001-04-08', 1005, 'CSE', 'A', 2024, 2021,
   'Mohammed Khan', 'Software Engineer', 'Lecturer', 'Middle class', 654321098,
   '29 Tech Boulevard, Innovation City', 'English, Urdu, Arabic', 'Fatima Khan', 'International School', 'English',
   91, 93, 88, 91, 'Merit', 'Dr. Smith', 'Ms. Parker', 'Mr. Lee', 'Mrs. Davis', NOW(), NOW());
   SELECT id, rollNumber, name FROM students WHERE rollNumber = 101;
   DELETE FROM students WHERE id = 101;
SELECT * FROM student.students;
-- Grant privileges for connections from any host:
GRANT ALL PRIVILEGES ON `college_management`.* TO 'college-management'@'%' IDENTIFIED BY 'Faisalkingace@023';

-- Apply the changes:
FLUSH PRIVILEGES;

INSERT INTO attendance (rollNumber, attendance_percentage, batchYear, semester, section, subject_code, branch)
VALUES
(21650, ROUND(75 + (RAND() * 20), 2025, 1, 'A', 'HS3152', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 1, 'A', 'MA3151', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 1, 'A', 'PH3151', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 1, 'A', 'CY3151', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 1, 'A', 'GE3151', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 1, 'A', 'GE3152', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 2, 'A', 'S3252', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 2, 'A', 'MA3251', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 2, 'A', 'PH3256', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 2, 'A', 'BE3251', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 2, 'A', 'GE3251', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 2, 'A', 'CS3251', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 2, 'A', 'GE3252', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 3, 'A', 'MA3354', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 3, 'A', 'CS3351', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 3, 'A', 'CS3352', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 3, 'A', 'CS3301', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 3, 'A', 'CS3391', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 4, 'A', 'CS3452', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 4, 'A', 'CS3491', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 4, 'A', 'CS3492', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 4, 'A', 'CS3401', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 4, 'A', 'CS3451', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2023, 4, 'A', 'GE3451', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 5, 'A', 'CS3591', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 5, 'A', 'CS3501', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 5, 'A', 'CB3491', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 5, 'A', 'CS3551', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 5, 'A', 'CCS366', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 5, 'A', 'CCS375', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2023, 6, 'A', 'CCS356', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 6, 'A', 'CS3691', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 6, 'A', 'CCS354', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 6, 'A', 'CCW331', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 6, 'A', 'CCS372', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 6, 'A', 'CCS341', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 7, 'A', 'GE3791', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 7, 'A', 'CME365', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 7, 'A', 'GE3752', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 7, 'A', 'AI3021', 'CSE'),
(21650, ROUND(75 + (RAND() * 20), 2025, 8, 'A', 'CS3811', 'CSE');