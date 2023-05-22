import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import LanguageUpdateButton from "./LanguageUpdateButton";

const ModalLanguage = ({ show, language, onClose }) => {
  const [updatedLanguage, setUpdatedLanguage] = useState({
    name: language.name,
  });

  console.log(language);
  console.log(language.name);
  console.log(updatedLanguage.title);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUpdatedLanguage((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Idioma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Idioma</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o idioma"
              value={updatedLanguage.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <LanguageUpdateButton
            updatedLanguage={updatedLanguage}
            languageId={language.id}
            onClose={onClose}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAuthor;
