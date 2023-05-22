import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import GenreInsertButton from "./GenreInsertButton";
import ResetButton from "./ResetButton";
import "bootstrap/dist/css/bootstrap.min.css";

const FormGenre = ({ reloadData }) => {
  const [genreData, setGenreData] = useState(null);

  const schema = yup.object({
    title: yup.string().required("Campo obrigatório"),
  });

  const handleInsertSuccess = () => {
    reloadData();
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ title: "" }}
      onSubmit={(values, actions) => {
        const newGenreData = {
          name: values.title,
        };
        setGenreData(JSON.stringify(newGenreData));
        actions.setSubmitting(false);
      }}
    >
      <div>
        <Form className={"form"}>
          <h1 className={"form-titulo"}>Cadastro de Gêneros</h1>
          <>
            <div className="form-group">
              <Field
                className="form-field"
                type="text"
                name="title"
                placeholder="Nome"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="form-error"
              />
            </div>
            <div className="button-container">
              <div>
                <GenreInsertButton
                  className="insert-button"
                  genreData={genreData}
                  onInsertSuccess={handleInsertSuccess}
                />
              </div>
              <div>
                <ResetButton className="reset-button" />
              </div>
            </div>
          </>
        </Form>
      </div>
    </Formik>
  );
};

export default FormGenre;
