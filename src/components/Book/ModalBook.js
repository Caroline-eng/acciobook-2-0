import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import BookUpdateButton from "./BookUpdateButton";
import { BASE_URL } from "../Api";

const ModalBook = ({ show, book, onClose }) => {
  const [authorOptions, setAuthorOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [updatedBook, setUpdatedBook] = useState({
    title: book.title,
    authorId: book.author.id,
    genreId: book.genre.id,
    description: book.description,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUpdatedBook((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/genre/all`);
        const data = await response.json();
        const options = data.map((genre) => ({
          value: genre.id,
          label: genre.name,
        }));
        setGenreOptions(options);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/author/all`);
        const data = await response.json();
        const options = data.map((author) => ({
          value: author.id,
          label: author.name,
        }));
        setAuthorOptions(options);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOptions();
  }, []);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Livro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o título do livro"
              value={updatedBook.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="authorId">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              as="select"
              value={updatedBook.authorId}
              onChange={handleChange}
              required
            >
              {authorOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  selected={option.label === book.author.name}
                >
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="genreId">
            <Form.Label>Gênero</Form.Label>
            <Form.Control
              as="select"
              value={updatedBook.genreId}
              onChange={handleChange}
              required
            >
              {genreOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  selected={option.label === book.genre.name}
                >
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={updatedBook.description}
              placeholder="Digite uma descrição para o livro"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <BookUpdateButton
            updatedBook={updatedBook}
            bookId={book.id}
            onClose={onClose}
          />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalBook;
