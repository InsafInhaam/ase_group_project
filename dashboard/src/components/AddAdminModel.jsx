import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";

const AddAdminModel = ({ show, handleClose }) => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleAddAdmin = () => {
    fetch(process.env.REACT_APP_API_URL + "/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(adminData),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        if (result) {
          toast.success("Created Successfully");
        } else {
          toast.error(result.error || "Unknown error occurred!");
        }
        handleClose();
      })
      .catch((error) => {
        toast.error(error.message || "An error occurred!");
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      animation={false}
    >
      <Modal.Header>
        <Modal.Title>Add Admin</Modal.Title>
        <button type="button" className="close" onClick={handleClose}>
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
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
            <Form.Label>Email</Form.Label>
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
            <Form.Label>Password</Form.Label>
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
        <Button variant="primary" onClick={handleAddAdmin}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAdminModel;
