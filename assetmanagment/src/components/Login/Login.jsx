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

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("All fields are required.");
      setShowError(true);
      return false;
    }
    return true;
  };

  const validatePasswordStrength = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const validateNewPasswordForm = () => {
    let errors = {};

    if (!newPassword) {
      errors.newPassword = "New password is required.";
    } else if (!validatePasswordStrength(newPassword)) {
      errors.newPassword = "Password must be at least 8 characters, include uppercase, lowercase, and a number.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(e)) return;

    try {
      const response = await axios.post('http://18.139.160.129:8000/api/users/login', {
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

      switch (user.selectedOption) {
        case "Admin":
          navigate('/AdminDashboardPage');
          break;
        case "CompanyAdmin":
          navigate('/CompanyDashBord');
          break;
        case "DepartmentAdmin":
          navigate('/DepartmentDashBoard');
          break;
        case "Audit":
          navigate('/AuditDashBoard');
          break;
        default:
          setError("Unauthorized role.");
          setShowError(true);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Invalid username or password.");
      setShowError(true);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setShowError(false);
    try {
      const response = await axios.post('http://18.139.160.129:8000/api/users/request', { username });

      if (response.data.message === "User Correct") {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await axios.post('http://18.139.160.129:8000/api/users/otp', { username, otp: otpCode });
        setStep(2);
      } else {
        setError("User not found.");
        setShowError(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || "User not found.");
      setShowError(true);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setShowError(false);
    try {
      await axios.post('http://18.139.160.129:8000/api/users/verify', { username, otp });
      setStep(3);
    } catch (error) {
      setError("Invalid OTP.");
      setShowError(true);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setShowError(false);
    setFormErrors({});

    if (!validateNewPasswordForm()) return;

    try {
      await axios.post('http://18.139.160.129:8000/api/users/reset-password', { username, newPassword });
      setShowForgotPassword(false);
      setStep(1);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("Password reset failed.");
      setShowError(true);
    }
  };

  return (
    <div className="main">
      <div className="container logmain">
        {!showForgotPassword ? (
          <>
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
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="show-password-checkbox">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword" className='shopass'>Show Password</label>
                </div>
                <p
                  className="forgot-password"
                  style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </p>
                <button type="submit" className="sign-up-button">
                  LOGIN
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="panel1 resetpanel">
            <h2 className='resethead'>Reset Your Password</h2><hr />
            {showError && <p className="error-message">{error}</p>}
            {step === 1 && (
              <>
                <input
                  className='userinput'
                  type="text"
                  placeholder="Enter Your Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button className="btnrequest" onClick={handleForgotPassword}>Request OTP</button>
              </>
            )}
            {step === 2 && (
              <>
                <input
                  className='userinput'
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="btnrequest" onClick={handleVerifyOtp}>Verify OTP</button>
              </>
            )}
            {step === 3 && (
              <>
                <input
                  className='userinput'
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {formErrors.newPassword && <span className="error">{formErrors.newPassword}</span>}

                <input
                  className='userinput'
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}

                <div className="show-password-checkbox">
                  <input
                    type="checkbox"
                    id="showPasswordReset"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPasswordReset" className='shopass'>Show Password</label>
                </div>

                <button className="btnrequest" onClick={handleResetPassword}>Reset Password</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
