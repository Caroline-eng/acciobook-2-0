import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormEdition from "./FormEdition";
import EditionDeleteButton from "./EditionDeleteButton";
import ModalEdition from "./ModalEdition";
import ReactPaginate from "react-paginate";
import { BASE_URL } from "../Api";

const TableEdition = () => {
  const [editions, setEditions] = useState([]);
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [filteredEditions, setFilteredEdition] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  const offset = pageNumber * itemsPerPage;
  const currentPageItems = filteredEditions.slice(
    offset,
    offset + itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/edition/all-last-100`);
        setEditions(response.data);
        setFilteredEdition(response.data);
        console.error(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (deletedEdition) => {
    setEditions((prevEditions) =>
      prevEditions.filter((edition) => edition.id !== deletedEdition.id)
    );
    setFilteredEdition((prevEditions) =>
      prevEditions.filter((edition) => edition.id !== deletedEdition.id)
    );
  };

  const handleShowModal = (edition) => {
    setSelectedEdition(edition);
  };

  const handleCloseModal = async () => {
    setSelectedEdition(null);

    try {
      const response = await axios.get(`${BASE_URL}/edition/all-last-100`);
      setEditions(response.data);
      setFilteredEdition(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  console.log(editions);

  const reloadData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/edition/all-last-100`);
      setEditions(response.data);
      setFilteredEdition(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(editions);

  return (
    <div className="row marketing">
      <div className="col-lg-12">
        <FormEdition reloadData={reloadData} />
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Livro</th>
              <th>Editora</th>
              <th>Idioma</th>
              <th>Data de Publicação</th>
              <th>Páginas</th>
              <th>ISBN_10</th>
              <th>ISBN_13</th>
              <th>Administração</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((edition) => (
              <tr key={edition.id}>
                <td>{edition.book.title}</td>
                <td>{edition.publisher.name}</td>
                <td>{edition.language.name}</td>
                <td>{edition.publicationDate}</td>
                <td>{edition.pageCount}</td>
                <td>{edition.isbnCode_10}</td>
                <td>{edition.isbnCode_13}</td>
                <td colSpan={2} className="text-center">
                  <Button
                    className="table-button"
                    onClick={() => handleShowModal(edition)}
                  >
                    Alterar
                  </Button>

                  <div className="delete-button">
                    <EditionDeleteButton
                      edition={edition}
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
          pageCount={Math.ceil(filteredEditions.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          activeClassName={"active"}
          forcePage={pageNumber}
        />
        {selectedEdition && (
          <ModalEdition
            show={true}
            edition={selectedEdition}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default TableEdition;
