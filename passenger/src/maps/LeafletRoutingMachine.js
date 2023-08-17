import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = ({
  destinationLat,
  destinationLng,
  sourceLat,
  sourceLng,
}) => {
  const map = useMap();
  let DefaultIcon = L.icon({
    iconUrl: "/location-pin.gif",
    iconSize: [40, 40],
  });

  const startCoords = [sourceLat, sourceLng]; // Use sourceLat and sourceLng props
  const endCoords = [destinationLat, destinationLng]; // Use destinationLat and destinationLng props

  useEffect(() => {
    var marker1 = L.marker(startCoords, { icon: DefaultIcon }).addTo(map);
    L.Routing.control({
      waypoints: [
        L.latLng(startCoords),
        L.latLng(endCoords),
      ],
      lineOptions: {
        styles: [
          {
            color: "blue",
            weight: 4,
            opacity: 0.7,
          },
        ],
      },
      routeWhileDragging: false,
      geocoder: L.Control.Geocoder.nominatim(),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: true,
    })
      .on("routesfound", function (e) {
        e.routes[0].coordinates.forEach((c, i) => {
          setTimeout(() => {
            marker1.setLatLng([c.lat, c.lng]);
          }, 1000 * i);
        });
      })
      .addTo(map);
  }, []);

  return null;
};

export default LeafletRoutingMachine;