import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import AuthorComboBox from "../Author/AuthorComboBox";
import GenreComboBox from "../Genre/GenreComboBox";
import BookInserButton from "./BookInsertButton";
import ResetButton from "./ResetButton";
import "bootstrap/dist/css/bootstrap.min.css";

const FormBook = () => {
  const [bookData, setBookData] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const schema = yup.object({
    title: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ title: "", author: "", genre: "", description: "" }}
      onSubmit={(values, actions) => {
        const newBookData = {
          title: values.title,
          id_author: parseInt(selectedAuthor),
          id_genre: parseInt(selectedGenre),
          description: values.description,
        };
        setBookData(JSON.stringify(newBookData));
        actions.setSubmitting(false);
      }}
    >
      <div>
        <Form className={"form"}>
          <h1 className={"form-titulo"}>Cadastro de Livros</h1>
          <>
            <div className="form-group">
              <Field
                className="form-field"
                type="text"
                name="title"
                placeholder="Título"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="form-error"
              />
            </div>
            <AuthorComboBox
              selectedAuthor={selectedAuthor}
              setSelectedAuthor={setSelectedAuthor}
            />
            <GenreComboBox
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
            />
            <div className="form-group">
              <Field
                className="form-field"
                type="text"
                name="description"
                placeholder="Descrição"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="form-error"
              />
            </div>
            <div className="button-container">
              <BookInserButton bookData={bookData} />
              <ResetButton />
            </div>
          </>
        </Form>
      </div>
    </Formik>
  );
};

export default FormBook;
