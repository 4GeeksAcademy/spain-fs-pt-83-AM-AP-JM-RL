import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ onLoginClick, onRegisterClick }) => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex flex-reverse">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
				<button className="btn btn-primary" onClick={onLoginClick}>Login</button>
				<button className="btn btn-secondary" onClick={onRegisterClick}>Register</button>
				</div>
			</div>
		</nav>
	);
};