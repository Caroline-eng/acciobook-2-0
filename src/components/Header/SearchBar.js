import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";

const SearchBar = ({ setResults, setShowResults }) => {
  const [input, setInput] = useState("");

  const fetchData = async (value) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/book/searchParams/${value}`
      );
      const json = response.data;
      const mappedResults = json.map((book) => {
        return {
          title: book.title,
          author: book.author.name,
          genre: book.genre.name,
        };
      });
      setResults(mappedResults);
      setShowResults(mappedResults.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.trim() !== "") {
      fetchData(value);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Busque por Título, Autor, Gênero..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
