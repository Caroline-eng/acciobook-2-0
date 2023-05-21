import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const BookInsertButton = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBookData = async () => {
    setIsSubmitting(true);
    const bookData = props.bookData;

    if (bookData) {
      try {
        const response = await axios.post(
          `${BASE_URL}/book/insert/`,
          bookData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.info(response);
        window.location.reload();
      } catch (error) {
        console.error("Deu erro! " + error);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <Button className="form-btn" type="submit" onClick={submitBookData}>
      Cadastrar
    </Button>
  );
};

export default BookInsertButton;
