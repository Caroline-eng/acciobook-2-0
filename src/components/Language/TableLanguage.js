import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormLanguage from "./FormLanguage";
import LanguageSearchButton from "./LanguageSearchButton";
import LanguageDeleteButton from "./LanguageDeleteButton";
import ModalLanguage from "./ModalLanguage";
import ReactPaginate from "react-paginate";
import { BASE_URL } from "../Api";

const TableLanguage = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [filteredLanguages, setFilteredLanguage] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  const offset = pageNumber * itemsPerPage;
  const currentPageItems = filteredLanguages.slice(
    offset,
    offset + itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/language/all-last-100`);
        setLanguages(response.data);
        setFilteredLanguages(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (deletedLanguage) => {
    setLanguages((prevLanguages) =>
      prevLanguages.filter((language) => language.id !== deletedLanguage.id)
    );
    setFilteredLanguage((prevLanguages) =>
      prevLanguages.filter((language) => language.id !== deletedLanguage.id)
    );
  };

  const handleShowModal = (language) => {
    setSelectedLanguage(language);
  };

  const handleCloseModal = async () => {
    setSelectedLanguage(null);

    try {
      const response = await axios.get(`${BASE_URL}/language/all-last-100`);
      setLanguages(response.data);
      setFilteredLanguage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (results) => {
    setFilteredLanguage(results);
    setPageNumber(0);
  };

  const handleReset = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/language/all-last-100`);
      setFilteredLanguage(response.data);
      setPageNumber(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  console.log(languages);

  const reloadData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/language/all-last-100`);
      setLanguages(response.data);
      setFilteredLanguages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(languages);

  return (
    <div className="row marketing">
      <div className="col-lg-12">
        <FormLanguage reloadData={reloadData} />
        <LanguageSearchButton onSearch={handleSearch} />
        <Button className="btn btn-secondary" onClick={handleReset}>
          Mostrar Todos
        </Button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Idioma</th>
              <th>Administração</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((language) => (
              <tr key={language.id}>
                <td>{language.name}</td>
                <td colSpan={2} className="text-center">
                  <Button
                    className="table-button"
                    onClick={() => handleShowModal(language)}
                  >
                    Alterar
                  </Button>

                  <div className="delete-button">
                    <LanguageDeleteButton
                      language={language}
                      onDelete={handleDelete}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"anterior"}
          nextLabel={"próxima"}
          pageCount={Math.ceil(filteredLanguages.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          activeClassName={"active"}
          forcePage={pageNumber}
        />
        {selectedAuthor && (
          <ModalLanguage
            show={true}
            language={selectedLanguage}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default TableLanguage;
