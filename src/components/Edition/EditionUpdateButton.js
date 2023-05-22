import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const EditionUpdateButton = ({ updatedEdition, editionId, onClose }) => {
  const updateEditionData = async (event) => {
    event.preventDefault();

    try {
      const data = {
        ...updatedEdition,
      };

      const jsonData = JSON.stringify(data);

      const response = await axios.put(
        `${BASE_URL}/edition/update/${editionId}`,
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
    <Button className="form-btn" type="submit" onClick={updateEditionData}>
      Salvar
    </Button>
  );
};

export default EditionUpdateButton;
