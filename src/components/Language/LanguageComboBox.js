import axios from "axios";
import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../Api";

const LanguageComboBox = ({ selectedLanguage, setSelectedLanguage }) => {
  const [languageOptions, setLanguageOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    try {
      axios.get(`${BASE_URL}/language/all`).then((response) => {
        setLanguageOptions(response.data);
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

  console.log(selectedLanguage);

  return (
    <div className="form-group">
      <Field
        component={Form.Select}
        name="language"
        className="form-field"
        type="select"
        onChange={(event) => setSelectedLanguage(event.target.value)}
      >
        <option value="">Selecione o idioma</option>
        {languageOptions.map((language) => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name="language" component="div" className="form-error" />
    </div>
  );
};

export default LanguageComboBox;
