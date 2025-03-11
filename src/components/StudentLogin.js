import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/StudentLogin.css";

const StudentLogin = () => {
  const [rollNo, setRollNo] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`http://localhost:5000/api/students/login`, {
        rollNumber: rollNo,
        dob: dob,
      });

      const { token, studentDetails } = response.data;

      // Store student details and token
      localStorage.setItem("studentToken", token);
      localStorage.setItem("studentRollNo", studentDetails.rollNumber);
      localStorage.setItem("studentName", studentDetails.name);
      localStorage.setItem("studentBranch", studentDetails.branch);
      localStorage.setItem("studentDob", studentDetails.dob);

      // Redirect to dashboard
      navigate("/student-dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1><strong>Student Login</strong></h1>
      <input
        type="text"
        placeholder="Roll Number"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default StudentLogin;
