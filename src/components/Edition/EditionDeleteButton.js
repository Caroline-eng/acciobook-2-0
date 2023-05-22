import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const EditionDeleteButton = ({ edition, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/edition/delete/${edition.id}`);
      onDelete(edition);
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

export default EditionDeleteButton;
