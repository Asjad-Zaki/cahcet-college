// src/components/FacultyLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/FacultyLogin.css';

const FacultyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      // Store authentication data
      localStorage.setItem('facultyToken', idToken);
      localStorage.setItem('facultyEmail', email);

      // API call to backend
      const response = await axios.post(
        'https://cahcetcollege-backend.onrender.com/api/faculty/login',
        { idToken },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.facultyDetails) {
        localStorage.setItem('facultyDetails', JSON.stringify(response.data.facultyDetails));
        navigate('/faculty-dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || 'Login failed');
    }
  };

  return (
    <div className="faculty-login-container">
      <form className="faculty-login-form" onSubmit={handleLogin}>
        <h2>Faculty Login</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default FacultyLogin;