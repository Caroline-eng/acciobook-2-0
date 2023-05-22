import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const PublisherInsertButton = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isSuccess) {
      timeoutId = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSuccess]);

  const submitPublisherData = async () => {
    setIsSubmitting(true);
    const publisherData = props.publisherData;

    if (publisherData) {
      try {
        const response = await axios.post(
          `${BASE_URL}/publisher/insert/`,
          publisherData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.info(response);
        setIsSuccess(true);
        props.onInsertSuccess();
      } catch (error) {
        console.error("Deu erro! " + error);
      }
    }
    setIsSubmitting(false);
    console.log(isSubmitting);
  };

  return (
    <div>
      {isSuccess && <p>Cadastro realizado com sucesso!</p>}
      <Button className="form-btn" type="submit" onClick={submitPublisherData}>
        Cadastrar
      </Button>
    </div>
  );
};

export default PublisherInsertButton;
