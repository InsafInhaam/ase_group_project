import React from "react";

const Navbar = () => {
  return (
    <nav>
      <i className="bx bx-menu" />
      <a href="#" className="nav-link">
        Categories
      </a>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <i className="bx bx-search" />
          </button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode" className="switch-mode" />
      <a href="#" className="notification">
        <i className="bx bxs-bell" />
        <span className="num">8</span>
      </a>
      <a href="#" className="profile">
        <img src="img/people.png" />
      </a>
    </nav>
  );
};

export default Navbar;
