import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/booking/bookingsById/" + user.id)
      .then((res) => res.json())
      .then((result) => {
        setBookings(result);
      });
  }, []);

  console.log(bookings)

  return (
    <>
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-6">
              <h2>
                Manage <b>Bookings</b>
              </h2>
            </div>
            {/* <div className="col-sm-6">
              <div className="btn-group" data-toggle="buttons">
                <label className="btn btn-info active">
                  <input
                    type="radio"
                    name="status"
                    defaultValue="all"
                    defaultChecked="checked"
                  />
                  All
                </label>
                <label className="btn btn-success">
                  <input type="radio" name="status" defaultValue="active" />{" "}
                  Active
                </label>
                <label className="btn btn-warning">
                  <input type="radio" name="status" defaultValue="inactive" />{" "}
                  Inactive
                </label>
                <label className="btn btn-danger">
                  <input type="radio" name="status" defaultValue="expired" />{" "}
                  Expired
                </label>
              </div>
            </div> */}
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Train</th>
              <th>Order iD</th>
              <th>Passenger Name</th>
              <th>Passenger Email</th>
              <th>Passenger Contact</th>
              <th>Booking Date</th>
              <th>Booking Time</th>
              <th>Seat Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr data-status="active">
                <td>1</td>
                <td>
                  <a href="#">{booking.train}</a>
                </td>
                <td>{booking.orderId}</td>
                <td>{booking.passengerName}</td>
                <td>{booking.passengerEmail}</td>
                <td>{booking.contactNumber}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.bookingTime}</td>
                <td>{booking.seatNumber}</td>
                <td>
                  <span className="label label-success">Active</span>
                </td>
                <td>
                  <a href="#" className="btn btn-sm manage">
                    Manage
                  </a>
                </td>
              </tr>
            ))}
            {/* <tr data-status="inactive">
              <td>2</td>
              <td>
                <a href="#">quisquamut.net</a>
              </td>
              <td>05/08/2014</td>
              <td>
                <span className="label label-warning">Inactive</span>
              </td>
              <td>Australia</td>
              <td>
                <a href="#" className="btn btn-sm manage">
                  Manage
                </a>
              </td>
            </tr>
            <tr data-status="active">
              <td>3</td>
              <td>
                <a href="#">convallissed.com</a>
              </td>
              <td>11/05/2015</td>
              <td>
                <span className="label label-success">Active</span>
              </td>
              <td>United Kingdom</td>
              <td>
                <a href="#" className="btn btn-sm manage">
                  Manage
                </a>
              </td>
            </tr>
            <tr data-status="expired">
              <td>4</td>
              <td>
                <a href="#">phasellusri.org</a>
              </td>
              <td>06/09/2016</td>
              <td>
                <span className="label label-danger">Expired</span>
              </td>
              <td>Romania</td>
              <td>
                <a href="#" className="btn btn-sm manage">
                  Manage
                </a>
              </td>
            </tr>
            <tr data-status="inactive">
              <td>5</td>
              <td>
                <a href="#">facilisleo.com</a>
              </td>
              <td>12/08/2017</td>
              <td>
                <span className="label label-warning">Inactive</span>
              </td>
              <td>Germany</td>
              <td>
                <a href="#" className="btn btn-sm manage">
                  Manage
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
