import axios from "axios";
import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../Api";

const PublisherComboBox = ({ selectedPublisher, setSelectedPublisher }) => {
  const [publisherOptions, setPublisherOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    try {
      axios.get(`${BASE_URL}/publisher/all`).then((response) => {
        setPublisherOptions(response.data);
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
  console.log(selectedPublisher);

  return (
    <div className="form-group">
      <Field
        component={Form.Select}
        name="publisher"
        className="form-field"
        type="select"
        onChange={(event) => setSelectedPublisher(event.target.value)}
      >
        <option value="">Selecione a editora</option>
        {publisherOptions.map((publisher) => (
          <option key={publisher.id} value={publisher.id}>
            {publisher.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name="publisher" component="div" className="form-error" />
    </div>
  );
};

export default PublisherComboBox;
