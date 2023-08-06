import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useHistory } from "react-router-dom";

const TrainListing = () => {
  const location = useLocation();
  const history = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const fromLocation = queryParams.get("from");
  const toLocation = queryParams.get("to");
  const date = queryParams.get("date");

  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const sourceEncoded = encodeURIComponent(fromLocation);
    const destinationEncoded = encodeURIComponent(toLocation);

    fetch(
      `${process.env.REACT_APP_API_URL}/train/trainlisting?source=${sourceEncoded}&destination=${destinationEncoded}&availableDate=${date}`
    )
      .then((res) => res.json())
      .then((result) => {
        setTrains(result);
      });
  }, [fromLocation, toLocation, date]);

  console.log(trains);

  const handleSelectTrain = (trainId) => {
    history(`/bookingtrain/${trainId}`);
  };

  return (
    <div>
      <h2 className="text-center">Available Trains</h2>
      {trains.length > 0 ? (
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
                  //   width: "100%",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
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