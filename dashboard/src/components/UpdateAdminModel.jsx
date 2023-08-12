import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";

const UpdateAdminModel = ({ show, handleClose, adminId }) => {
  const [adminData, setAdminData] = useState({
    id: "", // We will set this ID when fetching the data.
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (show && adminId) {
      fetch(process.env.REACT_APP_API_URL + "/admin/view/" + adminId)
        .then((res) => res.json())
        .then((data) => {
          setAdminData({
            id: adminId,
            name: data.name || "",
            email: data.email || "",
            password: "",
          });
        });
    }
  }, [show, adminId]);

  const handleUpdate = () => {
    fetch(process.env.REACT_APP_API_URL + "/admin/update/" + adminId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(adminData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.error(result.error || "Unknown error occurred!");
        }
        handleClose();
      })
      .catch((error) => {
        toast.error("Not Authorized");
      });
  };

  // const handleDelete = () => {}

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Edit Admin</Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            &times;
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Admin ID</Form.Label>
              <Form.Control
                type="text"
                value={adminData.id}
                disabled={true}
                placeholder="Admin ID"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Name</Form.Label>
              <Form.Control
                type="text"
                value={adminData.name}
                onChange={(e) =>
                  setAdminData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Email</Form.Label>
              <Form.Control
                type="email"
                value={adminData.email}
                onChange={(e) =>
                  setAdminData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter Email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={adminData.password}
                onChange={(e) =>
                  setAdminData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                placeholder="Enter Password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateAdminModel;
