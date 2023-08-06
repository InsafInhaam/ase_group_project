import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SummaryPage = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const bookingData = location.state?.bookingData || null;

  if (!bookingData) {
    // Handle the case where bookingData is not available
    return <p>Error: Booking data not available.</p>;
  }

  // Access the bookingData and display the summary
  const {
    trainName,
    source,
    destination,
    availableDate,
    availableTime,
    seats,
    price,
    // Add any other data you need...
  } = bookingData;

  // Calculate the total price of the booking (you can customize this according to your pricing logic)
  const totalPrice = seats.length * price;

  // Handle form submission for applying discount/promo (you can implement the logic accordingly)
  const handleApplyPromo = (event) => {
    event.preventDefault();
    // Implement the logic to apply the promo/discount
  };

  // Handle form submission for payment (you can implement the payment logic accordingly)
  const handlePayment = (event) => {
    event.preventDefault();
    // Implement the payment logic
  };

  console.log(bookingData);

  return (
    <div className="container mt-5 bg-white p-5 border-rounded">
      <h2 className="text-center">Booking Summary</h2>
      <br /> <br />
      <div className="mb-4">
        <h3>User Details</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Phone:</strong>
          {user.phone}
        </p>
      </div>
      <div className="mb-4">
        <h3>Train Details</h3>
        <p>
          <strong>Train Name: </strong>
          {trainName}
        </p>
        <p>
          <strong>Source: </strong>
          {source}
        </p>
        <p>
          <strong>Destination: </strong>
          {destination}
        </p>
        <p>
          <strong>Date and Time:</strong> {availableDate} {availableTime}
        </p>
      </div>
      <div className="mb-4">
        <h3>Selected Seats</h3>
        <ul>
          {seats.map((seat) => (
            <li key={seat._id}>Seat Number: {seat}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <form onSubmit={handleApplyPromo}>
          <div className="form-group">
            <label htmlFor="promoCode">Enter Promo Code:</label>
            <input type="text" id="promoCode" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">
            Apply Promo Code
          </button>
        </form>
      </div>
      <div className="mb-4">
        <h3>Total Price: {totalPrice} USD</h3>
      </div>
      <div className="mb-4">
        <form onSubmit={handlePayment}>
          {/* Implement the payment form fields (e.g., credit card details, etc.) */}
          {/* ... */}
          <button type="submit" className="btn btn-primary">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default SummaryPage;
