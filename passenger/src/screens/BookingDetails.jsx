import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BookingDetails = ({ userProfile, defaultProfile }) => {
  const user = useSelector((state) => state.user);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/booking/bookingsById/" + user.id)
      .then((res) => res.json())
      .then((result) => {
        setBookings(result);
      });
  }, []);

  // console.log(bookings);

  return (
    <>
      <div className="container">
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-4 mb-3">
              <div className="container">
                <div className="card shadow">
                  <div className="card-body">
                   
                    <div className="card-body">
                      <div className="row d-flex">
                        <div className="col-md-5">
                          <h6>Train Tracking ID</h6>
                        </div>
                        <div className="col-md-7">
                          <p>{booking.trainId}</p>
                        </div>
                        {/* seat no  */}
                        <div className="col-md-5">
                          <h6>Seat No</h6>
                        </div>
                        <div className="col-md-7">
                          <p>{booking.seatNumber}</p>
                        </div>
                        {/* booking date  */}
                        <div className="col-md-5">
                          <h6>BookingDate</h6>
                        </div>
                        <div className="col-md-7">
                          <p>{booking.bookingDate}</p>
                        </div>
                        {/* booking time  */}
                        <div className="col-md-5">
                          <h6>BookingTime</h6>
                        </div>
                        <div className="col-md-7">
                          <p>{booking.bookingTime}</p>
                        </div>
                        {/* order id  */}
                        <div className="col-md-5">
                          <h6>OrderId</h6>
                        </div>
                        <div className="col-md-7">
                          <p>{booking.orderId}</p>
                        </div>
                        {/* price  */}
                        <div className="col-md-5">
                          <h6>Price</h6>
                        </div>
                        <div className="col-md-7">
                          <p>{booking.price}</p>
                        </div>

                        {/* price  */}
                        <div className="col-md-12">
                          <a
                            className="btnDesign mt-2"
                            href={`/maptracking/${booking.trainId}`}
                          >
                            <span>Track Train Status</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
