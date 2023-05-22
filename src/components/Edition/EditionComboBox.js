import axios from "axios";
import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../Api";

const EditionComboBox = ({ selectedEdition, setSelectedEdition }) => {
  const [editionOptions, setEditionOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    try {
      axios.get(`${BASE_URL}/edition/all`).then((response) => {
        setEditionOptions(response.data);
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
        name="edition"
        className="form-field"
        type="select"
        onChange={(event) => setSelectedEdition(event.target.value)}
      >
        <option value="">Selecione a edição</option>
        {editionOptions.map((edition) => (
          <option key={edition.id} value={edition.id}>
            {edition.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name="edition" component="div" className="form-error" />
    </div>
  );
};

export default EditionComboBox;
