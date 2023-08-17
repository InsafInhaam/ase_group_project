import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

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

  console.log(bookings);


  // Generate PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    // Title and Date
    doc.setFontSize(18);
    doc.text("Recent Bookings Report", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);

    // Table Headers
    const headers = ['Passenger Name', 'Passenger Phone', 'Passenger Email', 'Seat Number', 'Order ID', 'Status'];
    const tableData = bookings.map(booking => [
      booking.passengerName,
      booking.contactNumber,
      booking.passengerEmail,
      booking.seatNumber,
      booking.orderId,
      'Completed' 
    ]);

    // Create Table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 40
    });

    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for choosing our service!', 105, doc.internal.pageSize.height - 10, { align: 'center' });

    doc.save('recent_bookings.pdf');
  };


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
              <h1>Bookings</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Bookings
                  </a>
                </li>
              </ul>
            </div>
            <a href="#" className="btn-download" >
              <i className="bx bxs-cloud-download" />
              <span className="text" onClick={handleDownloadPDF}>Download PDF</span>
            </a>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Bookings</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Passenger Name</th>
                    <th>passenger Phone.no</th>
                    <th>passenger Email</th>
                    <th>Seat Number</th>
                    <th>Order Id</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((booking) => (
                    <tr key={booking._id}>
                      {" "}
                      <td>
                        <p>{booking.passengerName}</p>
                      </td>
                      <td>{booking.contactNumber}</td>
                      <td>{booking.passengerEmail}</td>
                      <td>{booking.seatNumber.join(", ")}</td>
                      <td>{booking.orderId}</td>
                      <td>
                        <span className="status completed">Completed</span>
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                    <td>
                      <img src="img/people.png" />
                      <p>John Doe</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <span className="status pending">Pending</span>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </div>
  );
};

export default Bookings;
