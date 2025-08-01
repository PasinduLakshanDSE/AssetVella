import React from "react";
import "./about.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="homepage1" style={{ backgroundImage: `url('./Vella.jpg')` }}>
      <div className="overlay"></div>
      <div className="about-container colorful-bg">
        <div className="about-content colorful-card">
          <h1 className="about-title gradient-text">About Vella</h1>

          <h2 className="about-subtitle gradient-text">A Legacy of Excellence</h2>
          <p className="about-text slide-in-right">
           Vella Group, founded in 1971 by Mr. A. P. D. Abeyrathne with the acquisition of Uva Halpewatte Tea Estate, began as a family-run tea business and has since evolved into a diversified conglomerate. Expanding into leisure in 2012 with 98 Acres Resort & Spa, the group has grown to include Halpé Tea exports, Flying Ravana Adventure Park, Ravana Pool Club, boutique villas, and attractions like Ella Swing. Today, with over 10 companies across sectors including IT and strategic investments like Kiri Kōpi, Vella remains committed to its family values while showcasing the best of Sri Lanka to the world.
            {/* Truncated for brevity */}
          </p>

          <div className="divider"></div>

          <h2 className="about-subtitle gradient-text">Our Company </h2>
          <div className="photo-gallery">
            {["vellalogo.jpg","98.png", "FR.png", "lee.png","RPC.png","swing.png","vala.png", "tea.png","kirikopi.jpg"].map((img, idx) => (
              <div key={idx} className="photo-card">
                <img src={`./${img}`} alt={`Vella ${idx + 1}`} className="gallery-img" />
              </div>
            ))}
          </div>

          <div className="divider"></div>

          <h2 className="about-subtitle gradient-text"> Our Leadership</h2>
          <div className="about-team">
            {["Chamara Abeyratna", "Ranga Abeyrathne", "Eranda Aberathna", "Dr. Kumudu Gunasekera"].map((name, index) => (
              <div key={index} className="team-member zoom-in colorful-card">
                <h3 className="t1">{name}</h3>
                <p>{index === 3 ? "Deputy Chairman" : "Director & Co-Founder"}</p>
              </div>
            ))}
          </div>

          <Link to="/" className="about-link fade-in vibrant-link">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
