import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaHome, FaCog, FaUser, FaCalendarPlus, FaSignOutAlt } from "react-icons/fa";
import { SearchBar } from "./searchbar";
import "../../styles/navbar.css";
import "../../styles/modal.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = ({ onLoginClick, onRegisterClick }) => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [showOffcanvas, setShowOffcanvas] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);



	const handleLogout = () => {
		actions.logout();
		navigate("/");
	};

	return (
		<>
			<nav className="navbar navbar-light bg-light d-flex">
				<Link to="/" className="home"><FaHome size={24} color="black" /></Link>
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
							<Button variant="light" className="settings-button" onClick={() => setShowOffcanvas(true)}>
								<FaCog size={24} />
							</Button>
						</div>
					)}
				</div>
			</nav>
			<Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end" className="custom-offcanvas">
				<Offcanvas.Header closeButton className="offcanvas-header">
					<Offcanvas.Title className="offcanvas-title">Opciones de Usuario</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className="offcanvas-body">
					<div className="offcanvas-links">
						<Link to="/user-details" className="offcanvas-link" onClick={() => setShowOffcanvas(false)}>
							<FaUser className="offcanvas-icon" /> Mi Perfil
						</Link>
						<Link to="/events-form" className="offcanvas-link" onClick={() => { setShowOffcanvas(false) }}>
							<FaCalendarPlus className="offcanvas-icon" /> Crear Evento
						</Link>
						{store.message && <div><p className="alert alert-success">{store.message}</p></div>}
						{store.error && <div><p className="alert alert-danger">{store.error}</p></div>}
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
						<Button variant="danger" onClick={() => { handleLogout(); setShowOffcanvas(false); setShowLogoutModal(false) }}
						>Cerrar Sesión</Button>
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
