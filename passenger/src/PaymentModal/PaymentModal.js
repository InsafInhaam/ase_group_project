import React from "react";
import { toast } from "react-hot-toast";

const PaymentModal = ({
  trainId,
  seatNumber,
  bookingDate,
  bookingTime,
  passengerName,
  email,
  phone,
  orderId,
  passengerId,
  name,
  amount,
  currency,
  hash,
}) => {
  // Put the payment variables here
  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: "1222723", // Replace your Merchant ID
    return_url: "http://sample.com/return",
    cancel_url: "http://sample.com/cancel",
    notify_url: "http://sample.com/notify",
    order_id: orderId,
    items: name,
    amount: amount,
    currency: currency,
    hash: hash,
    first_name: "xyz",
    last_name: "xyz",
    email: email,
    phone: phone,
    address: "no",
    city: "no",
    country: "Sri Lanka",
    country: "Sri Lanka",
    delivery_address: "No. 46, Galle road, Kalutara South", // optional field
    delivery_city: "Kalutara", // optional field
    delivery_country: "Sri Lanka", // optional field
    custom_1: "", // optional field
    custom_2: "", // optional field
  };

  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
    
    fetch(process.env.REACT_APP_API_URL + "/booking/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trainId,
        seatNumber,
        bookingDate,
        bookingTime,
        passengerName,
        passengerEmail: email,
        contactNumber: phone,
        orderId,
        passengerId,
        price: amount
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
          
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
  };

  function pay() {
    if (!seatNumber) {
      toast.error("Please select the seat number");
      return;
    }
    window.payhere.startPayment(payment);
  }

  return (
    <button type="button" onClick={pay} className="btn btn-primary btn-block">
      Pay with Payhere
    </button>
  );
};

export default PaymentModal;