import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { stations } from "../utils/stations";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Train = () => {
  const history = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    source: "",
    sourceLat: "",
    sourceLng: "",
    destination: "",
    destinationLat: "",
    destinationLng: "",
    availableDate: "",
    availableTime: "",
    price: "",
    trainType: "",
    seats: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSourceChange = (e) => {
    setFormData((prevData) => ({ ...prevData, source: e.target.value }));
  };

  const handleDestinationChange = (e) => {
    setFormData((prevData) => ({ ...prevData, destination: e.target.value }));
  };

  const handleSeatChange = (index, isBooked) => {
    setFormData((prevData) => ({
      ...prevData,
      seats: prevData.seats.map((seat, i) =>
        i === index ? { ...seat, isBooked } : seat
      ),
    }));
  };

  const addSeat = () => {
    setFormData((prevData) => ({
      ...prevData,
      seats: [
        ...prevData.seats,
        { number: `${prevData.seats.length + 1}`, isBooked: false },
      ],
    }));
  };

  const addMultipleSeats = (count) => {
    const newSeats = Array.from({ length: count }, (_, index) => ({
      number: `${formData.seats.length + index + 1}`,
      isBooked: false, // You can set this to false if you want the seats to be unbooked by default
    }));
    setFormData((prevData) => ({
      ...prevData,
      seats: [...prevData.seats, ...newSeats],
    }));
  };

  const handleRemoveSeat = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      seats: prevData.seats.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/train/trains",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        // Train added successfully, you can redirect or show a success message here
        // console.log(response)
        toast.success("Train created successfully");
        history("/viewtrains");
      } else {
        // Handle error, show error message or take appropriate action
        toast.error("Error creating train: " + response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
                    Add New Train
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="container mt-5 shadow-lg p-3 mb-5 bg-white rounded">
            <h2 className="mb-4">Add a New Train</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="trainname" className="form-label">
                  Train Name
                </label>
                <div className="form-group first">
                  <input
                    type="text"
                    name="name"
                    id="trainname"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="fromStation" className="form-label">
                  From Station
                </label>
                <div className="form-group first">
                  <select
                    className="form-control"
                    id="fromStation"
                    value={formData.source}
                    onChange={handleSourceChange}
                  >
                    <option value="" disabled defaultChecked>
                      Select a Station
                    </option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.name}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="sourceLat" className="form-label">
                  Source Latitude
                </label>
                <div className="form-group first">
                  <input
                    type="text"
                    name="sourceLat"
                    id="sourceLat"
                    className="form-control"
                    value={formData.sourceLat}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="sourceLng" className="form-label">
                  Source Longitude
                </label>
                <div className="form-group first">
                  <input
                    type="text"
                    name="sourceLng"
                    id="sourceLng"
                    className="form-control"
                    value={formData.sourceLng}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="toStation" className="form-label">
                  To Station
                </label>
                <div className="form-group first">
                  <select
                    className="form-control"
                    id="toStation"
                    value={formData.destination}
                    onChange={handleDestinationChange}
                  >
                    <option value="" disabled defaultChecked>
                      Select a Station
                    </option>
                    {stations.map((station) => (
                      <option key={station.id} value={station.name}>
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="destinationLat" className="form-label">
                  Destination Latitude
                </label>
                <div className="form-group first">
                  <input
                    type="text"
                    name="destinationLat"
                    id="destinationLat"
                    className="form-control"
                    value={formData.destinationLat}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="destinationLng" className="form-label">
                  Destination Longitude
                </label>
                <div className="form-group first">
                  <input
                    type="text"
                    name="destinationLng"
                    id="destinationLng"
                    className="form-control"
                    value={formData.destinationLng}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="traintype" className="form-label">
                  Train Type:
                </label>
                <select
                  value={formData.trainType}
                  onChange={handleChange}
                  id="traintype"
                  className="form-control"
                  name="trainType" // Ensure the name attribute is set correctly
                >
                  <option value="" disabled defaultChecked>
                    Selecte Train Type
                  </option>
                  <option value="business">Business</option>
                  <option value="normal">Normal</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="availableDate" className="form-label">
                  Available Train Date:
                </label>
                <div className="form-group first">
                  <input
                    type="date"
                    name="availableDate"
                    value={formData.availableDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="availableTime" className="form-label">
                  Available Train Time:
                </label>
                <div className="form-group first">
                  <input
                    type="time"
                    name="availableTime"
                    value={formData.availableTime}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Train Price:
                </label>
                <div className="form-group first">
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <h3>Seats:</h3>
              <div className="seats-container">
                {formData.seats.map((seat, index) => (
                  <div key={index} className="seat-box">
                    <span>Seat No {seat.number}</span>
                    <button
                      type="button"
                      className="remove-seat"
                      onClick={() => handleRemoveSeat(index)}
                    >
                      &times;
                    </button>
                    <input
                      type="checkbox"
                      checked={seat.isBooked}
                      onChange={(e) =>
                        handleSeatChange(index, e.target.checked)
                      }
                      className="form-control"
                    />
                  </div>
                ))}
              </div>
              <br />
              <button
                type="button"
                onClick={addSeat}
                className="btn btn-primary"
              >
                Add Seat
              </button>
              &nbsp; &nbsp;
              <button
                type="button"
                onClick={() => addMultipleSeats(10)}
                className="btn btn-primary"
              >
                Add 10 Seats
              </button>
              <br />
              <br />
              <button type="submit" className="btn btn-primary">
                Add Train
              </button>
            </form>
          </div>
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </div>
  );
};

export default Train;
