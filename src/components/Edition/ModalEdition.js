import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AuthorUpdateButton from "./EditionUpdateButton";

const ModalAuthor = ({ show, author, onClose }) => {
  const [updatedAuthor, setUpdatedAuthor] = useState({
    name: author.name,
  });

  console.log(author);
  console.log(author.name);
  console.log(updatedAuthor.title);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUpdatedAuthor((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Autor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do autor"
              value={updatedAuthor.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <AuthorUpdateButton
            updatedAuthor={updatedAuthor}
            authorId={author.id}
            onClose={onClose}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAuthor;
