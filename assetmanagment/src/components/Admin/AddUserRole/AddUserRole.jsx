// AddUsersRole.jsx
import './adduserrole.css';
//import './selectStyles.css';           // optional: custom styles for react‑select
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';
//import AsyncSelect from 'react-select/async';


/* ---------- constants ---------- */
const departmentOptions = [
  "ICT", "HR", "Kitchen", "Front Office", "Store", "Account", "Audit", "F&B",
  "House Keeping", "Maintains", "Garden", "Reservation", "Resturent",
  "Procurement", "Reception", "Laundry", "Complains", "SPA", "GYM",
  "Naturalist", "Yoga", "Marketing"
].map(dep => ({ value: dep, label: dep }));

const companyOptions = [
  "Vella", "98 Acres", "Ravana Pool Club", "Flying Ravana",
  "Le Maas Tota", "Tea Factory", "Walaa kulu", "Kiri Kopi",
  "Tea Export", "Ambuluwawa Swing"
];

/* ---------- utility ---------- */
const isStrongPassword = (pwd) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);

/* ---------- main component ---------- */
export default function AddUsersRole() {
  /* form state */
  const [firstName, setFirstName]       = useState('');
  const [lastName, setLastName]         = useState('');
  const [designation, setDesignation]   = useState('');
  const [contact, setContact]           = useState('');
  const [username, setUsername]         = useState('');
  const [role, setRole]                 = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPwd, setConfirmPwd]     = useState('');
  const [showPwd, setShowPwd]           = useState(false);
  const [company, setCompany]           = useState('');
  const [department, setDepartment]     = useState('');
  const [errors, setErrors]             = useState({});
  const [existingUsernames, setExistingUsernames] = useState([]);

  /* -------- fetch existing usernames once -------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'http://18.139.160.129:8000/api/users/getallUsers'
        );
        setExistingUsernames(data.map(u => u.username));
      } catch (err) {
        console.error('Error fetching users', err);
      }
    })();
  }, []);

  /* -------- validation -------- */
  const validate = () => {
    const err = {};
    if (!firstName)               err.firstName = 'First Name is required.';
    if (!lastName)                err.lastName  = 'Last Name is required.';
    if (!designation)             err.designation = 'Designation is required.';
    if (!/^\d{10}$/.test(contact))
      err.contact = 'Enter a valid 10‑digit contact number.';
    if (!username)                err.username = 'Username is required.';
    else if (existingUsernames.includes(username))
      err.username = 'Username already taken.';
    if (!company)                 err.company  = 'Company is required.';
    if (!password)                err.password = 'Password is required.';
    else if (!isStrongPassword(password))
      err.password = 'Password must be 8+ chars, with upper, lower & number.';
    if (!confirmPwd)              err.confirmPwd = 'Confirm Password is required.';
    else if (password !== confirmPwd)
      err.confirmPwd = 'Passwords do not match.';
    if (role === 'DepartmentAdmin' && !department)
      err.department = 'Department is required for Department Admin.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* -------- submit -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      firstName,
      lastName,
      designation,
      contact,
      username,
      selectedOption: role,
      password,
      companyName: company,
      department: role === 'DepartmentAdmin' ? department : null
    };

    try {
      await axios.post('http://18.139.160.129:8000/api/users', payload);
      alert('User created successfully!');
      handleReset();
    } catch (err) {
      console.error('Error creating user', err);
      alert('Error creating user. Please try again.');
    }
  };

  /* -------- reset -------- */
  const handleReset = () => {
    setFirstName(''); setLastName(''); setDesignation('');
    setContact(''); setUsername(''); setRole('');
    setPassword(''); setConfirmPwd(''); setShowPwd(false);
    setCompany(''); setDepartment(''); setErrors({});
  };

  /* ---------- UI ---------- */
  return (
    <div className="Users">
      <h1 className="userhead">User Registration</h1>
      <p>
        <Link to="/AdminDashboardPage">Dashboard</Link> /
        <Link to="/UsersRole"> User Registration</Link>
      </p>

      <fieldset>
        <form onSubmit={handleSubmit}>
          {/* ---- names ---- */}
          <div className="row">
            <div className="col-md-6">
              <label>First Name*</label>
              <input
                className="input"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="col-md-6">
              <label>Last Name*</label>
              <input
                className="input"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>

          {/* ---- job & contact ---- */}
          <div className="row">
            <div className="col-md-6">
              <label>Designation*</label>
              <input
                className="input"
                value={designation}
                onChange={e => setDesignation(e.target.value)}
              />
              {errors.designation && <span className="error">{errors.designation}</span>}
            </div>
            <div className="col-md-6">
              <label>Contact*</label>
              <input
                className="input"
                value={contact}
                onChange={e => setContact(e.target.value)}
              />
              {errors.contact && <span className="error">{errors.contact}</span>}
            </div>
          </div>

          {/* ---- username & company ---- */}
          <div className="row">
            <div className="col-md-6">
              <label>Username*</label>
              <input
                className="input"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>
            <div className="col-md-6">
              <label>Company Name*</label>
              <select
                value={company}
                onChange={e => setCompany(e.target.value)}
              >
                <option value="">Select Company</option>
                {companyOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.company && <span className="error">{errors.company}</span>}
            </div>
          </div>

          {/* ---- password ---- */}
          <label>Password*</label>
          <input
            className="input"
            type={showPwd ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <label>Confirm Password*</label>
          <input
            className="input"
            type={showPwd ? 'text' : 'password'}
            value={confirmPwd}
            onChange={e => setConfirmPwd(e.target.value)}
          />
          {errors.confirmPwd && <span className="error">{errors.confirmPwd}</span>}

          <label>
            <input
              type="checkbox"
              checked={showPwd}
              onChange={() => setShowPwd(!showPwd)}
            />{' '}
            Show Password
          </label>

          {/* ---- role ---- */}

          <div className='row'>
            <div className="col-md-6">
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="CompanyAdmin">Company Admin</option>
            <option value="DepartmentAdmin">Department Admin (HOD)</option>
            <option value="Audit">Audit</option>
          </select></div>
<div className="col-md-6">
          {/* ---- department (conditional) ---- */}
          {role === 'DepartmentAdmin' && (
            <div className="mb-3">
              <Select
                classNamePrefix="react-select"
                placeholder="Select Department"
                options={departmentOptions}
                value={
                  departmentOptions.find(opt => opt.value === department) || null
                }
                onChange={sel => setDepartment(sel ? sel.value : '')}
                isClearable
              />
              {errors.department && (
                <span className="error">{errors.department}</span>
              )}
            </div>
          )}</div></div>

          {/* ---- buttons ---- */}
          <div className="button-group">
            <button className="btn1" type="button" onClick={handleReset}>
              Reset
            </button>
            <button className="btn2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
}
