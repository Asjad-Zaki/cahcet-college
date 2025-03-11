// src/components/StudentDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "../styles/StudentDashboard.css";
const StudentDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("details");
  const [studentDetails, setStudentDetails] = useState(null);
  const [subjects, setSubjects] = useState({});
  const [marks, setMarks] = useState({});
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch student details, subjects, marks, and attendance
  useEffect(() => {
    const fetchStudentData = async () => {
      const rollNo = localStorage.getItem("studentRollNo");
      if (!rollNo) {
        navigate("/student-login");
        return;
      }
      try {
        // Fetch student details
        const studentResponse = await axios.get(
          `http://localhost:5000/api/students/${rollNo}`
        );
        if (studentResponse.data) {
          const fetchedStudent = studentResponse.data;
          setStudentDetails(fetchedStudent);
          // Fetch subjects based on branch and batchYear
          const subjectsResponse = await axios.get(
            `http://localhost:5000/api/subjects`,
            {
              params: {
                branch: fetchedStudent.branch,
                batchYear: fetchedStudent.batchYear,
              },
            }
          );
          setSubjects(groupBySemester(subjectsResponse.data));
          // Fetch marks for the student
          const marksResponse = await axios.get(
            `http://localhost:5000/api/students/marks`,
            {
              params: {
                rollNumber: rollNo,
              },
            }
          );
          setMarks(groupMarksBySemester(marksResponse.data));
          // Fetch attendance for the student
          const attendanceResponse = await axios.get(
            `http://localhost:5000/api/students/attendance`,
            {
              params: {
                rollNumber: rollNo,
              },
            }
          );
          setAttendance(groupAttendanceBySemester(attendanceResponse.data));
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [navigate]);

  // Group subjects by semester
  const groupBySemester = (subjects) => {
    return subjects.reduce((acc, subject) => {
      const sem = subject.semester;
      if (!acc[sem]) acc[sem] = [];
      acc[sem].push(subject);
      return acc;
    }, {});
  };

  // Group marks by semester
  const groupMarksBySemester = (marks) => {
    return marks.reduce((acc, mark) => {
      const sem = mark.semester;
      if (!acc[sem]) acc[sem] = [];
      acc[sem].push(mark);
      return acc;
    }, {});
  };

  // Group attendance by semester
  const groupAttendanceBySemester = (attendance) => {
    return attendance.reduce((acc, record) => {
      const sem = record.semester;
      if (!acc[sem]) acc[sem] = [];
      acc[sem].push(record);
      return acc;
    }, {});
  };

  const handleLogout = () => {
    localStorage.removeItem("studentRollNo");
    navigate("/");
  };

  const HomeButton = () => (
    <button className="homebutton" onClick={() => setSelectedTab("details")}>
      Home
    </button>
  );

  const renderTabContent = () => {
    if (loading) return <p>Loading data...</p>;

    switch (selectedTab) {
      case "details":
        return (
          <div className="tab-content details-tab">
            <h2>Student Details</h2>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
            {studentDetails ? (
              <>
                <p>
                  <strong>Name:</strong> {studentDetails.name}
                </p>
                <p>
                  <strong>DOB:</strong> {studentDetails.dob}
                </p>
                <p>
                  <strong>Roll Number:</strong> {studentDetails.rollNumber}
                </p>
                <p>
                  <strong>Register Number:</strong> {studentDetails.registerNumber}
                </p>
                <p>
                  <strong>Branch:</strong> {studentDetails.branch}
                </p>
                <p>
                  <strong>Section:</strong> {studentDetails.section}
                </p>
                <strong>Counsellor Names:</strong>
                <ul>
                  <li>
                    <strong>1st Year:</strong> {studentDetails.firstYearCounselor}
                  </li>
                  <li>
                    <strong>2nd Year:</strong> {studentDetails.secondYearCounselor}
                  </li>
                  <li>
                    <strong>3rd Year:</strong> {studentDetails.thirdYearCounselor}
                  </li>
                  <li>
                    <strong>4th Year:</strong> {studentDetails.finalYearCounselor}
                  </li>
                </ul>
              </>
            ) : (
              <p>No details available.</p>
            )}
          </div>
        );
      case "subjects":
        return (
          <div className="tab-content subjects-tab">
            <HomeButton />
            <h2>Subjects</h2>
            {Object.keys(subjects).map((semester) => (
              <div key={semester} className="semester-table">
                <h3>Semester {semester}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Subject Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects[semester].map((subject, index) => (
                      <tr key={subject.subject_id || index}>
                        <td>{subject.subject_code}</td>
                        <td>{subject.subject_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        );
      case "attendance":
        return (
          <div className="tab-content attendance-tab">
            <HomeButton />
            <h2>Attendance</h2>
            {Object.keys(attendance).length > 0 ? (
              Object.keys(attendance).map((semester) => (
                <div key={semester} className="semester-attendance">
                  <h3>Semester {semester}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Subject Code</th>
                        <th>Attendance (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance[semester].map((record, index) => (
                        <tr key={record.attendance_id || index}>
                          <td>{record.subject_code}</td>
                          <td>
                            {record.attendance_percentage !== null
                              ? record.attendance_percentage
                              : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p>No attendance records available.</p>
            )}
          </div>
        );
      case "results":
        return (
          <div className="tab-content results-tab">
            <HomeButton />
            <h2>Results</h2>
            {Object.keys(marks).length > 0 ? (
              Object.keys(marks).map((semester) => (
                <div key={semester} className="semester-results">
                  <h3>Semester {semester}</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Subject Code</th>
                        <th>CAT 1</th>
                        <th>CAT 2</th>
                        <th>Model</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marks[semester].map((mark, index) => (
                        <tr key={mark.marks_id || index}>
                          <td>{mark.subject_code}</td>
                          <td>{mark.cat1 || "N/A"}</td>
                          <td>{mark.cat2 || "N/A"}</td>
                          <td>{mark.model || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p>No marks available.</p>
            )}
          </div>
        );
      case "changeCourse":
        return (
          <div className="tab-content change-course-tab">
            <HomeButton />
            <h2>Change Course</h2>
            <p>Feature to modify courses will be implemented here.</p>
          </div>
        );
      default:
        return <p>Select a tab to view content.</p>;
    }
  };

  return (
    <div className="student-dashboard">
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ display: isSidebarOpen ? "none" : "block" }}
      >
        <FiMenu size={24} />
      </button>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button
          className="close-sidebar"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FiX size={24} />
        </button>
        <button onClick={() => { setSelectedTab("details"); setIsSidebarOpen(false); }}>
          Details
        </button>
        <button onClick={() => { setSelectedTab("subjects"); setIsSidebarOpen(false); }}>
          Subjects
        </button>
        <button onClick={() => { setSelectedTab("attendance"); setIsSidebarOpen(false); }}>
          Attendance
        </button>
        <button onClick={() => { setSelectedTab("results"); setIsSidebarOpen(false); }}>
          Results
        </button>
        <button onClick={() => { setSelectedTab("changeCourse"); setIsSidebarOpen(false); }}>
          Change Course
        </button>
      </div>
      <div className="main-content">{renderTabContent()}</div>
    </div>
  );
};

export default StudentDashboard;
