import React from 'react';
import './companynav.css'
import { Link } from 'react-router-dom';

const CompanyNavBar = () => {


  return (
    <div className='main'>
        
      
      <div id="nav-bar">
        <input id="nav-toggle" type="checkbox" />
        <div id="nav-header">
          <a id="nav-title" href="https://www.vellaglobal.com/" target="_blank" rel="noopener noreferrer">
            Company
          </a>
          <label htmlFor="nav-toggle" style={{ marginRight: '30px' }}>
            <span id="nav-toggle-burger" ></span>

          </label>
          <hr />
        </div>
        <div id="nav-content">
          <div className="nav-button">
            <i className="fas fa-palette"></i>
            <Link to="/CompanyDashBoard" className="nav-link">Dashboard</Link>
          </div>
          <div className="nav-button">
            <i className="fas fa-calendar-days "></i>
            <Link to="/UsersRole" className="nav-link"> Add Users Role</Link>
          </div>
          <div className="nav-button">
            <i className="fas fa-gear"></i>
            <a href="AssetRegistration" className="nav-link">Asset Registration</a>
          </div>
          <div className="nav-button">
            <i className="fas fa-handshake"></i>
            <a href="/ServiceInfo" className="nav-link">
            Service</a>
          </div>
          <hr />
          <div className="nav-button">
            <i className="fas fa-user"></i>
            <a href="/UserInfo" className="nav-link">Users</a>
          </div>

          <div id="nav-content-highlight"></div>
        </div>
        <input id="nav-footer-toggle" type="checkbox" />
        <div id="nav-footer">
          <div id="nav-footer-heading">
            <div id="nav-footer-avatar">
              <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="Avatar" />
            </div>
            <div id="nav-footer-titlebox">
              <a id="nav-footer-title" href="https://www.vellaglobal.com/" target="_blank" rel="noopener noreferrer">
                Admin
              </a>
              <span id="nav-footer-subtitle">Admin</span>
            </div>

          </div>

        </div>
      </div>

      
     </div>
     


  );
};

export default CompanyNavBar;

