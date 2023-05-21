import axios from "axios";
import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../Api";

const AuthorComboBox = ({ selectedAuthor, setSelectedAuthor }) => {
  const [authorOptions, setAuthorOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    try {
      axios.get(`${BASE_URL}/author/all`).then((response) => {
        setAuthorOptions(response.data);
      });
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro</p>;
  }

  return (
    <div className="form-group">
      <Field
        component={Form.Select}
        name="author"
        className="form-field"
        type="select"
        onChange={(event) => setSelectedAuthor(event.target.value)}
      >
        <option value="">Selecione o autor</option>
        {authorOptions.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name="author" component="div" className="form-error" />
    </div>
  );
};

export default AuthorComboBox;
