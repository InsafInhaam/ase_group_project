import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TrainListingLoading from "../components/TrainListingLoading";
import { useSelector } from "react-redux";
import { toast } from 'react-hot-toast';

const TrainListing = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const history = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const fromLocation = queryParams.get("from");
  const toLocation = queryParams.get("to");
  const date = queryParams.get("date");

  const [trains, setTrains] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [recommendedTrainData, setRecommendedTrainData] = useState([]);

  const sourceEncoded = encodeURIComponent(fromLocation);
  const destinationEncoded = encodeURIComponent(toLocation);

  useEffect(() => {
    setLoading(true);
    setLoading2(true);
    setError(null);
    fetchTrainListings();
    fetchRecommendedTrainListings();
  }, [fromLocation, toLocation, date]);

  const fetchTrainListings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/train/trainlisting?source=${sourceEncoded}&destination=${destinationEncoded}&availableDate=${date}`
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      if (result.length === 0) {
        setError("No Trains Available");
      } else {
        setTrains(result);
      }
    } catch (error) {
      setError("An unexpected error has occurred. Please try again.");
      console.error("Failed to fetch trains:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(error);

  const fetchRecommendedTrainListings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/train/recommendtrainlisting?source=${sourceEncoded}&destination=${destinationEncoded}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRecommendedTrainData(data);
    } catch (error) {
      console.error("Error fetching recommended train data:", error);
    } finally {
      setLoading2(false);
    }
  };

  const handleSelectTrain = (trainId) => {
    if(user){
      history(`/bookingtrain/${trainId}`);
    }else{
      toast.error('Please Login first to book a train');
      history('/login');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        {loading ? (
          <TrainListingLoading />
        ) : (
          <div className="row d-flex justify-content-center">
            <div className="col-md-9">
              {trains.length > 0 ? (
                <div className="card p-3">
                  <h2 className="textColor_design">
                    {fromLocation} &nbsp;
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    &nbsp; {toLocation}
                  </h2>
                  <h6>
                    Trains available on the date you choose &nbsp;
                    <i
                      className="fa fa-caret-square-o-down"
                      aria-hidden="true"
                    ></i>
                  </h6>
                  <p>
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                    &nbsp;
                    {date}
                  </p>
                  {trains.map((train) => (
                    <div key={train._id} className="">
                      {/* 1st train  */}
                      <div className="card mb-3 shadow cardHover">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3 d-flex align-items-center mb-3">
                              <i className="fa fa-train" aria-hidden="true"></i>
                              &nbsp;
                              {train.name} &nbsp;&nbsp;
                              <i
                                className="fa fa-chevron-right"
                                aria-hidden="true"
                              ></i>
                              &nbsp;&nbsp; {train.trainType}
                            </div>
                            <div className="col-sm-3 d-flex align-items-center mb-3">
                              {/* {train.source} - {train.destination} */}
                              <i
                                className="fa fa-calendar"
                                aria-hidden="true"
                              ></i>
                              &nbsp;&nbsp;{train.availableDate} &nbsp; - &nbsp;
                              <i
                                className="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>
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
                                }}
                              >
                                Select Train &nbsp;
                                <i
                                  className="fa fa-chevron-circle-right"
                                  aria-hidden="true"
                                ></i>
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
                              style={{ height: "10vh" }}
                            >
                              <h3 className="text-danger">
                                No trains found for the selected criteria.
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <i
                                  className="fa fa-refresh m-1"
                                  aria-hidden="true"
                                ></i>
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
        )}
        <br /> <br />
        {/* Render recommended train listings */}
        {loading2 ? (
          <TrainListingLoading />
        ) : (
          <div className="row d-flex justify-content-center">
            <div className="col-md-9">
              <h1>Recommended Trains</h1>
              <br />
              {recommendedTrainData.length > 0 ? (
                <div className="card p-3">
                  <h2 className="textColor_design">
                    {fromLocation} &nbsp;
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    &nbsp; {toLocation}
                  </h2>
                  <h6>
                    Trains available on the date you choose &nbsp;
                    <i
                      className="fa fa-caret-square-o-down"
                      aria-hidden="true"
                    ></i>
                  </h6>
                  
                  {recommendedTrainData.map((train) => (
                    <div key={train._id} className="">
                      {/* 1st train  */}
                      <div className="card mb-3 shadow cardHover">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-3 d-flex align-items-center mb-3">
                              <i className="fa fa-train" aria-hidden="true"></i>
                              &nbsp;
                              {train.name} &nbsp;&nbsp;
                              <i
                                className="fa fa-chevron-right"
                                aria-hidden="true"
                              ></i>
                              &nbsp;&nbsp; {train.trainType}
                            </div>
                            <div className="col-sm-3 d-flex align-items-center mb-3">
                              {/* {train.source} - {train.destination} */}
                              <i
                                className="fa fa-calendar"
                                aria-hidden="true"
                              ></i>
                              &nbsp;&nbsp;{train.availableDate} &nbsp; - &nbsp;
                              <i
                                className="fa fa-clock-o"
                                aria-hidden="true"
                              ></i>
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
                                }}
                              >
                                Select Train &nbsp;
                                <i
                                  className="fa fa-chevron-circle-right"
                                  aria-hidden="true"
                                ></i>
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
                              style={{ height: "10vh" }}
                            >
                              <h3 className="text-danger">
                                No trains found for the selected criteria.
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <i
                                  className="fa fa-refresh m-1"
                                  aria-hidden="true"
                                ></i>
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
        )}
      </div>
    </div>
  );
};

export default TrainListing;
