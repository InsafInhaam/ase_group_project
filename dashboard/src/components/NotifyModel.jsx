import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";

const NotifyModel = ({ show, handleClose, trainId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim() || !trainId) {
      toast.error(
        "Please ensure you have a valid message and a train selected."
      );
      return;
    }

    fetch(`http://localhost:8000/train/notify/${trainId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => {
        if (result.success) {
          toast.success("Message sent successfully!");
          setMessage("");
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
        <Modal.Title>Send Notification</Modal.Title>
        <button type="button" className="close" onClick={handleClose}>
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message to passengers (max 600 characters)"
              maxLength={600}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotifyModel;
