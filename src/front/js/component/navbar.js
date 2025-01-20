import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./searchbar";

export const Navbar = ({ onLoginClick, onRegisterClick }) => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex flex-reverse">
				<Link to={'/events-form'} className="btn btn-primary">Crear Evento</Link>
				<Link to={'/'} className="btn btn-primary">Home</Link >
				<SearchBar />
				<div className="ml-auto">
					<Link className="btn btn-primary" to={'/user-details'}>Mi perfil</Link>
					<button className="btn btn-primary" onClick={onLoginClick}>Login</button>
					<button className="btn btn-secondary" onClick={onRegisterClick}>Register</button>
					<Link className="btn btn-primary" to={'/profile'}>Profile</Link>
				</div>
			</div>
		</nav>
	);
};