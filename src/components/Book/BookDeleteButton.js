import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";

const BookDeleteButton = ({ book, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7197/book/delete/${book.id}`);
      onDelete(book);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button className="btn btn-danger" onClick={handleDelete}>
      Excluir
    </Button>
  );
};

export default BookDeleteButton;
