import SearchResultsList from "./Main/SearchResultsList";

const Main = ({ results, showResults }) => {
  return <div>{showResults && <SearchResultsList results={results} />}</div>;
};

export default Main;
