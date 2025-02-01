import React from "react";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import "flowbite/dist/flowbite.css";
import "./Nav.css";

function Nav() {
  return (
    <Navbar fluid rounded className="nav">
      <Navbar.Brand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          CR
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" className="navbar-link">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/add" className="navbar-link">
          Add
        </Navbar.Link>
        <Navbar.Link as={Link} to="/search" className="navbar-link">
          Search
        </Navbar.Link>
        <Navbar.Link as={Link} to="/update" className="navbar-link">
          Update
        </Navbar.Link>
        <Navbar.Link as={Link} to="/delete" className="navbar-link">
          Delete
        </Navbar.Link>
        <Navbar.Link as={Link} to="/login" className="navbar-link">
          Login
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
