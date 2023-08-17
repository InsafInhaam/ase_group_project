import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
import { profileImg } from "../assets";

const Passenger = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    console.log("Fetching data...");
    fetch("http://localhost:8000/admin/passengers", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        console.log("Response received:", res);
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Network response was not ok");
          });
        }
        return res.json();
      })
      .then((result) => {
        console.log("Data:", result);
        if (Array.isArray(result)) {
          setAdmins(result);
        } else {
          console.error("API did not return an array:", result);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(process.env.REACT_APP_API_URL + "/admin/passenger/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          toast.success(result.message);
          const newAdmins = admins.filter((admin) => admin._id !== id);
          setAdmins(newAdmins);
        } else {
          toast.error(result.error || "Failed to delete the admin.");
        }
      })
      .catch((error) => {
        console.log("Why: " + error);
        toast.error("Failed to delete the admin.");
      });
  };

  return (
    <div>
      a
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <div className="head-title">
            <div className="left">
              <h1> Passenger</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Passenger
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Passenger</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>D.O.B</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(admins) &&
                    admins.map((admin) => (
                      <tr key={admin._id}>
                        <td>
                          <img
                            src={admin.profile ? admin.profile : profileImg}
                            alt={admin.name}
                            className="admin-table-img"
                          />
                        </td>
                        <td>
                          <p>{admin.name}</p>
                        </td>
                        <td>
                          <p>{admin.email}</p>
                        </td>

                        <td>
                          <p>{admin.phone ? admin.phone : '------------'}</p>
                        </td>

                        <td>
                          <p>{admin.birthday ? admin.birthday : '------------'}</p>
                        </td>
                        <td>
                          &nbsp;&nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(admin._id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Passenger;
