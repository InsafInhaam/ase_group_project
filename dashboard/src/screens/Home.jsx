import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";



const Home = () => {

  //Revenue fetched
  
  
  return (
    <div>
      {/* SIDEBAR */}
      <Sidebar />
      {/* SIDEBAR */}
      {/* CONTENT */}
      <section id="content">
        {/* NAVBAR */}
        <Navbar />
        {/* NAVBAR */}
        {/* MAIN */}
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
            <a href="#" className="btn-download">
              <i className="bx bxs-cloud-download" />
              <span className="text">Download PDF</span>
            </a>
          </div>
          <ul className="box-info">
            <li>
              <i className="bx bxs-calendar-check" />
              <span className="text">
                <h3>1020</h3>
                <p>New Booking</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group" />
              <span className="text">
                <h3>2834</h3>
                <p>Visitors</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle" />
              <span className="text">
                <h3>$2543</h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>
         
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </div>
  );
};

export default Home;
