import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { trainImg } from "../assets/images";
import { toast } from "react-hot-toast";
// import trainImg from "../assets/images/trainAnimation.png";

const BookingTrain = () => {
  const history = useNavigate();
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const trainId = location.pathname.split("/")[2];

  // const trainId = queryParams.get("trainId");
  // console.log(trainId);

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
    if (selectedSeats.length == 0) {
      toast.error("Please select the train seats needed");
      return;
    }

    console.log(selectedSeats)

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
    <>
      <Navbar />
      <section className="BookTrainTicketSection">
        <br />
        <div className="container mb-3">
          <h3
            className=""
            style={{ color: "#fff", fontSize: "35px", fontWeight: 400 }}
          >
            Book Train Ticket
          </h3>
          <hr style={{ color: "#fff", width: "50" }} />

          <div className="mb-4">
            <div className="row">
              {/* 1st column  */}
              <div className="col-md-7 mt-3">
                <div className="card shadow mb-2">
                  <div className="card-header ">
                    <h4>Train Details</h4>
                  </div>
                  <div className="card-bod">
                    {/* Display the train details (source, departure, train date, and time) here */}
                    {/* Use the trainId to fetch the specific train details and display them */}
                    <>
                      <div className="container ">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="train-animation">
                              <img
                                src={trainImg}
                                alt="Train"
                                className="train"
                              />
                            </div>
                          </div>
                          <div className="col-md-12 d-flex ">
                            <p>
                              <strong>Name:</strong> {trainDetails.name}
                            </p>
                            <p>
                              <i
                                className="fa fa-exchange"
                                aria-hidden="true"
                              />
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Source:</strong> {trainDetails.source}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Destination:</strong>
                              {trainDetails.destination}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Date and Time:</strong>
                              {trainDetails.availableDate} |&nbsp;
                              {trainDetails.availableTime}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <strong>Per Train Seat Price: LKR </strong>
                              {trainDetails.price}.00
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
              {/* 2nd column  */}
              <div className="col-md-5 mb-4 mt-3">
                <div className="card shadow">
                  <div className="card-header">
                    <h4>Passanger Details</h4>
                  </div>
                  <div className="card-body bg-light">
                    <div className="">
                      <p>
                        <strong>Name:</strong> {user.name}
                      </p>
                    </div>
                    <div className="">
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                    </div>
                    <div className="">
                      <p>
                        <strong>Address:</strong> {user.address}
                      </p>
                    </div>
                    <div className="">
                      <p>
                        <strong>Phone: </strong>
                        {user.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* 2nd row seats book   */}
              <div className="col-md-12 mt-3">
                <div className="">
                  <div className="card shadow">
                    <div className="card-header">
                      <h4>Choose Seats</h4>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-wrap p-3 ">
                        {formData.seats.map((seat, index) => (
                          <label
                            key={index}
                            className={`seat-box m-1 ${
                              seat.isBooked ? "disabled" : ""
                            }`}
                          >
                            <span>Seat No {seat.number}</span>
                            <input
                              type="checkbox"
                              checked={
                                seat.isBooked ||
                                selectedSeats.includes(seat.number)
                              }
                              onChange={(e) =>
                                handleSeatChange(index, e.target.checked)
                              }
                              disabled={seat.isBooked}
                            />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 d-flex justify-content-center py-5">
            {/* <button className="">Confirm Booking</button> */}
            <button
              onClick={handleFormSubmission} // Implement the form submission function
              style={{
                background: "#ee580f",
                color: "#fff",

                fontSize: "15px",
                fontWeight: 400,
                border: "solid #ee580f 1px",
                padding: "10px 45px",
              }}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingTrain;
