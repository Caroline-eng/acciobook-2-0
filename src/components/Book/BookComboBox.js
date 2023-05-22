import axios from "axios";
import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "../Api";

const BookComboBox = ({ selectedBook, setSelectedBook }) => {
  const [bookOptions, setBookOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    try {
      axios.get(`${BASE_URL}/book/all`).then((response) => {
        setBookOptions(response.data);
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

  console.log(selectedBook);

  return (
    <div className="form-group">
      <Field
        component={Form.Select}
        name="book"
        className="form-field"
        type="select"
        onChange={(event) => setSelectedBook(event.target.value)}
      >
        <option value="">Selecione o livro</option>
        {bookOptions.map((book) => (
          <option key={book.id} value={book.id}>
            {book.title}
          </option>
        ))}
      </Field>
      <ErrorMessage name="book" component="div" className="form-error" />
    </div>
  );
};

export default BookComboBox;
