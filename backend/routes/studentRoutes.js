// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // our Sequelize instance from db.js
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  const {
    name,
    rollNumber,
    dob,
    registerNumber,
    branch,
    section,
    batchYear,
    yearOfEntry,
    fatherName,
    fatherOccupation,
    educationOccupation,
    familyBackground,
    parentPhoneNo,
    address,
    languagesKnown,
    guardianName,
    lastSchoolName,
    mediumOfInstructions,
    maths,
    physics,
    chemistry,
    cutOff,
    quota,
    firstYearCounselor,
    secondYearCounselor,
    thirdYearCounselor,
    finalYearCounselor,
  } = req.body;

  // Create timestamps for createdAt and updatedAt
  const createdAt = new Date();
  const updatedAt = new Date();

  // Define the SQL query with placeholders
  const query = `
    INSERT INTO students (
      name, rollNumber, dob, registerNumber, branch, section, batchYear, yearOfEntry,
      fatherName, fatherOccupation, educationOccupation, familyBackground, parentPhoneNo,
      address, languagesKnown, guardianName, lastSchoolName, mediumOfInstructions,
      maths, physics, chemistry, cutOff, quota, firstYearCounselor, secondYearCounselor,
      thirdYearCounselor, finalYearCounselor, createdAt, updatedAt
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  // Prepare the array of values in the same order as the placeholders above.
  const values = [
    name,
    rollNumber,
    dob,
    registerNumber,
    branch,
    section,
    batchYear,
    yearOfEntry,
    fatherName,
    fatherOccupation,
    educationOccupation,
    familyBackground,
    parentPhoneNo,
    address,
    languagesKnown,
    guardianName,
    lastSchoolName,
    mediumOfInstructions,
    maths,
    physics,
    chemistry,
    cutOff,
    quota,
    firstYearCounselor,
    secondYearCounselor,
    thirdYearCounselor,
    finalYearCounselor,
    createdAt,
    updatedAt,
  ];

  try {
    // Execute the raw query with replacements.
    const [result] = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.INSERT,
    });

    // Depending on the dialect, result might contain the inserted ID.
    res.status(201).json({
      message: "Student registered successfully",
      studentId: result, // may need to adjust based on your MySQL/Sequelize version
    });
  } catch (error) {
    console.error("Error inserting student:", error);
    res.status(500).json({ error: "Database error" });
  }
});


router.post("/login", async (req, res) => {
  const { rollNumber, dob } = req.body;

  if (!rollNumber || !dob) {
    return res.status(400).json({ message: "Roll number and DOB are required" });
  }

  try {
    // Find student in database
    const [students] = await sequelize.query(
      "SELECT * FROM students WHERE rollNumber = ? AND dob = ?",
      {
        replacements: [rollNumber, dob],
        type: QueryTypes.SELECT,
      }
    );

    if (!students) {
      return res.status(401).json({ message: "Invalid roll number or DOB" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: students.id, rollNumber: students.rollNumber, name: students.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      studentDetails: {
        id: students.id,
        name: students.name,
        rollNumber: students.rollNumber,
        dob: students.dob,
        branch: students.branch,
        section: students.section,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/marks", async (req, res) => {
  try {
    const { rollNumber } = req.query;

    // Validate parameter
    if (!rollNumber) {
      return res.status(400).json({ error: "Missing rollNumber" });
    }


    // Query marks filtering only by rollNumber
    const marks = await sequelize.query(
      `SELECT 
          subject_code,
          semester,
          COALESCE(cat1_marks, 'N/A') AS cat1,
          COALESCE(cat2_marks, 'N/A') AS cat2,
          COALESCE(model_marks, 'N/A') AS model
       FROM Marks 
       WHERE rollNumber = :rollNumber 
       ORDER BY semester, subject_code`,
      {
        replacements: { rollNumber },
        type: QueryTypes.SELECT,
      }
    );

    res.json(marks);
  } catch (error) {
    console.error("Error fetching marks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/attendance', async (req, res) => {
  try {
    const { branch, section, batchYear, semester, subject_code, attendance_date, attendanceData } = req.body;

    if (!branch || !section || !batchYear || !semester || !subject_code || !attendance_date || !attendanceData || !Array.isArray(attendanceData)) {
      console.error("Invalid request data:", req.body);
      return res.status(400).json({ error: 'Missing required fields or invalid data format.' });
    }

    console.log("Received Attendance Data:", attendanceData);

    for (const recordData of attendanceData) {
      if (!recordData || !recordData.rollNumber || !recordData.record) {
        console.error("Invalid attendance record:", recordData);
        continue;
      }

      const { rollNumber, record } = recordData;

      // **Check if record exists**
      const existingRecord = await sequelize.query(
        "SELECT * FROM Attendance WHERE rollNumber = ? AND subject_code = ? AND attendance_date = ?",
        {
          replacements: [rollNumber, subject_code, attendance_date],
          type: QueryTypes.SELECT
        }
      );

      if (record === 'P') {
        if (existingRecord.length > 0) {
          // **Update existing record**
          await sequelize.query(
            "UPDATE Attendance SET record = 'P' WHERE rollNumber = ? AND subject_code = ? AND attendance_date = ?",
            {
              replacements: [rollNumber, subject_code, attendance_date],
              type: QueryTypes.UPDATE
            }
          );
        } else {
          // **Insert new record**
          await sequelize.query(
            `INSERT INTO Attendance (rollNumber, batchYear, semester, section, subject_code, branch, attendance_date, record)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            {
              replacements: [rollNumber, batchYear, semester, section, subject_code, branch, attendance_date, 'P'],
              type: QueryTypes.INSERT
            }
          );
        }
      } else if (record === 'A') {
        // **Delete existing record (if present)**
        await sequelize.query(
          "DELETE FROM Attendance WHERE rollNumber = ? AND subject_code = ? AND attendance_date = ?",
          {
            replacements: [rollNumber, subject_code, attendance_date],
            type: QueryTypes.DELETE
          }
        );

        // **Insert new 'A' record**
        await sequelize.query(
          `INSERT INTO Attendance (rollNumber, batchYear, semester, section, subject_code, branch, attendance_date, record)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          {
            replacements: [rollNumber, batchYear, semester, section, subject_code, branch, attendance_date, 'A'],
            type: QueryTypes.INSERT
          }
        );
      }
    }

    res.json({ message: 'Attendance saved successfully!' });
  } catch (error) {
    console.error('Error saving attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/// Get student details
router.get('/:rollNumber', async (req, res) => {
  try {
    // Use Sequelize to query the database
    const [student, metadata] = await sequelize.query(
      'SELECT * FROM students WHERE rollNumber = ?',
      {
        replacements: [req.params.rollNumber], // Use replacements for parameterized queries
        type: QueryTypes.SELECT, // Specify the query type
      }
    );

    // If no student is found, return a 404 error
    if (!student || student.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    // Return the first student (since rollNumber is unique)
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;