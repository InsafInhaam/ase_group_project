import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MapComponent from "../maps/MapComponent";
import { useLocation } from "react-router-dom";

const MapTracking = () => {
  const location = useLocation();
  const trainId = location.pathname.split("/")[2];

  // console.log(trainId);

  const [train, setTrain] = useState([]);
  // Function to fetch train details
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/train/trains/${trainId}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setTrain(result);
      })
      .catch((error) => {
        console.log("Error fetching train details:", error);
      });
  }, [trainId]);

  // console.log(train.destinationLat);

  return (
    <>
      <Navbar />
      <h1>{train.destinationLat}</h1>
      <MapComponent
        destinationLat={train.destinationLat}
        destinationLng={train.destinationLng}
        sourceLat={train.sourceLat}
        sourceLng={train.sourceLng}
      />
    </>
  );
};

export default MapTracking;
