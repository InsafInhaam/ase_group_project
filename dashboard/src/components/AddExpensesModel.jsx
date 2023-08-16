import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";

const AddExpensesModel = ({ show, handleClose }) => {
  const [expenseData, setExpenseData] = useState({
    name: "",
    description: "",
    amount: "",
  });

  const handleAddExpense = () => {
    fetch(process.env.REACT_APP_API_URL + "/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify(expenseData),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        if (result) {
          toast.success("Expense Added Successfully");
          handleClose();
        } else {
          toast.error(result.error || "Unknown error occurred!");
        }
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
        <Modal.Title>Add Expense</Modal.Title>
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
              value={expenseData.name}
              onChange={(e) =>
                setExpenseData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter Expense Name"
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
              type="number"
              value={expenseData.amount}
              onChange={(e) =>
                setExpenseData((prev) => ({ ...prev, amount: e.target.value }))
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
        <Button variant="primary" onClick={handleAddExpense}>
          Add Expense
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExpensesModel;
