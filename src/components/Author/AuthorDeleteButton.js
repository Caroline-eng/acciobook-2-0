import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const AuthorDeleteButton = ({ author, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/author/delete/${author.id}`);
      onDelete(author);
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

export default AuthorDeleteButton;
