import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PaymentModal from "../PaymentModal/PaymentModal";
import md5 from "crypto-js/md5";

const SummaryPage = () => {
  const location = useLocation();
  const user = useSelector((state) => state.fetchuser);
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [amount, setAmount] = useState("");

  const bookingData = location.state?.bookingData || null;

  if (!bookingData) {
    // Handle the case where bookingData is not available
    return <p>Error: Booking data not available.</p>;
  }

  // Access the bookingData and display the summary
  const {
    trainId,
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
  const handleApplyPromo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/promo/validate-promo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({ promoCode }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        const { promo } = data;
        setDiscountPercentage(parseFloat(promo.discountPercentage));
        setPromoMessage("Success, promo code applied!");
      } else {
        setDiscountPercentage(0);
        setPromoMessage(data.message);
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      setDiscountPercentage(0);
      setPromoMessage("An error occurred while applying the promo code.");
    }
  };

  const discountedPrice = totalPrice * (1 - discountPercentage / 100);

  // Handle form submission for payment (you can implement the payment logic accordingly)
  const handlePayment = (event) => {
    event.preventDefault();
    // Implement the payment logic
  };

  console.log(bookingData);

  // setAmount(discountedPrice ? )

  const merchantSecret =
    "NDIyMjA5MjQ3ODM3MDU5MzU3NDIyMzM5MTY5OTk2MTU4NTY4NDU1Ng==";
  const orderId =
    Date.now().toString() + Math.random().toString(36).substr(2, 9);
  const currency = "LKR";
  const merchantId = " ";
  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  console.log(amount);
  let amountFormated = parseFloat(amount)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const hash = md5(
    merchantId + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();

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
        <h3>Promo Code</h3>
        <form onSubmit={handleApplyPromo}>
          <div className="form-group">
            <label htmlFor="promoCode">Enter Promo Code:</label>
            <input
              type="text"
              id="promoCode"
              className="form-control"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Apply Promo Code
          </button>
        </form>
        {promoMessage && <p>{promoMessage}</p>}
      </div>
      <div className="mb-4">
        <h3>Total Price</h3>
        <p>Original Price: LKR{totalPrice.toFixed(2)}</p>
        {discountPercentage > 0 && <p>Discount: {discountPercentage}%</p>}
        <p>Discounted Price: LKR{discountedPrice.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <form onSubmit={handlePayment}>
          {/* Implement the payment form fields (e.g., credit card details, etc.) */}
          {/* ... */}
          {/* <button type="submit" className="btn btn-primary">
            Proceed to Payment
          </button> */}
          {/* <PaymentModal
            // Use a unique value for the orderId
            trainId={trainId}
            seatNumber={seats}
            bookingDate={availableDate}
            bookingTime={availableTime}
            passengerName={user.name}
            email={user.email}
            phone={user.phone}
            orderId={orderId}
            passengerId={user.id}
            name={trainName}
            amount={amount}
            currency={currency}
            hash={hash}
          /> */}
        </form>
      </div>
    </div>
  );
};

export default SummaryPage;