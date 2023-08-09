import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { galery1 } from "../assets/images";

const TrainListing = () => {
  const location = useLocation();
  const history = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const fromLocation = queryParams.get("from");
  const toLocation = queryParams.get("to");
  const date = queryParams.get("date");

  console.log(fromLocation);

  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sourceEncoded = encodeURIComponent(fromLocation);
    const destinationEncoded = encodeURIComponent(toLocation);

    console.log(sourceEncoded);

    fetch(
      `${process.env.REACT_APP_API_URL}/train/trainlisting?source=${sourceEncoded}&destination=${destinationEncoded}&availableDate=${date}`
    )
      .then((res) => {
        if (!res.ok) {
          // Throw the status for handling in the catch block
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((result) => {
        if (result.length === 0) {
          setError("No Trains Available");
        } else {
          setTrains(result);
        }
      })
      .catch((error) => {
        // Handle HTTP 404 error with custom message
        if (error.message === "404") {
          setError("No Trains Available");
        } else {
          // For other errors, set a generic message
          setError("An unexpected error has occurred. Please try again.");
        }
        console.error("Failed to fetch trains:", error);
      });
  }, [fromLocation, toLocation, date]);

  console.log(trains);

  const handleSelectTrain = (trainId) => {
    history(`/bookingtrain/${trainId}`);
  };

  return (
    <div>
      <Navbar />
      <h4 className="text-center mt-3 mb-3">Available Trains For Date</h4>
      <div className="container"></div>
      {/* ----------------- GPT ------  */}
      <div className="row d-flex justify-content-center">
        <div className="col-md-9">
          {error ? (
            <p>Error: {error}</p>
          ) : trains.length > 0 ? (
            <div className="card p-3">
              {trains.map((train) => (
                <div key={train._id} className="">
                  <h2>
                    {train.source} - {train.destination}
                  </h2>
                  {/* 1st train  */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3 d-flex align-items-center">
                          {train.name}
                        </div>
                        <div className="col-sm-3 d-flex align-items-center">
                          {/* {train.source} - {train.destination} */}
                          {train.availableDate} &nbsp; &nbsp;{" "}
                          {train.availableTime}
                        </div>
                        <div className="col-sm-3 d-flex align-items-center">
                          Aavailable : {train.seats.length}
                        </div>
                        <div className="col-sm-3 d-flex align-items-center">
                          <button
                            className="btn btn-outline-success"
                            onClick={() => handleSelectTrain(train._id)}
                            style={{
                              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                            }}>
                            Select Train
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 2nd train  */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3 d-flex align-items-center">
                          {train.name}
                        </div>
                        <div className="col-sm-3 d-flex align-items-center">
                          {/* {train.source} - {train.destination} */}
                          {train.availableDate} &nbsp; &nbsp;{" "}
                          {train.availableTime}
                        </div>
                        <div className="col-sm-3 d-flex align-items-center">
                          Aavailable : {train.seats.length}
                        </div>
                        <div className="col-sm-3 d-flex align-items-center">
                          <button
                            className="btn btn-outline-success"
                            onClick={() => handleSelectTrain(train._id)}
                            style={{
                              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                            }}>
                            Select Train
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No trains found for the selected criteria.</p>
          )}
        </div>
      </div>

      {/* ----------------- main logics */}

      {error ? (
        <p>Error: {error}</p>
      ) : trains.length > 0 ? (
        <ul className="list-group d-flex align-items-center justify-content-center">
          {trains.map((train) => (
            <li key={train._id} className="list-group-item mb-3 w-75">
              <h4>{train.name}</h4>
              <div>
                <strong>Type:</strong> {train.trainType}
              </div>
              <div>
                <strong>Departure:</strong> {train.source} - {train.destination}
              </div>
              <div>
                <strong>Seats Available:</strong> {train.seats.length}
              </div>
              <button
                className="btn btn-warning"
                onClick={() => handleSelectTrain(train._id)}
                style={{
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                }}>
                Book Train
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trains found for the selected criteria.</p>
      )}
    </div>
  );
};

export default TrainListing;
