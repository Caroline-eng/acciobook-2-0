import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const NavUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="nav-button">
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleModal}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <Modal show={isModalOpen} onHide={toggleModal}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <nav className="navbar-nav">
                <a className="nav-item nav-link" href="#">
                  Lista de Desejos
                </a>
                <a className="nav-item nav-link" href="#">
                  Teste
                </a>
              </nav>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={toggleModal}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default NavUser;
