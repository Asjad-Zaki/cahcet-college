// src/components/FacultyRegister.js
import React, { useState } from 'react';
import '../styles/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const FacultyRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'https://cahcetcollege-backend.onrender.com';

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear any previous errors when user starts typing
    setError('');
  };

  // Submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        `${API_URL}/api/faculty/register`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('Registration successful:', response.data);
      alert('Faculty registered successfully');
      navigate('/');
    } catch (err) {
      console.error('Error registering faculty:', err);
      setError(err.response?.data?.message || 'Error occurred while registering. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Faculty Registration - CAHCET College</title>
        <meta name="description" content="Register as a faculty member at CAHCET College" />
      </Helmet>
      <div className="register-container">
        <div className="register-card">
          <h2>Faculty Registration</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Faculty Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="register-input"
              required
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="register-input"
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="register-input"
              required
              disabled={loading}
              minLength={6}
            />
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="register-input"
              required
              disabled={loading}
            >
              <option value="" disabled>
                Select Branch
              </option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AIDS">AIDS</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            <button 
              type="submit" 
              className="register-btn"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Faculty'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FacultyRegister;
