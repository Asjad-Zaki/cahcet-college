// routes/facultyRoutes.js
const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const { QueryTypes } = require("sequelize");
const admin = require("../firebaseAdmin"); // Firebase Admin SDK initialized in firebaseAdmin.js


router.post("/login", async (req, res) => {
  const { idToken } = req.body; // Client sends the Firebase ID token

  if (!idToken) {
    return res.status(400).json({ message: "ID Token is required" });
  }

  try {
    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    // Fetch faculty details from the database using the email from Firebase
    const faculty = await sequelize.query(
      "SELECT * FROM faculties WHERE email = :email",
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );

    if (!faculty || faculty.length === 0) {
      return res.status(401).json({ message: "Faculty not found" });
    }

    // Respond with the faculty details
    res.json({
      facultyDetails: {
        id: faculty[0].id,
        name: faculty[0].name,
        email: faculty[0].email,
        branch: faculty[0].branch,
      },
    });
  } catch (error) {
    console.error("Firebase token verification error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, branch } = req.body;

  try {
    // Hash the password before storing
   
    // Insert the hashed password into the database
    const query = `
      INSERT INTO faculties (name, email, password, branch)
      VALUES (?, ?, ?, ?)
    `;
    
    const values = [name, email, password, branch];

    await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.INSERT,
    });

    res.status(201).json({ message: "Faculty registered successfully" });

  } catch (error) {
    console.error("Error registering faculty:", error);
    res.status(500).json({ error: "Database error" });
  }
});

router.get('/details', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const faculties = await sequelize.query(
      'SELECT * FROM faculties WHERE email = ?',
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );

    if (!faculties || faculties.length === 0) {
      return res.status(404).json({ error: 'Faculty not found.' });
    }

    // Return the first matching record
    res.json(faculties[0]);
  } catch (error) {
    console.error('Error fetching faculty details:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


router.post('/marks', async (req, res) => {
  try {
    const { branch, section, semester, batchYear, subjectCode, examType, assessments } = req.body;

    if (!branch || !section || !semester || !batchYear || !subjectCode || !examType || !assessments || !Array.isArray(assessments)) {
      return res.status(400).json({ error: 'Missing required fields or invalid data format.' });
    }

    for (const assessment of assessments) {
      const { rollNumber, marks } = assessment;

      // Check if record exists
      const existingRecord = await sequelize.query(
        'SELECT * FROM Marks WHERE rollNumber = ? AND subject_code = ?',
        {
          replacements: [rollNumber, subjectCode],
          type: QueryTypes.SELECT,
        }
      );

      if (existingRecord.length > 0) {
        // Update based on exam type
        const updateField = examType === 'CAT1' ? 'cat1_marks' :
                           examType === 'CAT2' ? 'cat2_marks' :
                           examType === 'MODEL' ? 'model_marks' : null;

        if (!updateField) {
          return res.status(400).json({ error: 'Invalid exam type.' });
        }

        await sequelize.query(
          `UPDATE Marks SET ${updateField} = ? WHERE rollNumber = ? AND subject_code = ?`,
          {
            replacements: [marks, rollNumber, subjectCode],
            type: QueryTypes.UPDATE,
          }
        );
      } else {
        // Insert new record
        await sequelize.query(
          `INSERT INTO Marks (rollNumber, subject_code, cat1_marks, cat2_marks, model_marks, batchYear, semester, section, branch)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          {
            replacements: [
              rollNumber,
              subjectCode,
              examType === 'CAT1' ? marks : null,
              examType === 'CAT2' ? marks : null,
              examType === 'MODEL' ? marks : null,
              batchYear,
              semester,
              section,
              branch
            ],
            type: QueryTypes.INSERT,
          }
        );
      }
    }

    res.json({ message: 'Assessments stored successfully!' });
  } catch (error) {
    console.error('Error storing assessments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/students', async (req, res) => {
  try {
    const { branch, section, academicYear, semester, subjectCode } = req.query;
    
    // Validate that the required parameters are provided
    if (!branch || !section || !academicYear) {
      return res.status(400).json({ error: 'Branch, section, and academicYear are required.' });
    }

    // Since the students table has branch, section, and batchYear (used as academicYear),
    // we filter using those fields. Semester and subjectCode are not used for filtering here.
    const query = `
      SELECT * FROM students
      WHERE branch = ? AND section = ? AND batchYear = ?
      ORDER BY rollNumber ASC
    `;
    const students = await sequelize.query(query, {
      replacements: [branch, section, academicYear],
      type: QueryTypes.SELECT
    });

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Add this to routes/facultyRoutes.js
// Assuming your file structure follows similar patterns to your other routes



// Add this to facultyRoutes.js
router.get('/attendance', async (req, res) => {
  try {
    const { branch, section, batchYear, subject_code, attendance_date } = req.query;
    
    // Validate that the required parameters are provided
    if (!branch || !section || !batchYear || !subject_code || !attendance_date) {
      return res.status(400).json({ error: 'Branch, section, batchYear, subject_code, and attendance_date are required.' });
    }

    const attendance = await Attendance.findAll({
      where: {
        branch,
        section,
        batchYear,
        subject_code,
        attendance_date
      },
      order: [['rollNumber', 'ASC']]
    });

    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Replace the existing save-attendance route with this corrected version
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
module.exports = router;
