import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

////
const EditionInsertButton = (props) => {
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

  const submitEditionData = async () => {
    setIsSubmitting(true);
    const editionData = props.editionData;

    if (editionData) {
      try {
        const response = await axios.post(
          `${BASE_URL}/edition/insert/`,
          editionData,
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
      <Button className="form-btn" type="submit" onClick={submitEditionData}>
        Cadastrar
      </Button>
    </div>
  );
};

export default EditionInsertButton;
