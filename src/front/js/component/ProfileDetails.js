import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const ProfileDetails = () => {
    const { store } = useContext(Context);

    return (
        <div className="card mt-5 m-auto shadow-sm" style={{ maxWidth: '50vw' }}>
            <div className="row g-0">
                <div className="col-md-6">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HCXwTbNqx8X6h1gkiBjs6dh2OtqYY-takA&s"
                        className="img-fluid p-3 rounded-start"
                        alt="Profile"
                    />
                    <label className="col-12 col-lg-6 pb-4 text-center mt-3"><strong>⭐⭐⭐⭐⭐</strong></label>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div className="card-body p-4">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Nombre</strong></li>
                            <li className="list-group-item"><strong>Apellido</strong></li>
                            <li className="list-group-item"><strong>Fecha de Nacimiento</strong></li>
                            <li className="list-group-item"><strong>Bio</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
