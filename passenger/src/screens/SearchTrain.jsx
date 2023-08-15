import React, { useEffect, useState } from "react";
import { stations } from "../utils/stations";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SearchTrain = () => {
  const history = useNavigate();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  // Initialize state for maxDate and date
  const [maxDate, setMaxDate] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const dtToday = new Date();
  
    const month = dtToday.getMonth() + 1;
    const day = dtToday.getDate();
    const year = dtToday.getFullYear();
    if (month < 10) month = '0' + month.toString();
    if (day < 10) day = '0' + day.toString();

    const formattedMaxDate = year + '-' + month + '-' + day;

    // Set maxDate state
    setMaxDate(formattedMaxDate);
  }, []); // Run this effect only once on component mount


  const handleSubmit = () => {
    console.log("fromLocation:", fromLocation);
    console.log("toLocation:", toLocation);
    console.log("date:", date);
    // Perform validation
    if (!fromLocation || !toLocation || !date) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    // Redirect to the train listing page with search parameters
    history(
      `/trainlistings?from=${fromLocation}&to=${toLocation}&date=${date}`
    );
  };

  return (
    <>
      <div className="container mt-5 shadow-lg p-3 mb-5 bg-white rounded">
        <h1 className="mb-4">Train Booking Website</h1>
        {/* Add your booking form here */}
        <form>
          <div className="mb-3">
            <label htmlFor="fromLocation" className="form-label">
              From Station
            </label>
            <div className="form-group first">
              <select
                className="form-control"
                id="fromLocation"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              >
                <option value="">Select a city</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="toLocation" className="form-label">
              To Station
            </label>
            <div className="form-group first">
              <select
                className="form-control"
                id="toLocation"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              >
                <option value="">Select a city</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="departureDate" className="form-label">
              Departure Date
            </label>
            <input
              type="date"
              className="form-control"
              id="departureDate"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={maxDate} // Set the max attribute to the maxDate state

            />
          </div>
          {/* Add more fields for passengers, className, etc. */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSubmit()}
          >
            Search Trains
          </button>
        </form>
        {/* Add a section to display search results */}
      </div>
    </>
  );
};

export default SearchTrain;
