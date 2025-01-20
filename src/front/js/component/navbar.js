import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { SearchBar } from "./searchbar";

export const Navbar = ({ onLoginClick }) => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = () => {
		actions.logout();
		navigate("/");
	};

	const isAuthenticated = sessionStorage.getItem("access_token");

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex flex-reverse">
				<Link to={'/events-form'} className="btn btn-primary">Crear Evento</Link>
				<Link to={'/'} className="btn btn-primary">Home</Link >
				<SearchBar />
				<div className="ml-auto">
					{
						!isAuthenticated ? (
							<button className="btn btn-primary" onClick={onLoginClick}>Login</button>
						) : (
							<>
								<Link className="btn btn-primary" to={'/profile'}>Profile</Link>
								<button className="btn btn-secondary" onClick={handleLogout}>Cerrar</button>
							</>
						)
					}
				</div>
			</div>
		</nav>
	);
};