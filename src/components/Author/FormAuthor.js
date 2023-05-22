import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import ResetButton from "./ResetButton";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthorInsertButton from "./AuthorInsertButton";

const FormAuthor = ({ reloadData }) => {
  const [authorData, setAuthorData] = useState(null);

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
        const newAuthorData = {
          name: values.title,
        };
        setAuthorData(JSON.stringify(newAuthorData));
        actions.setSubmitting(false);
      }}
    >
      <div>
        <Form className={"form"}>
          <h1 className={"form-titulo"}>Cadastro de Autores</h1>
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
                <AuthorInsertButton
                  className="insert-button"
                  authorData={authorData}
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

export default FormAuthor;
