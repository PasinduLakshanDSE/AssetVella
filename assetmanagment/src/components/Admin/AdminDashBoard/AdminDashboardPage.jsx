import React, { useEffect, useState } from "react";
import axios from "axios";
import './admindashboard.css'
import AdminNavBar from "../AdminNav/AdminNav";
import { Link } from "react-router-dom";


const DashBoard = () => {
  const [bookings, setBookings] = useState([]);
  const [techniciansCount, setTechniciansCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [usersCount, setUsers] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const bookingsResponse = await axios.get("/api/bookings/getallbookings");
        setBookings(bookingsResponse.data);

        // Fetch additional counts from relevant endpoints
        const techniciansResponse = await axios.get("/api/technicians/gettechnician");
        setTechniciansCount(techniciansResponse.data.length);

        const servicesResponse = await axios.get("/api/services/getallservices");
        setServicesCount(servicesResponse.data.length);

        const usersResponse = await axios.get("/api/users/getallUsers");
        setUsers(usersResponse.data.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const cards = [
    { count: bookings.length, label: "Total Asset", color: "blue", icon: <i className="fas fa-house-laptop si"></i> },
    { count: techniciansCount, label: "Total Admin ", color: "green", icon: <i className="fas fa-user-tie si"></i> },
    { count: servicesCount, label: "Total Company Users ", color: "teal", icon: <i className="fas fa-user si"></i> },
    { count: usersCount, label: "Total Department Users", color: "red", icon: <i className="fas fa-users si"></i> },
  ];

  return (
    <div>
      <AdminNavBar/>

      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="title">Dashboard</h1>
          <p>
        <Link to="/">Home</Link> / <Link to="/AdminDashboardPage">DashBoard</Link>
      </p>
        </div>

        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div
              key={index}
              className="dashboard-card"
              style={{ backgroundColor: card.color }}
            >
              <div className="card-content">
                <h2>{card.count}</h2>
                <p className="clabel">{card.label}</p>
              </div>
              <div className="card-icon">
                {card.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
