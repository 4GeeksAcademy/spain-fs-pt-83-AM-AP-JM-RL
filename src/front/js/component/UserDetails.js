import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Image } from "react-bootstrap";
import "../../styles/userDetails.css"

export const UserDetails = () => {
    const { store } = useContext(Context);

    return (
        <div className="container user-details-card mt-5 shadow-sm p-4 rounded">
            <h2 className="text-center mb-4">Datos del Usuario</h2>
            <ul className="list-group">
                <li className="list-group-item text-center">
                    <Image src={store.userDetails.image} fluid roundedCircle className="user-image" />
                </li>
                <li className="list-group-item">
                    <strong>Email:</strong> {store.userDetails.email}
                </li>
                <li className="list-group-item">
                    <strong>Nombre:</strong> {store.userDetails.first_name || 'Sin definir'}
                </li>
                <li className="list-group-item">
                    <strong>Apellido:</strong> {store.userDetails.last_name || 'Sin definir'}
                </li>
                <li className="list-group-item">
                    <strong>Edad:</strong> {store.userDetails.age || 'Sin definir'}
                </li>
                <li className="list-group-item">
                    <strong>Bio:</strong> {store.userDetails.bio || 'Sin definir'}
                </li>
                <li className="list-group-item">
                    <strong>Ubicación:</strong> {store.userDetails.location || 'Sin definir'}
                </li>
            </ul>
            <Link to="/user-form" className="btn btn-primary mt-4 w-100">Editar</Link>
        </div>

    );
};
