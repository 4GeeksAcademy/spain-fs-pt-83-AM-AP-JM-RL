import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";





export const UserDetails = () => {

    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getUserDetails()
    }, [])

    return (
        <div className="container w-50 mt-5 shadow p-4 rounded">
            <h2 className="text-center mb-4">Datos del Usuario</h2>
            <ul className="list-group">
                {store.userDetails.map(user => (
                    <div key={user.id}>
                        <li className="list-group-item">
                            <strong>Email:</strong> {user.email}
                        </li>
                        <li className="list-group-item">
                            <strong>Nombre:</strong> {user.first_name || 'Sin definir'}
                        </li>
                        <li className="list-group-item">
                            <strong>Apellido:</strong> {user.last_name || 'Sin definir'}
                        </li>
                        <li className="list-group-item">
                            <strong>Edad:</strong> {user.age || 'Sin definir'}
                        </li>
                        <li className="list-group-item">
                            <strong>Bio:</strong> {user.bio || 'Sin definir'}
                        </li>
                        <li className="list-group-item">
                            <strong>Ubicación:</strong> {user.location || 'Sin definir'}
                        </li>
                    </div>
                ))}
            </ul>
            <Link to="/user-form" className="btn btn-primary mt-4 w-100">Editar</Link>
        </div>
    );
};
