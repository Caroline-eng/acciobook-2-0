import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { useState } from "react";
import "./index.css";

function App() {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  return (
    <div>
      <Header setResults={setResults} setShowResults={setShowResults} />
      <Main results={results} showResults={showResults} />
      <Footer />
    </div>
  );
}
export default App;
