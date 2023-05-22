import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const LanguageUpdateButton = ({ updatedLanguage, languageId, onClose }) => {
  const updateLanguageData = async (event) => {
    event.preventDefault();

    try {
      const data = {
        ...updatedLanguage,
      };

      const jsonData = JSON.stringify(data);

      const response = await axios.put(
        `${BASE_URL}/language/update/${languageId}`,
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
    <Button className="form-btn" type="submit" onClick={updateLanguageData}>
      Salvar
    </Button>
  );
};

export default LanguageUpdateButton;
