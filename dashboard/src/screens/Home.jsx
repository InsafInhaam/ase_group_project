import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BarChart from "../components/BarChart";

const Home = () => {
  //Fetching

  const [totalRevenue, setTotalRevenue] = useState([]);
  const [netIncome, setNetIncome] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/revenue/total", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setTotalRevenue(result);
      });
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/revenue/net-income", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setNetIncome(result);
      });
  }, []);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/booking/allbookings", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBookings(result);
      });
  }, []);

  console.log(netIncome.netIncome);

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
                <h3>{bookings.length}</h3>
                <p>Total Booking</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-group" />
              <span className="text">
                <h3>LKR {netIncome.netIncome}</h3>
                <p>Net Income</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle" />
              <span className="text">
                <h3>LKR {totalRevenue.totalPrice}</h3>
                <p>Total Revenue</p>
              </span>
            </li>
          </ul>
        </main>
        <h1>Monthly Bookings</h1>
        <BarChart />

        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </div>
  );
};

export default Home;
