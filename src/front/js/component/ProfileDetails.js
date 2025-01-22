import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const ProfileDetails = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams()

    useEffect(() => {
        actions.getEventCreatorDetails(id)
    }, [])

    return (
        <>
            {store.eventCreatorData.map(user => (
                <div key={user.id} className="card mt-5 m-auto shadow-sm" style={{ maxWidth: '50vw' }}>
                    <div className="row g-0">
                        <div className="col-md-6">
                            <img
                                src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HCXwTbNqx8X6h1gkiBjs6dh2OtqYY-takA&s"}
                                className="img-fluid p-3 rounded-start"
                                alt="Profile"
                            />
                            <label className="col-12 col-lg-6 pb-4 text-center mt-3">Calificación: <strong>{user.rate || '⭐⭐⭐⭐⭐'}</strong></label>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="card-body p-4">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>{user.first_name}</strong></li>
                                    <li className="list-group-item"><strong>{user.last_name}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            ))}
        </>
    );
}
