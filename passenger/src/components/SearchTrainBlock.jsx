import React, { useState } from "react";
import { stations } from "../utils/stations";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Select from "react-select";

const SearchTrainBlock = () => {
  const history = useNavigate();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [date, setDate] = useState("");

  // console.log(fromLocation)

  const stationsAsOptions = stations.map((station) => ({
    value: station.name,
    label: station.name,
  }));

  const handleFromLocationChange = (selectedOption) => {
    setFromLocation(selectedOption.value);
  };

  const handleToLocationChange = (e) => {
    setToLocation(e.target.value);
  };

  const handleSubmit = () => {
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
    <div className="container">
      <form className="main-form shadow">
        <h3 className="shadow">Find Your Tour</h3>
        <div className="row">
          {/* 1st section  */}
          <div className="col-sm-3">
            <label>From Station</label>
            {/* <select
              className="form-control"
              id="fromStation"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
            >
              <option value="">Select a city</option>
              {stations.map((station) => (
                <option key={station.id} value={station.name}>
                  {station.name}
                </option>
              ))}
            </select> */}
            <Select
              value={{ value: fromLocation, label: fromLocation }}
              onChange={handleFromLocationChange}
              options={stationsAsOptions}
              placeholder="Select a city"
              isSearchable={true}
            />
          </div>
          {/* 2nd section  */}
          <div className="col-sm-3">
            <label>To Station</label>
            {/* <select
              className="form-control"
              id="toStation"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
            >
              <option value="">Select a city</option>
              {stations.map((station) => (
                <option key={station.id} value={station.name}>
                  {station.name}
                </option>
              ))}
            </select> */}
            <Select
              value={{ value: toLocation, label: toLocation }}
              onChange={(selectedOption) => setToLocation(selectedOption.value)}
              options={stationsAsOptions}
              placeholder="Select a city"
              isSearchable={true}
            />
          </div>
          {/* 3rd section  */}
          <div className="col-sm-3">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              id="departureDate"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* 4th section  */}
          <div className="col-sm-3 d-flex align-items-center justify-content-center mt-3 ">
            <a href="#" onClick={() => handleSubmit()}>
              search
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchTrainBlock;
