import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PublisherUpdateButton from "./PublisherUpdateButton";

const ModalPublisher = ({ show, publisher, onClose }) => {
  const [updatedPublisher, setUpdatedPublisher] = useState({
    name: publisher.name,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUpdatedPublisher((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Alterar Edição</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Edição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da editora"
              value={updatedPublisher.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <PublisherUpdateButton
            updatedPublisher={updatedPublisher}
            publisherId={publisher.id}
            onClose={onClose}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPublisher;
