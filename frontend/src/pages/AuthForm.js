import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthForm.css'; // Import the CSS file

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = isSignIn ? 'signin' : 'signup';
    try {
      const res = await axios.post(`http://localhost:5000/${endpoint}`, formData);
      alert(res.data.message);
      if (isSignIn) navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          onChange={handleChange}
          required
        />

        {!isSignIn && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="aadhaar_number"
              placeholder="Aadhaar Number"
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <p onClick={() => setIsSignIn(!isSignIn)}>
        {isSignIn ? 'New user? Sign Up' : 'Already have an account? Sign In'}
      </p>
    </div>
  );
};

export default AuthForm;
