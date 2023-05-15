import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const BookInsertButton = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBookData = async () => {
    setIsSubmitting(true);
    const bookData = props.bookData;

    if (bookData) {
      try {
        const response = await axios.post(
          "https://localhost:7197/book/insert/",
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
