import React from 'react';
import { Link } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import { Container, Row, Dropdown } from 'react-bootstrap';
import { BiUser, BiHome } from 'react-icons/bi';
import "./App.css";
const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Container fluid>
      <Row className="justify-content-end">
        <nav className="container-fluid navbar navbar-dark justify-content-between" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', backgroundColor: "white", color: 'white' }}>
          <Link to="/" className="navbar-brand">
            <img
              src={require('./images/logo.png')}
              alt="logo"
              className="img-fluid"
              style={{ maxWidth: '300px', height: 'auto' }}
            />
          </Link>

          <div className="nav-item dropdown">
  <a href="#" className="nav-link" data-bs-toggle="dropdown">
    <BiUser style={{ fontSize: '28px', color: 'black' }} />
  </a>
  <div className="dropdown-menu dropdown-menu-end" style={{ marginLeft: '10%' }}>
    {user && (
      <Link className="dropdown-item" to="/">
        {user.fname} {user.lname} <span className="sr-only"></span>
      </Link>
    )}
    <Link className="dropdown-item" to="/">
      <ImExit style={{ margin: '3px' }} /> Logout <span className="sr-only"></span>
    </Link>
  </div>
</div>

        </nav>
      </Row>
    </Container>
  );
};

export default Navbar;
