import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormGenre from "./FormGenre";
import GenreSearchButton from "./GenreSearchButton";
import GenreDeleteButton from "./GenreDeleteButton";
import ModalGenre from "./ModalGenre";
import ReactPaginate from "react-paginate";
import { BASE_URL } from "../Api";

const TableGenre = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  const offset = pageNumber * itemsPerPage;
  const currentPageItems = filteredGenres.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/genre/all-last-100`);
        setGenres(response.data);
        setFilteredGenres(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (deletedGenre) => {
    setGenres((prevGenres) =>
      prevGenres.filter((genre) => genre.id !== deletedGenre.id)
    );
    setFilteredGenres((prevGenres) =>
      prevGenres.filter((genre) => genre.id !== deletedGenre.id)
    );
  };

  const handleShowModal = (genre) => {
    setSelectedGenre(genre);
  };

  const handleCloseModal = async () => {
    setSelectedGenre(null);

    try {
      const response = await axios.get(`${BASE_URL}/genre/all-last-100`);
      setGenres(response.data);
      setFilteredGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (results) => {
    setFilteredGenres(results);
    setPageNumber(0);
  };

  const handleReset = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/all-last-100`);
      setFilteredGenres(response.data);
      setPageNumber(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  console.log(genres);

  const reloadData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/all-last-100`);
      setGenres(response.data);
      setFilteredGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row marketing">
      <div className="col-lg-12">
        <FormGenre reloadData={reloadData} />
        <GenreSearchButton onSearch={handleSearch} />
        <Button className="btn btn-secondary" onClick={handleReset}>
          Mostrar Todos
        </Button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Gênero</th>
              <th>Administração</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((genre) => (
              <tr key={genre.id}>
                <td>{genre.name}</td>
                <td colSpan={2} className="text-center">
                  <Button
                    className="table-button"
                    onClick={() => handleShowModal(genre)}
                  >
                    Alterar
                  </Button>

                  <div className="delete-button">
                    <GenreDeleteButton genre={genre} onDelete={handleDelete} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"anterior"}
          nextLabel={"próxima"}
          pageCount={Math.ceil(filteredGenres.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          activeClassName={"active"}
          forcePage={pageNumber}
        />
        {selectedGenre && (
          <ModalGenre
            show={true}
            genre={selectedGenre}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default TableGenre;
