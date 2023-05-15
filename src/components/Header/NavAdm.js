import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import "./NavAdm.css";

const NavAdm = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const openModal = (component) => {
    setModalComponent(component);
    setShowModal(true);
  };

  const handleNavLinkClick = () => {
    setIsCollapsed(true); // Recolher o menu ao clicar em um link
  };

  return (
    <Router>
      <nav className={`navbar ${isCollapsed ? "" : "expanded"}`}>
        <div className="navbar-header">
          <div className="navbar-toggler-wrapper">
            <button
              className={`navbar-toggler ${isCollapsed ? "" : "collapsed"}`}
              type="button"
              onClick={toggleCollapse}
              aria-controls="navbarMainToggler"
              aria-expanded={!isCollapsed}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>

        <div
          className={`navbar-collapse ${isCollapsed ? "collapse" : ""}`}
          id="navbarMainToggler"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/edition" className="nav-link">
                Cadastrar Edição
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/book"
                className="nav-link"
                onClick={() => {
                  openModal();
                  handleNavLinkClick();
                }}
              >
                Cadastrar Livro
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/author" className="nav-link">
                Cadastrar Autor
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/genre" className="nav-link">
                Cadastrar Gênero
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/publisher" className="nav-link">
                Cadastrar Editora
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton className="modal-header"></Modal.Header>
        <Modal.Body>{modalComponent && modalComponent}</Modal.Body>
      </Modal>
    </Router>
  );
};

export default NavAdm;
