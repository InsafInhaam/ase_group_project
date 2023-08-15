import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

// Register the necessary components with Chart.js
Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function LineChart() {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/booking/allbookings", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBookingData(result);
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
      });
  }, []);

  // Group bookings by date
  const groupedData = bookingData.reduce((acc, booking) => {
    acc[booking.bookingDate] = (acc[booking.bookingDate] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Bookings",
        data: Object.values(groupedData),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;

// src/LineChart.js
// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart,
//   LineController,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
// } from "chart.js";

// // Register the necessary components with Chart.js
// Chart.register(
//   LineController,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement
// );

// function LineChart() {
//   const [totalRevenue, setTotalRevenue] = useState([]);
//   const [netIncome, setNetIncome] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     fetch(process.env.REACT_APP_API_URL + "/revenue/total", {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setTotalRevenue(result);
//       });
//   }, []);

//   useEffect(() => {
//     fetch(process.env.REACT_APP_API_URL + "/revenue/net-income", {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setNetIncome(result);
//       });
//   }, []);

//   useEffect(() => {
//     fetch(process.env.REACT_APP_API_URL + "/booking/allbookings", {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("jwt"),
//       },
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setBookings(result);
//       });
//   }, []);

//   //   console

//   // Assuming all datasets have the same dates for simplicity
//   const data = {
//     labels: totalRevenue.map((item) => item.date),
//     datasets: [
//       {
//         label: "Total Revenue",
//         data: totalRevenue.map((item) => item.value),
//         fill: false,
//         borderColor: "rgba(54, 162, 235, 1)",
//         tension: 0.1,
//       },
//       {
//         label: "Net Income",
//         data: netIncome.map((item) => item.value),
//         fill: false,
//         borderColor: "rgba(255, 99, 132, 1)",
//         tension: 0.1,
//       },
//       {
//         label: "Bookings",
//         data: bookings.map((item) => item.count),
//         fill: false,
//         borderColor: "rgba(75, 192, 192, 1)",
//         tension: 0.1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// }

// export default LineChart;