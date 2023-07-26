import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

// importing assets
import logoDark from "../../../assets/img/ecommerce-black-transparent-logo.png";
import logoLight from "../../../assets/img/ecommerce-color-transparent-logo.png";

// imports from bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// imports from react icons
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineShopping } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";

import { useSelector } from "react-redux";
import UserOptions from "../userOptions/UserOptions";

const icon = { fontSize: "1.3em" };

const NavBar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [activeLink, setActiveLink] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <Navbar expand="lg" className={scrolled ? "scrolled my-nav" : "my-nav"}>
      <Container className="navBar">
        <Link to="/">
          <img src={scrolled ? logoLight : logoDark} className="logo" alt="" />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto m-5 ">
            <Link
              to="/"
              className={
                activeLink === "home"
                  ? "active navbar-link link"
                  : "navbar-link link"
              }
              onClick={() => setActiveLink("home")}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={
                activeLink === "addTask"
                  ? "active navbar-link link"
                  : "navbar-link link"
              }
              onClick={() => setActiveLink("addTask")}
            >
              Products
            </Link>

            <Link
              to="/contact"
              className={
                activeLink === "task"
                  ? "active navbar-link link"
                  : "navbar-link link"
              }
              onClick={() => setActiveLink("task")}
            >
              Contact
            </Link>
            <Link
              to="/about"
              className={
                activeLink === "contact"
                  ? "active navbar-link link"
                  : "navbar-link link"
              }
              onClick={() => setActiveLink("contact")}
            >
              About
            </Link>

            <div className="icon">
              <Link to="/search" className="link">
                <BiSearchAlt2
                  style={icon}
                  color={activeLink === "search" ? "red" : ""}
                  onClick={() => setActiveLink("search")}
                />
              </Link>

              <Link to="/orders" className="link">
                <AiOutlineShopping
                  style={icon}
                  color={activeLink === "orders" ? "red" : ""}
                  onClick={() => setActiveLink("orders")}
                />
              </Link>

              <div className="profile-icon">
                {isAuthenticated ? (
                  <UserOptions user={user} />
                ) : (
                  <>
                    <Link to="/login" className="link">
                      <IoMdContact
                        style={icon}
                        color={activeLink === "profile" ? "red" : ""}
                        onClick={() => setActiveLink("profile")}
                      />
                    </Link>{" "}
                  </>
                )}
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
