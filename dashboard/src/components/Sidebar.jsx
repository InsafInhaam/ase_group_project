import React from "react";
import MainLogo from '../assets/logo1.png';

const Sidebar = () => {
  return (
    <div>
      <section id="sidebar">
        <a href="#" className="brand">
          <img src={MainLogo} alt="logo" className="mainlogo" />
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="/">
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/bookings">
              <i className="bx bxs-shopping-bag-alt" />
              <span className="text">Bookings</span>
            </a>
          </li>
          <li>
            <a href="/viewtrains">
              <i className="bx bxs-doughnut-chart" />
              <span className="text">Trains</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-message-dots" />
              <span className="text">Message</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bxs-group" />
              <span className="text">Team</span>
            </a>
          </li>
          <li>
            <a href="/add-admin">
              <i className="bx bxs-user-plus" />
              <span className="text">Admin</span>
            </a>
          </li>
          <li>
            <a href="/passenger">
              <i className="bx bxs-user-plus" />
              <span className="text">Passenger</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-cog" />
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout">
              <i className="bx bxs-log-out-circle" />
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Sidebar;
