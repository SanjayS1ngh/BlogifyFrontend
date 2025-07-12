import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import"../App.css"
const BASE_URL = import.meta.env.VITE_API_URL;
const SignupPage = () => {
  // --- STATE ---
  // State for each form input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for handling loading or error messages
  const [error, setError] = useState(null);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // --- HANDLER ---
  const handleSignupSubmit = async (e) => {
    // 1. Prevent the default browser refresh on form submission
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      console.log('Request URL:', `${BASE_URL}/user/signup`);

      // 2. Make the POST request to the signup endpoint
      const response = await fetch(`${BASE_URL}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      // 3. Check if the response was successful
      if (!response.ok) {
        // If the server responded with an error status (like 400 or 500)
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to sign up');
      }

      // 4. If signup is successful, navigate to the login page
      navigate('/user/login');

    } catch (err) {
      // 5. Catch any errors (network error or error thrown above)
      setError(err.message);
      console.error("Signup error:", err);
    }
  };

  // --- JSX ---
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignupSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        {/* Display an error message if one exists */}
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="form-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
