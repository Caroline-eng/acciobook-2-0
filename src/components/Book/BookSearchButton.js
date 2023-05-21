import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../Api";

const BookSearchButton = ({ onSearch }) => {
  const [showTextbox, setShowTextbox] = useState(false);
  const [textboxValue, setTextboxValue] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleButtonClick = () => {
    setShowTextbox(true);
  };

  const handleTextboxChange = (event) => {
    setTextboxValue(event.target.value);
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/book/searchParams/${searchTerm}`
      );
      setApiResponse(response.data);
      onSearch(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchButtonClick = async () => {
    await handleSearch(textboxValue);
    setTextboxValue("");
    setShowTextbox(false);
  };

  console.log(apiResponse);
  console.log(filteredBooks);
  console.log(setFilteredBooks);

  return (
    <div className="search-container">
      <Button onClick={handleButtonClick}>Pesquisar</Button>
      {showTextbox && (
        <div>
          <input
            id="textSearch"
            type="text"
            value={textboxValue}
            onChange={handleTextboxChange}
          />
          <Button className="btn buscar" onClick={handleSearchButtonClick}>
            Buscar
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookSearchButton;
