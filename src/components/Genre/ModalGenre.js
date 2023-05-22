import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GenreUpdateButton from "./GenreUpdateButton";

const ModalGenre = ({ show, genre, onClose }) => {
  const [updatedGenre, setUpdatedGenre] = useState({
    name: genre.name,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUpdatedGenre((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Gênero</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o gênero"
              value={updatedGenre.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <GenreUpdateButton
            updatedGenre={updatedGenre}
            genreId={genre.id}
            onClose={onClose}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalGenre;
