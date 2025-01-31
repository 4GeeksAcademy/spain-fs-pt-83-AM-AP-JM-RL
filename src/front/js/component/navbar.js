import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { FaHome, FaCog } from "react-icons/fa";
import { SearchBar } from "./searchbar";
import "../../styles/navbar.css";

export const Navbar = ({ onLoginClick, onRegisterClick }) => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [showOffcanvas, setShowOffcanvas] = useState(false);

	useEffect(() => {
		actions.getUserDetails()
	}, [])

	const handleLogout = () => {
		actions.logout();
		navigate("/");
	};

	const isAuthenticated = sessionStorage.getItem("access_token");

	return (
		<>
			<nav className="navbar navbar-light bg-light d-flex">
				<Link to="/" className="home"><FaHome size={24} color="black" /></Link>
				<SearchBar />
				<div className="ml-auto user-container">
					{!isAuthenticated ? (
						<>
							<button className="btn btn-primary" onClick={onLoginClick}>Login</button>
							{onRegisterClick && (
								<button className="btn btn-secondary" onClick={onRegisterClick}>Register</button>
							)}
						</>
					) : (
						<div className="user-profile">
							{store.userDetails.map(user => (
								<Image key={user.id} src={user.image} className="profile-image" roundedCircle />
							))}
							<Button variant="light" className="settings-button" onClick={() => setShowOffcanvas(true)}>
								<FaCog size={24} />
							</Button>
							{/*
								<NavDropdown
							title={<FaCog size={24} />}
							id="user-options-dropdown"
							align="end"
							className="dropdown-menu-right"
						>
							<NavDropdown.Item as={Link} to="/user-details">Mi Perfil</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/events-form">Crear Evento</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
						</NavDropdown>					
						*/}

						</div>
					)}
				</div>
			</nav>

			<Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Opciones de Usuario</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Link to="/user-details" className="offcanvas-link" onClick={() => setShowOffcanvas(false)}>Mi Perfil</Link>
					<Link to="/events-form" className="offcanvas-link" onClick={() => setShowOffcanvas(false)}>Crear Evento</Link>
					<hr />
					<Button variant="danger" onClick={handleLogout}>Cerrar Sesión</Button>
				</Offcanvas.Body>
			</Offcanvas>
		</>


	);
};
