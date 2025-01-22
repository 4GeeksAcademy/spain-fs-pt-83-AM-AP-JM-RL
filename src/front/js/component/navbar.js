import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "./searchbar";
import "../../styles/navbar.css";
export const Navbar = ({ onLoginClick, onRegisterClick }) => {
	return (
		<nav className="navbar navbar-light bg-light d-flex ">
			<Link to={'/'} className="btn btn-primary">Home</Link >
				<Link to={'/events-form'} className="btn btn-primary">Crear Evento</Link>
				
				<SearchBar />
				<div className="ml-auto">
					<button className="btn btn-primary" onClick={onLoginClick}>Login</button>
					<button className="btn btn-secondary" onClick={onRegisterClick}>Register</button>
					<Link className="btn btn-primary" to={'/profile'}>Profile</Link>
				</div>
			
		</nav>
	);
};