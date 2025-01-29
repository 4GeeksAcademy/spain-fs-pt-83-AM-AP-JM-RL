import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { SearchBar } from "./searchbar";
import "../../styles/navbar.css";

export const Navbar = ({ onLoginClick, onRegisterClick }) => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logout();
		navigate("/");
	};

	const isAuthenticated = sessionStorage.getItem("access_token");

	return (
		<nav className="navbar navbar-light bg-light d-flex">
			<Link to="/" className="btn btn-primary">Home</Link>
			<Link to="/events-form" className="btn btn-primary">Crear Evento</Link>
		
			<SearchBar />
			<div className="ml-auto">
				{!isAuthenticated ? (
					<>
						<button className="btn btn-primary" onClick={onLoginClick}>Login</button>
						{onRegisterClick && (
							<button className="btn btn-secondary" onClick={onRegisterClick}>Register</button>
						)}
					</>
				) : (
					<>
						<Link className="btn btn-primary" to="/user-details">Mi perfil</Link>
						<button className="btn btn-secondary" onClick={handleLogout}>Cerrar</button>
					</>
				)}
			</div>
		</nav>
	);
};
