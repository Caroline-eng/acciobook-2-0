import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormAuthor from "./FormAuthor";
import AuthorSearchButton from "./AuthorSearchButton";
import AuthorDeleteButton from "./AuthorDeleteButton";
import ModalAuthor from "./ModalAuthor";
import ReactPaginate from "react-paginate";
import { BASE_URL } from "../Api";

const TableAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [filteredAuthors, setFilteredAuthor] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  const offset = pageNumber * itemsPerPage;
  const currentPageItems = filteredAuthors.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/author/all-last-100`);
        setAuthors(response.data);
        setFilteredAuthor(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (deletedAuthor) => {
    setAuthors((prevAuthors) =>
      prevAuthors.filter((author) => author.id !== deletedAuthor.id)
    );
    setFilteredAuthor((prevAuthors) =>
      prevAuthors.filter((author) => author.id !== deletedAuthor.id)
    );
  };

  const handleShowModal = (author) => {
    setSelectedAuthor(author);
  };

  const handleCloseModal = async () => {
    setSelectedAuthor(null);

    try {
      const response = await axios.get(`${BASE_URL}/author/all-last-100`);
      setAuthors(response.data);
      setFilteredAuthor(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (results) => {
    setFilteredAuthor(results);
    setPageNumber(0);
  };

  const handleReset = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/author/all-last-100`);
      setFilteredAuthor(response.data);
      setPageNumber(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  console.log(authors);

  const reloadData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/author/all-last-100`);
      setAuthors(response.data);
      setFilteredAuthor(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(authors);

  return (
    <div className="row marketing">
      <div className="col-lg-12">
        <FormAuthor reloadData={reloadData} />
        <AuthorSearchButton onSearch={handleSearch} />
        <Button className="btn btn-secondary" onClick={handleReset}>
          Mostrar Todos
        </Button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Autor</th>
              <th>Administração</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((author) => (
              <tr key={author.id}>
                <td>{author.name}</td>
                <td colSpan={2} className="text-center">
                  <Button
                    className="table-button"
                    onClick={() => handleShowModal(author)}
                  >
                    Alterar
                  </Button>

                  <div className="delete-button">
                    <AuthorDeleteButton
                      author={author}
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
          pageCount={Math.ceil(filteredAuthors.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          activeClassName={"active"}
          forcePage={pageNumber}
        />
        {selectedAuthor && (
          <ModalAuthor
            show={true}
            author={selectedAuthor}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default TableAuthor;
