import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SearchBar from "./Header/SearchBar";
import Nav from "./Header/Nav";
import Logo from "./Header/Logo";
import Login from "./Header/Login";
import "../components/Header.css";

const Header = ({ setResults, setShowResults }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="navbar">
      <div className="search-bar-container">
        <SearchBar setResults={setResults} setShowResults={setShowResults} />
      </div>
      <div className="nav-items">
        <Button className="btn button" onClick={openModal}>
          Entrar
        </Button>
        <Nav />
        <Logo />
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton className="modal-header"></Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
