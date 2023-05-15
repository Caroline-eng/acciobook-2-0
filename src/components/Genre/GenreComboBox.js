import axios from "axios";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

const GenreComboBox = ({ selectedGenre, setSelectedGenre }) => {
  const [genreOptions, setGenreOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    try {
      axios.get("https://localhost:7197/genre/all").then((response) => {
        setGenreOptions(response.data);
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
    <Formik>
      <div className="form-group">
        <Field
          component={Form.Select}
          name="genre"
          className="form-field"
          type="select"
          onChange={(event) => setSelectedGenre(event.target.value)}
        >
          <option value="">Selecione o gênero</option>
          {genreOptions.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Field>
        <ErrorMessage name="genre" component="div" className="form-error" />
      </div>
    </Formik>
  );
};

export default GenreComboBox;
