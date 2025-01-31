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
          React
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/about">
          About
        </Navbar.Link>
        <Navbar.Link as={Link} to="/services">
          Services
        </Navbar.Link>
        <Navbar.Link as={Link} to="/pricing">
          Pricing
        </Navbar.Link>
        <Navbar.Link as={Link} to="/contact">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
