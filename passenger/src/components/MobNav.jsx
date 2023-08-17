import React from "react";

const MobNav = () => {
  return (
    <nav className="Mob_Nav_Bar_Bottom">
      <ul className="shadow">
        <li>
          <a href="home">
            <i className="fa fa-home fa-2x" aria-hidden="true" /> <br />{" "}
            <p>Home</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-comments fa-2x" aria-hidden="true"></i>
            <br /> <p>Chats</p>{" "}
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-book fa-2x" aria-hidden="true" />
            <br /> <p>Booked Items</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-user fa-2x" aria-hidden="true" />
            <br /> <p>User</p>{" "}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default MobNav;