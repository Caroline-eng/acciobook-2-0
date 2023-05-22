import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import ResetButton from "./ResetButton";
import "bootstrap/dist/css/bootstrap.min.css";
import PublisherInsertButton from "./PublisherInsertButton";

const FormPublisher = ({ reloadData }) => {
  const [publisherData, setPublisherData] = useState(null);

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
        const newPublisherData = {
          name: values.title,
        };
        setPublisherData(JSON.stringify(newPublisherData));
        actions.setSubmitting(false);
      }}
    >
      <div>
        <Form className={"form"}>
          <h1 className={"form-titulo"}>Cadastro de Editoras</h1>
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
                <PublisherInsertButton
                  className="insert-button"
                  publisherData={publisherData}
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

export default FormPublisher;
