import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const GenreDeleteButton = ({ genre, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/genre/delete/${genre.id}`);
      onDelete(genre);
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

export default GenreDeleteButton;
