import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormPublisher from "./FormPublisher";
import PublisherSearchButton from "./PublisherSearchButton";
import PublisherDeleteButton from "./PublisherDeleteButton";
import ModalPublisher from "./ModalPublisher";
import ReactPaginate from "react-paginate";
import { BASE_URL } from "../Api";

const TablePublisher = () => {
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState(null);
  const [filteredPublishers, setFilteredPublisher] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  const offset = pageNumber * itemsPerPage;
  const currentPageItems = filteredPublishers.slice(
    offset,
    offset + itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/publisher/all-last-100`);
        setPublishers(response.data);
        setFilteredPublisher(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (deletedPublisher) => {
    setPublishers((prevPublishers) =>
      prevPublishers.filter((publisher) => publisher.id !== deletedPublisher.id)
    );
    setFilteredPublisher((prevPublishers) =>
      prevPublishers.filter((publisher) => publisher.id !== deletedPublisher.id)
    );
  };

  const handleShowModal = (publisher) => {
    setSelectedPublisher(publisher);
  };

  const handleCloseModal = async () => {
    setSelectedPublisher(null);

    try {
      const response = await axios.get(`${BASE_URL}/publisher/all-last-100`);
      setPublishers(response.data);
      setFilteredPublisher(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (results) => {
    setFilteredPublisher(results);
    setPageNumber(0);
  };

  const handleReset = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/publisher/all-last-100`);
      setFilteredPublisher(response.data);
      setPageNumber(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  console.log(publishers);

  const reloadData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/publisher/all-last-100`);
      setPublishers(response.data);
      setFilteredPublisher(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(publishers);

  return (
    <div className="row marketing">
      <div className="col-lg-12">
        <FormPublisher reloadData={reloadData} />
        <PublisherSearchButton onSearch={handleSearch} />
        <Button className="btn btn-secondary" onClick={handleReset}>
          Mostrar Todos
        </Button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Editora</th>
              <th>Administração</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((publisher) => (
              <tr key={publisher.id}>
                <td>{publisher.name}</td>
                <td colSpan={2} className="text-center">
                  <Button
                    className="table-button"
                    onClick={() => handleShowModal(publisher)}
                  >
                    Alterar
                  </Button>

                  <div className="delete-button">
                    <PublisherDeleteButton
                      publisher={publisher}
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
          pageCount={Math.ceil(filteredPublishers.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          activeClassName={"active"}
          forcePage={pageNumber}
        />
        {selectedPublisher && (
          <ModalPublisher
            show={true}
            publisher={selectedPublisher}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default TablePublisher;
