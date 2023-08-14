// import React, { useEffect, useRef } from "react";
// import { MapContainer, TileLayer } from "react-leaflet";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet/dist/leaflet.css";

// import train from "../assets/images/train.png";
// import location from "../assets/images/location.png";

// const Map = () => {
//   const mapRef = useRef(null);
//   const trainMarkerRef = useRef(null);
//   const vectorLayerRef = useRef(null);

//   useEffect(() => {
//     // Initialize the map
//     const map = L.map(mapRef.current).setView(
//       [6.934028561334163, 79.84990454760332],
//       13
//     );

//     // Add tile layer
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "© OpenStreetMap contributors",
//     }).addTo(map);

//     // Create a routing control
//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(6.934028561334163, 79.84990454760332), // Start
//         L.latLng(6.929750524774225, 79.86582559465364), // End
//         // Add more waypoints as needed
//       ],
//       createMarker: (i, waypoint, n) => {
//         if (i === 0) {
//           // Start marker
//           return L.marker(waypoint.latLng, {
//             icon: L.icon({
//               iconUrl: location,
//               iconSize: [32, 32],
//               iconAnchor: [16, 16],
//             }),
//           })
//             .bindPopup("Start")
//             .addTo(map);
//         } else if (i === n - 1) {
//           // End marker
//           return L.marker(waypoint.latLng, {
//             icon: L.icon({
//               iconUrl: location,
//               iconSize: [32, 32],
//               iconAnchor: [16, 16],
//             }),
//           })
//             .bindPopup("End")
//             .addTo(map);
//         } else {
//           // Waypoint marker
//           return L.marker(waypoint.latLng)
//             .bindPopup(`Waypoint ${i}`)
//             .addTo(map);
//         }
//       },
//       lineOptions: {
//         styles: [{ color: "#770101", opacity: 0.7, weight: 6 }],
//       },
//       show: false, // Disable automatic route display
//     }).addTo(map);

//     // Create a train marker
//     const trainIcon = L.icon({
//       iconUrl: train,
//       iconSize: [32, 32],
//       iconAnchor: [16, 16],
//     });
//     trainMarkerRef.current = L.marker([6.934028561334163, 79.84990454760332], {
//       icon: trainIcon,
//     }).addTo(map);

//     // Function to move the train marker along the route
//     const moveTrainMarker = (route) => {
//       const steps = route.steps;
//       let i = 0;
//       let j = 0;

//       const moveNextStep = () => {
//         const { latLng } = steps[i].maneuver.location;
//         trainMarkerRef.current.setLatLng(latLng);

//         if (j < steps[i].maneuver.instruction.length - 1) {
//           j++;
//         } else if (i < steps.length - 1) {
//           i++;
//           j = 0;
//         }

//         if (
//           i < steps.length - 1 ||
//           j < steps[i].maneuver.instruction.length - 1
//         ) {
//           setTimeout(moveNextStep, 1000); // Move to the next step after 1 second
//         }
//       };

//       moveNextStep();
//     };

//     // Get the route and move the train marker when the route is found
//     routingControl.on("routesfound", (e) => {
//       const route = e.routes[0];
//       moveTrainMarker(route);

//       // Remove the existing vector layer if present
//       if (vectorLayerRef.current) {
//         map.removeLayer(vectorLayerRef.current);
//       }

//       // Create the vector layer
//       const routeCoordinates = route.coordinates.map((coord) => coord.latLng);
//       vectorLayerRef.current = L.polyline(routeCoordinates, {
//         color: "#FF0000",
//         weight: 4,
//       }).addTo(map);
//     });

//     // Cleanup on unmount
//     return () => {
//       map.remove();
//     };
//   }, []);

//   return <div id="map" style={{ height: "500px" }} ref={mapRef}></div>;
// };

// export default Map;
