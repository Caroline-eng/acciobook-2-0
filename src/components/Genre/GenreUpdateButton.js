import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const GenreUpdateButton = ({ updatedGenre, genreId, onClose }) => {
  const updateGenreData = async (event) => {
    event.preventDefault();

    try {
      const data = {
        ...updatedGenre,
      };

      const jsonData = JSON.stringify(data);

      const response = await axios.put(
        `${BASE_URL}/genre/update/${genreId}`,
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
    <Button className="form-btn" type="submit" onClick={updateGenreData}>
      Salvar
    </Button>
  );
};

export default GenreUpdateButton;
