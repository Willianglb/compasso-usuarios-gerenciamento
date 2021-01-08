import React from "react";
import {Navbar} from "react-bootstrap";

const Navbar_users: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Compasso - Gerenciamento de Alunos</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
    </Navbar>
  );
};

export default Navbar_users;
