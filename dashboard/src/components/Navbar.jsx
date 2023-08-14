import React, { useState } from "react";
import adminIcon from "../assets/admin.png";

const Navbar = () => {

  let time = new Date().toLocaleTimeString();

  const [ctime, setCtime] = useState(time);
  const Update = () => {
    let time = new Date().toLocaleTimeString();
    setCtime(time);
  };

  setInterval(Update, 1000)
  return (
    <nav>
    <>
      <div className="currenttime">
        <h2>{ctime}</h2>
        
      </div>
    </>
      
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
