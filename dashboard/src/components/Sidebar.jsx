import React from "react";
import MainLogo from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  // Get the active state from Redux store
  const activeItem = useSelector((state) => state.activeItem);

  const handleItemClick = (itemName, route) => {
    dispatch({ type: "SET_ACTIVE_ITEM", payload: itemName }); // Update active state
    history(route); // Navigate to the clicked route
  };

  return (
    <div>
      <section id="sidebar">
        <a href="#" className="brand">
          <img src={MainLogo} alt="logo" className="mainlogo" />
        </a>
        <ul className="side-menu top">
          <li className={activeItem === "Dashboard" ? "active" : ""}>
            <a href="#" onClick={() => handleItemClick("Dashboard", "/")}>
              <i className="bx bxs-dashboard" />
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li className={activeItem === "Bookings" ? "active" : ""}>
            <a
              href="#"
              onClick={() => handleItemClick("Bookings", "/bookings")}
            >
              <i className="bx bxs-shopping-bag-alt" />
              <span className="text">Bookings</span>
            </a>
          </li>
          <li className={activeItem === "Trains" ? "active" : ""}>
            <a
              href="#"
              onClick={() => handleItemClick("Trains", "/viewtrains")}
            >
              <i className="bx bxs-doughnut-chart" />
              <span className="text">Trains</span>
            </a>
          </li>
          {/* <li>
            <a href="/ChatMessage">
              <i className="bx bxs-message-dots" />
              <span className="text">Message</span>
            </a>
          </li> */}
          <li className={activeItem === "Expenses" ? "active" : ""}>
            <a
              href="#"
              onClick={() => handleItemClick("Expenses", "/expenses")}
            >
              <i className="bx bxs-group" />
              <span className="text">Expenses</span>
            </a>
          </li>
          <li className={activeItem === "Admin" ? "active" : ""}>
            <a href="#" onClick={() => handleItemClick("Admin", "/add-admin")}>
              <i className="bx bxs-user-plus" />
              <span className="text">Admin</span>
            </a>
          </li>
          <li className={activeItem === "Passenger" ? "active" : ""}>
            <a
              href="#"
              onClick={() => handleItemClick("Passenger", "/passenger")}
            >
              <i className="bx bxs-user" />
              <span className="text">Passenger</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          {/* <li>
            <a href="#">
              <i className="bx bxs-cog" />
              <span className="text">Settings</span>
            </a>
          </li> */}
          <li>
            <a
              href="#"
              className="logout"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "LOGOUT" });
                history("/login");
              }}
            >
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
