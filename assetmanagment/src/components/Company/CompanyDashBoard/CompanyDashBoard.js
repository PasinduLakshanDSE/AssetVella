import React, { useEffect, useState } from "react";
import axios from "axios";
import '../CompanyNav/companynav.css'
import CompanyNavBar from "../CompanyNav/CompanyNav";



const CompanyDashBord = () => {
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
    { count: bookings.length, label: "Total Booking", color: "blue", icon: <i className="fas fa-calendar-days si"></i> },
    { count: techniciansCount, label: "Total Technician", color: "green", icon: <i className="fas fa-gear si"></i> },
    { count: servicesCount, label: "Total Service", color: "teal", icon: <i className="fas fa-handshake si"></i> },
    { count: usersCount, label: "Total Users", color: "red", icon: <i className="fas fa-user si"></i> },
  ];

  return (
    <div>
    
<CompanyNavBar/>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="title">Dashboard</h1>
          <p>Home / Dashboard</p>
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
                <p>{card.label}</p>
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

export default CompanyDashBord;
