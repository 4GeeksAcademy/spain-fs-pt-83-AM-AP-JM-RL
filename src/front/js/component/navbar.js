import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaHome, FaCog, FaUser, FaCalendarPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import { SearchBar } from "./searchbar";
import "../../styles/navbar.css";
import "../../styles/modal.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

export const NavbarComponent = ({ onLoginClick, onRegisterClick }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleLogout = () => {
        actions.logout();
        navigate("/");
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    return (
        <>
            {/*
            {[false, 'sm', 'md', 'lg', 'xl', 'xxl'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container fluid>
                        <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    {!store.isAuthenticated ? (
                                        <>
                                            <button className="btn btn-primary" onClick={onLoginClick}>Login</button>
                                            {onRegisterClick && (
                                                <button className="btn btn-secondary" onClick={onRegisterClick}>Register</button>
                                            )}
                                        </>
                                    ) : (
                                        <div className="user-profile">
                                            <Image src={store.userDetails.image} className="profile-image" roundedCircle />
                                            <Button variant="light" className="settings-button" onClick={() => setShowOffcanvas(true)}><FaCog size={24} /></Button>
                                        </div>
                                    )}
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <SearchBar />
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
                */}
            {/*
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
*/}
            {/*---------- Cambiar estilos a react botstrap ------*/}

            <nav className="navbar navbar-light bg-light d-flex">
                <Button variant="light" className="d-lg-none mobile-menu-button" onClick={toggleMobileMenu}><FaBars size={24} /></Button>

                <div className="d-none d-lg-flex w-100 align-items-center">
                    <Link to="/" className="home"><FaHome size={24} color="black" /></Link>
                    <Link to="/results" className="btn btn-secondary">Mostrar Eventos</Link>
                    <SearchBar />
                    <div className="ml-auto user-container">
                        {!store.isAuthenticated ? (
                            <>
                                <button className="btn btn-primary" onClick={onLoginClick}>Login</button>
                                {onRegisterClick && (
                                    <button className="btn btn-secondary" onClick={onRegisterClick}>Register</button>
                                )}
                            </>
                        ) : (
                            <div className="user-profile">
                                <Image src={store.userDetails.image} className="profile-image" roundedCircle />
                                <Button variant="light" className="settings-button" onClick={() => setShowOffcanvas(true)}><FaCog size={24} /></Button>
                            </div>
                        )}
                    </div>
                </div>

                {showMobileMenu && (
                    <div className="mobile-menu d-lg-none">
                        <div className="mobile-menu-section">
                            <Link to="/" className="mobile-menu-link" onClick={toggleMobileMenu}><FaHome className="mobile-menu-icon" /> Home</Link>
                            <Link to="/results" className="mobile-menu-link" onClick={toggleMobileMenu}>Mostrar Eventos</Link>
                            <div className="mobile-searchbar">
                                <SearchBar />
                            </div>
                        </div>

                        <div className="mobile-menu-section">
                            {!store.isAuthenticated ? (
                                <button className="btn btn-primary w-100" onClick={onLoginClick}>Login</button>
                            ) : (
                                <>
                                    <div className="user-profile-mobile">
                                        <Image src={store.userDetails.image} className="profile-image-mobile" roundedCircle />
                                    </div>
                                    <Link to="/user-details" className="mobile-menu-link" onClick={toggleMobileMenu}><FaUser className="mobile-menu-icon" /> Mi Perfil</Link>
                                    {!store.userDetails.first_name || !store.userDetails.last_name ? (
                                        <p className="text-danger text-center">Para poder crear un evento necesitas rellenar tu nombre y apellidos en el perfil</p>
                                    ) : (
                                        <Link to="/events-form" className="mobile-menu-link" onClick={toggleMobileMenu}><FaCalendarPlus className="mobile-menu-icon" /> Crear Evento</Link>
                                    )}
                                </>
                            )}
                        </div>

                        {store.isAuthenticated && (
                            <div className="mobile-menu-section">
                                <Button variant="danger" className="w-100" onClick={() => { handleLogout(); toggleMobileMenu(); }}>Cerrar Sesión</Button>
                            </div>
                        )}
                    </div>
                )}
            </nav>


            <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end" className="custom-offcanvas">
                <Offcanvas.Header closeButton className="offcanvas-header">
                    <Offcanvas.Title className="offcanvas-title">Opciones de Usuario</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="offcanvas-body">
                    <div className="offcanvas-links">
                        <Link to="/user-details" className="offcanvas-link" onClick={() => setShowOffcanvas(false)}><FaUser className="offcanvas-icon" /> Mi Perfil</Link>
                        {!store.userDetails.first_name || !store.userDetails.last_name ? (
                            <p className="text-danger text-center">Para poder crear un evento necesitas rellenar tu nombre y apellidos en el perfil</p>
                        ) : (
                            <Link to="/events-form" className="offcanvas-link" onClick={() => setShowOffcanvas(false)}><FaCalendarPlus className="offcanvas-icon" /> Crear Evento</Link>
                        )}
                    </div>
                    <div className="offcanvas-footer">
                        <hr className="offcanvas-divider" />
                        <Button variant="danger" onClick={() => setShowLogoutModal(true)} className="offcanvas-logout">Cerrar Sesión</Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
                <div className="modal-form">
                    <Modal.Body className="text-center">
                        <p>¿Deseas cerrar sesión?</p>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>Cancelar</Button>
                        <Button variant="danger" onClick={() => { handleLogout(); setShowOffcanvas(false); setShowLogoutModal(false); }}>Cerrar Sesión</Button>
                    </Modal.Footer>
                </div>
            </Modal>

            <ToastContainer
                autoClose={3000}
                theme="colored"
                transition={Slide}
                position="top-center"
            />
        </>
    );
};
