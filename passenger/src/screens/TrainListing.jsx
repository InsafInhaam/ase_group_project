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
      {/* <h4 className="text-center mt-3 mb-3">Available Trains For Date</h4> */}
      <div className="container mt-4"></div>
      {/* ----------------- GPT ------  */}
      <div className="row d-flex justify-content-center">
        <div className="col-md-9">
          {error ? (
            <p>Error: {error}</p>
          ) : trains.length > 0 ? (
            <div className="card p-3">
              {trains.map((train) => (
                <div key={train._id} className="">
                  <h2 className="textColor_design">
                    {train.source} &nbsp;{" "}
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>{" "}
                    &nbsp; {train.destination}
                  </h2>
                  <h6>
                    Trains available on the date you choose{" "}
                    <i class="fa fa-caret-square-o-down" aria-hidden="true"></i>
                  </h6>
                  <p>
                    {" "}
                    <i class="fa fa-calendar" aria-hidden="true"></i> &nbsp;
                    {train.availableDate}
                  </p>

                  {/* 1st train  */}
                  <div className="card mb-3 shadow cardHover">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3 d-flex align-items-center mb-3">
                          <i class="fa fa-train" aria-hidden="true"></i> &nbsp;
                          {train.name} &nbsp;&nbsp;
                          <i class="fa fa-chevron-right" aria-hidden="true"></i>
                          &nbsp;&nbsp; {train.trainType}
                        </div>
                        <div className="col-sm-3 d-flex align-items-center mb-3">
                          {/* {train.source} - {train.destination} */}
                          <i class="fa fa-calendar" aria-hidden="true"></i>{" "}
                          &nbsp;&nbsp;{train.availableDate} &nbsp; - &nbsp;
                          <i class="fa fa-clock-o" aria-hidden="true"></i>{" "}
                          &nbsp;&nbsp;
                          {train.availableTime}
                        </div>
                        <div className="col-sm-3 d-flex align-items-center mb-3">
                          Aavailable Seats : {train.seats.length}
                        </div>
                        <div className="col-sm-3 d-flex align-items-center mb-3">
                          <button
                            className="trainListBtn shadow"
                            onClick={() => handleSelectTrain(train._id)}
                            style={{
                              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                            }}>
                            Select Train &nbsp;
                            <i
                              class="fa fa-chevron-circle-right"
                              aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <div
                          className="d-flex justify-content-center align-items-center "
                          style={{ height: "10vh" }}>
                          <h3 className="text-danger">
                            No trains found for the selected criteria.
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <i class="fa fa-refresh m-1" aria-hidden="true"></i>
                            {/* <i class="fa-solid fa-spinner fa-spin-pulse"></i> */}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainListing;
