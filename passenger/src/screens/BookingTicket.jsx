import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingTicket = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/train/alltrain", {
      // headers: {
      //   Authorization: "Bearer " + localStorage.getItem("jwt"),
      // },
    })
      .then((res) => res.json())
      .then((result) => {
        setTrains(result);
        // console.log(result)
      });
  }, [trains]);

  console.log(trains);

  return (
    <div>
      <h2>Train Booking System</h2>
      <br />
      <form>
        <div className="mb-3">
          <label>Choose Train</label>
          <select name="train" id="train" className="form-control">
          {trains?.map((train) => {
            return(
              <option value={train._id} key={train._id}>{train.name} From: {train.source} - To: {train.destination} -- Price</option>
            )
          })}
          </select>
        </div>
        <div className="mb-3">
          <label>Available Seats</label>
          <select name="seats" id="seats" className="form-control">
          {trains?.map((train) => {
            return(
              <option value={train._id} key={train._id}>{train.name}</option>
            )
          })}           
          </select>
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email address"
          />
        </div>


        <div className="mb-3">
          <label>Contact Number</label>
          <input
            type="contact"
            className="form-control"
            placeholder="Enter phone number"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingTicket;
