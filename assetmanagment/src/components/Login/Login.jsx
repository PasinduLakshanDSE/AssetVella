import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const validateForm = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("All fields are required.");
      setShowError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(e)) return;
  
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        username,
        password,
      });
  
      const user = response.data;
      setUsername("");
      setPassword("");
      setShowError(false);
  
      if (user.isBlocked) {
        setError("Your account is blocked. Please contact the administrator.");
        setShowError(true);
        return;
      }
  
      localStorage.setItem('currentUser', JSON.stringify({ username: user.name, role: user.selectedOption }));
  
      if (user.selectedOption === "Admin") {
        navigate('/AdminDashboardPage');
      } else if (user.selectedOption === "CompanyAdmin") {
        navigate('/CompanyDashBord');
      } else if( user.selectedOption === "DepartmentAdmin"){
        navigate('/DepartmentDashBoard');
      
      } else {
        setError("Unauthorized role.");
        setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Invalid username or password.");
      setShowError(true);
    }
  };
  
  

  return (
    <div className="main">
      <div className="container logmain">
        <div className="panel sign-in-panel">
          <h1 className="titleleft">Welcome to Asset Management System</h1>
        </div>
        <div className="panel sign-up-panel">
          <h1 className="titleright">Log In to Your Account</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            {showError && <p className="error-message">{error}</p>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button type="submit" className="sign-up-button">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
