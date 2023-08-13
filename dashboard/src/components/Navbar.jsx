import React from "react";
import adminIcon from "../assets/admin.png";

const Navbar = () => {
  return (
    <nav>
      <div className="currenttime">
        
      </div>
      <div className="navbar-icons">
        <a href="#" className="notification">
          <i className="bx bxs-bell" />
          <span className="num">8</span>
        </a>
        <a href="#" className="profile">
          <img src={adminIcon} alt="Admin Icon" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
