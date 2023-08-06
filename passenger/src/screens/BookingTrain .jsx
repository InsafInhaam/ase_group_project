import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useHistory } from "react-router-dom";

const BookingTrain = () => {
  const history = useNavigate();
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const trainId = location.pathname.split("/")[2];

  // const trainId = queryParams.get("trainId");
  console.log(trainId);

  const [formData, setFormData] = useState({
    seats: [], // Fill this with the seats data from the fetched train details
  });

  const [trainDetails, setTrainDetails] = useState([]);

  const [selectedSeats, setSelectedSeats] = useState([]);

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
        setTrainDetails(result);
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

    // Update selected seats state
    if (isChecked) {
      setSelectedSeats([...selectedSeats, updatedSeats[index].number]);
    } else {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat !== updatedSeats[index].number)
      );
    }
  };

  // console.log(selectedSeats)
  // Function to handle form submission
  const handleFormSubmission = () => {
    // Create an object containing all the data you want to send to the backend
    const bookingData = {
      trainId: trainDetails._id,
      trainName: trainDetails.name,
      source: trainDetails.source,
      destination: trainDetails.destination,
      availableDate: trainDetails.availableDate,
      availableTime: trainDetails.availableTime,
      seats: selectedSeats,
      price: trainDetails.price,
      // Add any other user details you want to include in the booking
      // For example: userName: user.name, userEmail: user.email, etc.
    };

    // Send the data to the backend using fetch or any other method
    history("/summary", { state: { bookingData: bookingData } });
  };

  return (
    <div className="container mt-5 bg-white p-5 border-rounded">
      <h2 className="text-center">Booking Train</h2>
      <br /> <br />
      <div className="mb-4">
        <h3>Train Details</h3>
        {/* Display the train details (source, departure, train date, and time) here */}
        {/* Use the trainId to fetch the specific train details and display them */}
        <>
          <p>
            <strong>Name:</strong> {trainDetails.name}
          </p>
          <p>
            <strong>Source:</strong> {trainDetails.source}
          </p>
          <p>
            <strong>Destination:</strong> {trainDetails.destination}
          </p>
          <p>
            <strong>Date and Time:</strong> {trainDetails.availableDate}
            {trainDetails.availableTime}
          </p>
          <p>
            <strong>Per Train Seat Price:</strong> {trainDetails.price}
          </p>
        </>
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
            <label
              key={index}
              className={`seat-box m-1 ${seat.isBooked ? "disabled" : ""}`}
            >
              <span>Seat No {seat.number}</span>
              <input
                type="checkbox"
                checked={seat.isBooked || selectedSeats.includes(seat.number)}
                onChange={(e) => handleSeatChange(index, e.target.checked)}
                disabled={seat.isBooked}
              />
            </label>
          ))}
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleFormSubmission} // Implement the form submission function
      >
        Submit Booking
      </button>
    </div>
  );
};

export default BookingTrain;
