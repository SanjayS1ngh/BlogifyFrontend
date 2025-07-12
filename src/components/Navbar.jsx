import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/user/login");
  }

  return (
    <nav className='navClass pixel-font'>
      <Link to="/" className="navbar-brand nav-blog-author">{username?username:"blogify"}</Link>

      <div className="auth">
        {username ? (
          <>
            <Link to="/blog/add" className="navbar-link">New Post</Link>
            <button className="navbar-link logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/user/signup" className='navbar-link'>Signup</Link>
            <Link to="/user/login" className="navbar-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
