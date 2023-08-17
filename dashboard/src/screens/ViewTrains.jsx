import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NotifyModel from "../components/NotifyModel";

const ViewTrains = () => {
  const [trains, setTrains] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTrainId, setCurrentTrainId] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/train/alltrain")
      .then((res) => res.json())
      .then((result) => {
        setTrains(result);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/train/trains/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
      });
  };

  const openModal = (id) => {
    setCurrentTrainId(id);
    setShowModal(true);
  };

  const closeModel = () => {
    setCurrentTrainId(null);
    setShowModal(false);
  };

  const handleTrainPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    doc.setFontSize(16);
    doc.text("Train Report", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);

    const headers = ['Train Name', 'Source', 'Destination', 'Available Date', 'Available Time', 'Seats', 'Price', 'Train Type'];
    const tableData = trains.map(train => [
      train.name,
      train.source,
      train.destination,
      train.availableDate,
      train.availableTime,
      train.seats.map(seat => `${seat.number} (${seat.isBooked ? "Booked" : "Available"})`).join("\n"),
      train.price,
      train.trainType
    ]);

    const tableOptions = {
      startY: 40,
      styles: { textColor: [30, 30, 30], fontSize: 10, halign: 'center' },
      columnStyles: {

        5: { columnWidth: 40 }, // Seats
 
      },
      headStyles: { fillColor: [71, 71, 71], textColor: [255, 255, 255] },
      margin: { top: 20 },
      addPageContent: (data) => {
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Thank you for choosing our service!', 105, doc.internal.pageSize.height - 10, { align: 'center' });
      }
    };

    doc.autoTable(headers, tableData, tableOptions);

    doc.save('train_report.pdf');
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
              <h1>Trains</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Trains
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn-wrapper d-flex ">
              <a href="/trains" className="btn-download mr-2">
                <ion-icon name="add-circle"></ion-icon>
                <span className="text">Add New Train</span>
              </a>
              <a href="#" className="btn-download">
                <i className="bx bxs-cloud-download" />
                <span className="text" onClick={handleTrainPDF}>Download PDF</span>
              </a>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Trains</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Train Name</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Available Date</th>
                    <th>Available Time</th>
                    <th>Seats</th>
                    <th>Price</th>
                    <th>Train Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trains.map((train) => (
                    <tr key={train._id}>
                      <td>
                        <p>{train.name}</p>
                      </td>
                      <td>{train.source}</td>
                      <td>{train.destination}</td>
                      <td>{train.availableDate}</td>
                      <td>{train.availableTime}</td>
                      <td className="scrollable-cell">
                      <div className="table-traindata">
                            {train.seats.map((trainseats) => (
                          <p>
                            {trainseats.number} :
                            {trainseats.isBooked ? "Booked" : "Not Booked"}
                          </p>
                        ))}
                        
                      </div>
                    
                      </td>
                      <td>{train.price}</td>
                      <td>{train.trainType}</td>
                      <td>
                        <button className="btn btn-warning">Edit</button>
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(train._id)}
                        >
                          Trash
                        </button>
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-secondary"
                          onClick={() => openModal(train._id)}
                        >
                          Notify
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <NotifyModel
            show={showModal}
            handleClose={closeModel}
            trainId={currentTrainId}
          />
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </div>
  );
};

export default ViewTrains;
