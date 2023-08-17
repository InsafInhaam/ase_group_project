import React, { useState, useEffect } from "react";
import PaymentModal from "./../PaymentModal/PaymentModal";
import md5 from "crypto-js/md5";
import { useSelector } from "react-redux";

const BookingTicket = () => {
  // const user = useSelector((state) => state.user);
  // console.log(user.email);

  const [getCurrentUser, setGetCurrentUser] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/passenger/getprofile/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setGetCurrentUser(result);
      });
  }, [getCurrentUser]);

  const user = getCurrentUser;

  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState("");
  const [availableSeats, setAvailableSeats] = useState([]);
  // const [selectedTrainPrice, setSelectedTrainPrice] = useState("");
  const [selectedSeat, setSelectedSeat] = useState("");

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  // const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [productname, setProductname] = useState("");
  // const [trainId, setTrainId] = useState('')
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/train/alltrain")
      .then((res) => res.json())
      .then((result) => {
        setTrains(result);
      });
  }, []);

  const handleTrainChange = (e) => {
    const selectedTrainId = e.target.value;
    setSelectedTrain(selectedTrainId);
    const selectedTrain = trains.find((train) => train._id === selectedTrainId);
    setAmount(selectedTrain.price);
    setAvailableSeats(selectedTrain.seats);
    setProductname(selectedTrain.name);
  };

  // console.log(amount);

  const merchantSecret =
    "NDIyMjA5MjQ3ODM3MDU5MzU3NDIyMzM5MTY5OTk2MTU4NTY4NDU1Ng==";
  const orderId =
    Date.now().toString() + Math.random().toString(36).substr(2, 9);
  const currency = "LKR";
  const merchantId = " ";
  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  console.log(amount);
  let amountFormated = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const hash = md5(
    merchantId + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();

  return (
    <div className="auth-inner">
      <div>
        <h2>Train Booking System</h2>
        <br />
        <form>
          <div className="mb-3">
            <label>Choose Train</label>
            <select
              name="train"
              id="train"
              className="form-control"
              value={selectedTrain}
              onChange={handleTrainChange}
            >
              <option value="" selected disabled hidden>
                Choose Train
              </option>

              {trains.map((train) => (
                <option value={train._id} key={train._id}>
                  {train.name} From: {train.source} - To: {train.destination}{" "}
                  price: {train.price}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Available Seats</label>
            <select
              name="seats"
              id="seats"
              className="form-control"
              value={selectedSeat}
              onChange={(e) => setSelectedSeat(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Choose Seat
              </option>
              {availableSeats.map((seat) => (
                <option
                  value={seat.number}
                  key={seat._id}
                  disabled={seat.isBooked === true}
                >
                  {seat.number}{" "}
                  {seat.isBooked == true ? "Seat Booked" : "Seat Available"}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Booking Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter date for booking"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Booking Time</label>
            <input
              type="time"
              className="form-control"
              placeholder="Enter time for booking"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>

          {/* <div className="mb-3">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div> */}

          <div className="mb-3">
            <label>Contact Number</label>
            <input
              type="contact"
              className="form-control"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="d-grid">
            {/* <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmit()}
          >
            Submit
          </button> */}
            <PaymentModal
              // Use a unique value for the orderId
              trainId={selectedTrain}
              seatNumber={selectedSeat}
              bookingDate={bookingDate}
              bookingTime={bookingTime}
              passengerName={user.name}
              email={user.email}
              phone={phone}
              orderId={orderId}
              passengerId={user.id}
              name={productname}
              amount={amount}
              currency={currency}
              hash={hash}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingTicket;
