import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import"../App.css"
const BASE_URL = import.meta.env.VITE_API_URL;
const LoginPage = () => {
  // --- STATE ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // --- HANDLER ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Make the POST request to the login endpoint
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // 2. Check if the login was successful
      if (!response.ok) {
        throw new Error(data.err || 'Failed to log in');
      }

      // 3. If login is successful, we get a token. We need to save it.
      // For now, we'll just log it. In the next step, we'll save it properly.
      console.log("Login successful, token:", data.token);
      localStorage.setItem("token", data.token);
localStorage.setItem("username", data.username);

      // 4. Redirect to the homepage
      navigate('/');

    } catch (err) {
      // 5. Catch and display any errors
      setError(err.message);
      console.error("Login error:", err);
    }
  };

  // --- JSX ---
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="form-button">Login</button>
        <p>kindly refresh the home page after login</p>
      </form>
    </div>
  );
};

export default LoginPage;
