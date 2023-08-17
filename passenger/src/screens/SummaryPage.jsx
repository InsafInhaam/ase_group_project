import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PaymentModal from "../PaymentModal/PaymentModal";
import md5 from "crypto-js/md5";
import Navbar from "../components/Navbar";

const SummaryPage = () => {
  const location = useLocation();
  // const user = useSelector((state) => state.fetchuser);
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [amount, setAmount] = useState("");
  const [getCurrentUser, setGetCurrentUser] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/passenger/getprofile/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setGetCurrentUser(result);
      });
  }, [getCurrentUser]);

  const user = getCurrentUser;

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

  const merchantSecret =
    "NDIyMjA5MjQ3ODM3MDU5MzU3NDIyMzM5MTY5OTk2MTU4NTY4NDU1Ng==";
  const orderId =
    Date.now().toString() + Math.random().toString(36).substr(2, 9);
  const currency = "LKR";
  const merchantId = "1222723";
  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  let amountFormated = parseFloat(discountedPrice)
    .toLocaleString("en-us", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const hash = md5(
    merchantId + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();

  // console.log(discountedPrice);
  // console.log(seats)

  return (
    <>
      <Navbar />
      <section className="BackImg py-5">
        <div className="container  mb-4 BackImg">
          <div className="row">
            {/* heading section  */}
            {/* <div className="col md-12">
            <div className="h4 mt-4 mb-3">Booking Summary</div>
          </div> */}
            <div className="card shadow ">
              <div className="card-body">
                <div className="row">
                  {/* 1st clm  */}
                  <div className="col-md-7">
                    <h5>Summary of Booking</h5>
                    {/* train Details  */}
                    <div className="row">
                      <div className="col-md-12 mt-4">
                        <h2 className="">
                          <i className="fa fa-train" aria-hidden="true"></i>{" "}
                          &nbsp;
                          {trainName} &nbsp;
                          <i
                            className="fa fa-chevron-right"
                            aria-hidden="true"
                          ></i>
                          &nbsp;
                          <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                          ></i>
                          &nbsp;
                          {source} - {destination} &nbsp;
                        </h2>
                        <p>
                          <i
                            className="fa fa-calendar-o"
                            aria-hidden="true"
                          ></i>
                          &nbsp;{availableDate} &nbsp; &nbsp;
                          <i className="fa fa-clock-o" aria-hidden="true"></i>
                          &nbsp; {availableTime}
                        </p>
                      </div>
                    </div>
                    {/* passnger details  */}
                    <table
                      className="table table-striped mt-4"
                      style={{ width: "90%" }}
                    >
                      <tr>
                        <td className="p-2">
                          <strong>Name :</strong>
                        </td>
                        <td> {user.name}</td>
                      </tr>
                      <tr>
                        <td className="p-2">
                          <strong>Email :</strong>
                        </td>
                        <td> {user.email}</td>
                      </tr>
                      <tr>
                        <td className="p-2">
                          <strong>Address :</strong>
                        </td>
                        <td> {user.address}</td>
                      </tr>
                      <tr>
                        <td className="p-2">
                          <strong>Contact No :</strong>
                        </td>
                        <td> {user.phone}</td>
                      </tr>
                      <tr>
                        <td className="p-2">
                          <strong>Seat selected</strong>
                        </td>
                        <td>
                          {seats.map((seat) => (
                            <li key={seat._id}>Seat Number: {seat}</li>
                          ))}
                        </td>
                      </tr>
                    </table>
                  </div>
                  {/* 2nd clm  */}
                  <div className="col-md-5">
                    <div className="row ">
                      <div className="col-md-12">
                        <div className="card bg-light shadow">
                          <div className="card-body">
                            <h5>Payment Details</h5>
                            <div className="card ">
                              <div className="card-body">
                                <p>
                                  If passanger have <strong> promo-code</strong>
                                  ? use it
                                </p>
                                <div className="">
                                  <strong>Promo Code</strong>
                                  <form onSubmit={handleApplyPromo}>
                                    <div className="form-group mt-2">
                                      {/* <label htmlFor="promoCode">
                                      Enter Promo Code:
                                    </label> */}
                                      <input
                                        type="text"
                                        placeholder="Use Valid Promo code here"
                                        id="promoCode"
                                        className="form-control"
                                        value={promoCode}
                                        onChange={(e) =>
                                          setPromoCode(e.target.value)
                                        }
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      className="trainListBtn"
                                    >
                                      Apply
                                    </button>
                                  </form>
                                  {promoMessage && (
                                    <p className="text-success py-2">
                                      {promoMessage}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* money details  */}
                            <div className="py-4 px-4">
                              <table style={{ width: "100%" }}>
                                <tr>
                                  <td className="">Sub Total</td>
                                  <td className="text-right">
                                    LKR {totalPrice.toFixed(2)}
                                  </td>
                                </tr>
                                {discountPercentage > 0 && (
                                  <tr>
                                    <td className="">Discount</td>
                                    <td className="text-right">
                                      <p style={{ fontWeight: 700 }}>
                                        -&nbsp; {discountPercentage}% &nbsp;
                                      </p>
                                    </td>
                                  </tr>
                                )}

                                <tr>
                                  <td>
                                    <hr />
                                  </td>
                                  <td>
                                    <hr />
                                  </td>
                                </tr>

                                <tr>
                                  <td className=""> Total</td>

                                  <td
                                    className="text-right"
                                    style={{
                                      fontWeight: 700,
                                      fontSize: "20px",
                                    }}
                                  >
                                    LKR {discountedPrice.toFixed(2)}
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div className="mb-4">
                              <PaymentModal
                                // Use a unique value for the orderId
                                trainId={trainId}
                                seatNumber={seats}
                                bookingDate={availableDate}
                                bookingTime={availableTime}
                                passengerName={user.name}
                                email={user.email}
                                phone={user.phone}
                                orderId={orderId}
                                passengerId={user._id}
                                name={trainName}
                                amount={discountedPrice}
                                currency={currency}
                                hash={hash}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SummaryPage;
