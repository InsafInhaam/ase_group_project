import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";

const UpdateExpensesModel = ({ show, handleClose, expenseId }) => {
  const [expenseData, setExpenseData] = useState({
    id: "",
    name: "",
    description: "",
    amount: "",
    createdAt: "",
  });

  useEffect(() => {
    if (show && expenseId) {
      fetch(process.env.REACT_APP_API_URL + "/expenses/" + expenseId)
        .then((res) => res.json())
        .then((data) => {
          setExpenseData({
            id: expenseId,
            name: data.name || "",
            description: data.description || "",
            amount: data.amount || "",
            createdAt: data.createdAt || "",
          });
        });
    }
  }, [show, expenseId]);

  const handleUpdate = () => {
    fetch(process.env.REACT_APP_API_URL + "/expenses/" + expenseId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(expenseData),
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
          <Modal.Title>Edit Expense</Modal.Title>
          <button type="button" className="close" onClick={handleClose}>
            &times;
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group className="mb-3">
              <Form.Label>Expense ID</Form.Label>
              <Form.Control
                type="text"
                value={expenseData.id}
                disabled={true}
                placeholder="Expense ID"
              />
            </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={expenseData.name}
                onChange={(e) =>
                  setExpenseData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={expenseData.description}
                onChange={(e) =>
                  setExpenseData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Enter Description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={expenseData.amount}
                onChange={(e) =>
                  setExpenseData((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                placeholder="Enter Amount"
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

export default UpdateExpensesModel;
