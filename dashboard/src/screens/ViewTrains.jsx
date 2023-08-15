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
  }, [trains]);

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
            <a href="/trains" className="btn-download">
              <i className="bx plus" />
              <span className="text">Add New Train</span>
            </a>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Train</h3>
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
