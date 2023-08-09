import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";

const AddAdmin = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/admin/view")
      .then((res) => res.json())
      .then((result) => {
        setAdmins(result);
      });
  }, [admins]);

  console.log("Error is:" + admins.email);

  const handleDelete = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/train/trains/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
      });
  };

  return (
    <div>
      {/* SIDEBAR */}
      <Sidebar />
      {/* SIDEBAR */}
      {/* CONTENT */}
      <section id="content">
        {/* NAVBAR */}
        <Navbar />
        {/* NAVBAR */}
        {/* MAIN */}
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Add Admin</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Add Admin
                  </a>
                </li>
              </ul>
            </div>
            <a href="/trains" className="btn-download">
              <i className="bx plus" />
              <span className="text">Add New Admin</span>
            </a>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Admin</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    {/* <th>Destination</th>
                    <th>Available Date</th>
                    <th>Available Time</th>
                    <th>Seats</th>
                    <th>Price</th>
                    <th>Train Type</th>
                    <th>Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin._id}>
                      <td>
                        <p>{admin.name}</p>
                      </td>
                      <td>{admin.email}</td>
                      <td>{admin.password}</td>
                      {/* <td>{train.destination}</td>
                      <td>{train.availableDate}</td>
                      <td>{train.availableTime}</td> */}
                      {/* <td className="scrollable-cell">
                        {train.seats.map((trainseats) => (
                          <p>
                            {trainseats.number} :
                            {trainseats.isBooked ? "Booked" : "Not Booked"}
                          </p>
                        ))}
                      </td> */}
                      {/* <td>{train.price}</td>
                      <td>{train.trainType}</td> */}
                      <td>
                        <button className="btn btn-warning">Edit</button>
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(admin._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                      <td>
                        <img src="img/people.png" />
                        <p>John Doe</p>
                      </td>
                      <td>01-10-2021</td>
                      <td>
                        <span className="status pending">Pending</span>
                      </td>
                    </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </div>
  );
};
export default AddAdmin;
