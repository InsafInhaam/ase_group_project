import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MapComponent from "../maps/MapComponent";
import { useLocation } from "react-router-dom";

const MapTracking = () => {
  const location = useLocation();
  const trainId = location.pathname.split("/")[2];

  const [train, setTrain] = useState([]);
  // Function to fetch train details
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/train/trains/${trainId}`)
      .then((res) => res.json())
      .then((result) => {
        setTrain(result);
      })
      .catch((error) => {
        console.log("Error fetching train details:", error);
      });
  }, [trainId]);

  return (
    <>
      <Navbar />
      {train.destinationLat &&
      train.destinationLng &&
      train.sourceLat &&
      train.sourceLng ? (
        <MapComponent
          destinationLat={train.destinationLat}
          destinationLng={train.destinationLng}
          sourceLat={train.sourceLat}
          sourceLng={train.sourceLng}
        />
      ) : (
        <p>Loading train data...</p>
      )}
    </>
  );
};

export default MapTracking;
