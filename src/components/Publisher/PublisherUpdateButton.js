import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const PublisherUpdateButton = ({ updatedPublisher, publisherId, onClose }) => {
  const updatePublisherData = async (event) => {
    event.preventDefault();

    try {
      const data = {
        ...updatedPublisher,
      };

      const jsonData = JSON.stringify(data);

      const response = await axios.put(
        `${BASE_URL}/publisher/update/${publisherId}`,
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
    <Button className="form-btn" type="submit" onClick={updatePublisherData}>
      Salvar
    </Button>
  );
};

export default PublisherUpdateButton;
