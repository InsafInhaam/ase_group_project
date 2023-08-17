import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AddAdminModel from "../components/AddAdminModel";
import UpdateAdminModel from "../components/UpdateAdminModel";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddAdminModel, setShowAddAdminModel] = useState(false);
  const [editAdminId, setEditAdminId] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/admin/view")
      .then((res) => res.json())
      .then((result) => {
        setAdmins(result);
      });
  }, []);

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

  const openModal = (id) => {
    setEditAdminId(id);
    setShowModal(true);
  };

  const openAddAdminModel = () => {
    setShowAddAdminModel(true);
  };

  const closeAddAdminModel = () => {
    setShowAddAdminModel(false);
  };

  const closeModal = () => {
    setShowModal(false);
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
              <h1>Admin</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />
                </li>
                <li>
                  <a className="active" href="#">
                    Admin
                  </a>
                </li>
              </ul>
            </div>
            <a
              href="#"
              className="btn-download"
              onClick={() => openAddAdminModel()}
            >
              <i className="bx plus" />
              <span className="text">Add New Admin</span>
            </a>
            <AddAdminModel
              show={showAddAdminModel}
              handleClose={closeAddAdminModel}
            />
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Admin</h3>
                <i className="bx bx-search" />
                <i className="bx bx-filter" />
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin._id}>
                      <td>
                        <p>{admin.name}</p>
                      </td>
                      <td>{admin.email}</td>
                      <td>**********</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => openModal(admin._id)}
                        >
                          Edit
                        </button>
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
                </tbody>
              </table>
            </div>
          </div>
          <UpdateAdminModel
            show={showModal}
            handleClose={closeModal}
            adminId={editAdminId}
          />
        </main>
        {/* MAIN */}
      </section>
      {/* CONTENT */}
    </div>
  );
};
export default Admin;
