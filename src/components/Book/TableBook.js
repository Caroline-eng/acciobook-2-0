import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FormBook from "./FormBook";
import BookSearchButton from "./BookSearchButton";
import BookDeleteButton from "./BookDeleteButton";
import ModalBook from "./ModalBook";
import ReactPaginate from "react-paginate";
import { BASE_URL } from "../Api";

const TableBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 5;

  const offset = pageNumber * itemsPerPage;
  const currentPageItems = filteredBooks.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/book/all-last-100`);
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (deletedBook) => {
    setBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== deletedBook.id)
    );
    setFilteredBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== deletedBook.id)
    );
  };

  const handleShowModal = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = async () => {
    setSelectedBook(null);

    try {
      const response = await axios.get(`${BASE_URL}/book/all-last-100`);
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (results) => {
    setFilteredBooks(results);
    setPageNumber(0);
  };

  const handleReset = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/book/all-last-100`);
      setFilteredBooks(response.data);
      setPageNumber(0);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  console.log(books);

  const reloadData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/book/all-last-100`);
      setBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className="row marketing">
      <div className="col-lg-12">
        <FormBook reloadData={reloadData} />
        <BookSearchButton onSearch={handleSearch} />
        <Button className="btn btn-secondary" onClick={handleReset}>
          Mostrar Todos
        </Button>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Livro</th>
              <th>Autor</th>
              <th>Gênero</th>
              <th>Descrição</th>
              <th>Administração</th>
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.genre.name}</td>
                <td>{book.description}</td>
                <td colSpan={2} className="text-center">
                  <Button
                    className="table-button"
                    onClick={() => handleShowModal(book)}
                  >
                    Alterar
                  </Button>

                  <div className="delete-button">
                    <BookDeleteButton book={book} onDelete={handleDelete} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"anterior"}
          nextLabel={"próxima"}
          pageCount={Math.ceil(filteredBooks.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          activeClassName={"active"}
          forcePage={pageNumber}
        />
        {selectedBook && (
          <ModalBook
            show={true}
            book={selectedBook}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default TableBook;
