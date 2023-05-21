import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const BookUpdateButton = ({ updatedBook, bookId, onClose }) => {
  const updateBookData = async (event) => {
    event.preventDefault();

    try {
      const data = {
        ...updatedBook,
        id_Author: parseInt(updatedBook.authorId, 10),
        id_Genre: parseInt(updatedBook.genreId, 10),
      };

      const jsonData = JSON.stringify(data);

      const response = await axios.put(
        `${BASE_URL}/book/update/${bookId}`,
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
    <Button className="form-btn" type="submit" onClick={updateBookData}>
      Salvar
    </Button>
  );
};

export default BookUpdateButton;
