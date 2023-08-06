import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const BookingTrain = () => {
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const trainId = location.pathname.split("/")[2];

  const queryParams = new URLSearchParams(location.search);
  // const trainId = queryParams.get("trainId");
  console.log(trainId);

  const [formData, setFormData] = useState({
    seats: [], // Fill this with the seats data from the fetched train details
  });

  // Function to fetch train details
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/train/trains/${trainId}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setFormData({
          ...formData,
          seats: result.seats,
        });
      })
      .catch((error) => {
        console.log("Error fetching train details:", error);
      });
  }, [trainId, formData]);

  // Function to handle seat selection
  const handleSeatChange = (index, isChecked) => {
    const updatedSeats = [...formData.seats];
    updatedSeats[index].isBooked = isChecked;
    setFormData({ ...formData, seats: updatedSeats });
  };

  // Function to handle form submission (You can implement the submission logic here)

  return (
    <div className="container mt-5 bg-white p-5 border-rounded">
      <h2 className="text-center">Booking Train</h2>
      <div className="mb-4">
        <h3>Train Details</h3>
        {/* Display the train details (source, departure, train date, and time) here */}
        {/* Use the trainId to fetch the specific train details and display them */}
        {/* For example: */}
        <p>Source: Colombo Fort</p>
        <p>Departure: Matara</p>
        <p>Date and Time: 2023-08-07 10:00 AM</p>
      </div>
      <div className="mb-4">
        <h3>User Details</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Address: {user.address}</p>
        <p>Phone: {user.phone}</p>
      </div>
      <div className="mb-4">
        <h3>Choose Seats</h3>
        <div className="d-flex align-items-center flex-wrap">
          {formData.seats.map((seat, index) => (
            <label key={index} className="seat-box m-1">
              <span>Seat No {seat.number}</span>
              <input
                type="checkbox"
                checked={seat.isBooked}
                onChange={(e) => handleSeatChange(index, e.target.checked)}
                // className="form-control"
              />
            </label>
          ))}
        </div>
      </div>
      <button
        className="btn btn-primary"
        // onClick={handleFormSubmission} // Implement the form submission function
      >
        Submit Booking
      </button>
    </div>
  );
};

export default BookingTrain;
