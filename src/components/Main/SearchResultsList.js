import React from "react";

const SearchResultsList = ({ results }) => {
  console.log("Chegou aqui no resultList", results);

  return (
    <div className="results-list">
      {results && results.length > 0 ? (
        results.map((result, id) => (
          <div key={id}>
            <p>{result.title}</p>
            <p>Autor: {result.author}</p>
            <p>Gênero: {result.genre}</p>
          </div>
        ))
      ) : (
        <div className="results-zero">
          <p>{results.length === 0 && "Dados não disponíveis"}</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsList;
