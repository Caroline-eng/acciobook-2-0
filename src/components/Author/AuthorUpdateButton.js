import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const AuthorUpdateButton = ({ updatedAuthor, authorId, onClose }) => {
  const updateAuthorData = async (event) => {
    event.preventDefault();

    try {
      const data = {
        ...updatedAuthor,
      };

      const jsonData = JSON.stringify(data);

      const response = await axios.put(
        `${BASE_URL}/author/update/${authorId}`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.info(response);
      onClose();
    } catch (error) {
      console.error("Deu erro! " + error);
    }
  };

  return (
    <Button className="form-btn" type="submit" onClick={updateAuthorData}>
      Salvar
    </Button>
  );
};

export default AuthorUpdateButton;
