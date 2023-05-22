import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import ResetButton from "./ResetButton";
import "bootstrap/dist/css/bootstrap.min.css";
import EditionInsertButton from "./EditionInsertButton";
import BookComboBox from "../Book/BookComboBox";
import PublisherComboBox from "../Publisher/PublisherComboBox";
import LanguageComboBox from "../Language/LanguageComboBox";

const FormEdition = ({ reloadData }) => {
  const [editionData, setEditionData] = useState(null);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const schema = yup.object({
    publicationDate: yup.string().required("Campo obrigatório"),
    pageCount: yup.string().required("Campo obrigatório"),
    isbnCode_10: yup.string().required("Campo obrigatório"),
    isbnCode_13: yup.string().required("Campo obrigatório"),
  });

  const handleInsertSuccess = () => {
    reloadData();
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        book: "",
        publisher: "",
        language: "",
        cover: "",
        publication: "",
        pages: "",
        code10: "",
        code13: "",
      }}
      onSubmit={(values, actions) => {
        const newEditionData = {
          id_Book: parseInt(selectedBook),
          id_Publisher: parseInt(selectedPublisher),
          id_Language: parseInt(selectedLanguage),
          cover: values.cover,
          publicationDate: values.publication,
          pageCount: values.pages,
          isbnCode_10: values.code10,
          isbnCode_13: values.code13,
        };
        setEditionData(JSON.stringify(newEditionData));
        actions.setSubmitting(false);
      }}
    >
      <div>
        <Form className={"form"}>
          <h1 className={"form-titulo"}>Cadastro de Edições</h1>
          <>
            <BookComboBox
              selectedBook={selectedBook}
              setSelectedBook={setSelectedBook}
            />
            <PublisherComboBox
              selectedPublisher={selectedPublisher}
              setSelectedPublisher={setSelectedPublisher}
            />
            <LanguageComboBox
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
            <div className="form-group">
              <Field
                className="form-field"
                type="text"
                name="cover"
                placeholder="Capa do Livro"
              />
              <ErrorMessage
                name="cover"
                component="div"
                className="form-error"
              />
            </div>
            <div className="form-group">
              <Field
                className="form-field"
                type="text"
                name="publication"
                placeholder="Data de Publicação"
              />
              <ErrorMessage
                name="publication"
                component="div"
                className="form-error"
              />
            </div>
            <div className="form-group">
              <Field
                className="form-field"
                type="text"
                name="pages"
                placeholder="Número de páginas"
              />
              <ErrorMessage
                name="pages"
                component="div"
                className="form-error"
              />
            </div>
            <div className="form-group">
              <Field
                className="form-field"
                type="text"
                name="code10"
                placeholder="ISBN 10"
              />
              <ErrorMessage
                name="code10"
                component="div"
                className="form-error"
              />
            </div>
            <div className="form-group">
              <Field
                className="form-field"
                type="text"
                name="code13"
                placeholder="ISBN 13"
              />
              <ErrorMessage
                name="code13"
                component="div"
                className="form-error"
              />
            </div>
            <div className="button-container">
              <div>
                <EditionInsertButton
                  className="insert-button"
                  editionData={editionData}
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

export default FormEdition;
