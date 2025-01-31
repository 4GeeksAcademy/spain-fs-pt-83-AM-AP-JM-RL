import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const ProfileDetails = () => {
    const { store, actions } = useContext(Context);
    const { event_id } = useParams();
    const [rate, setRate] = useState('');

    useEffect(() => {
        actions.getEventCreatorData(event_id);
    }, [event_id, rate]);




    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = store.eventCreatorData[0].id
        const formData = {
            rate
        }

        if (userId) {
            await actions.addRating(formData, userId);
            setRate('')
        } else {
            console.error('User ID not found');
        }
    };



    return (
        <>
            {store.eventCreatorData.map((user) => (
                <div key={user.id} className="d-flex justify-content-center">
                    <div className="card mt-5 shadow-sm rounded-lg" style={{ width: '50vw' }}>
                        <div className="row g-0">
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                <img
                                    src={user.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9HCXwTbNqx8X6h1gkiBjs6dh2OtqYY-takA&s"}
                                    className="img-fluid p-3"
                                    alt="Profile"
                                    style={{ objectFit: 'cover', width: '230px', height: '230px' }}
                                />
                            </div>

                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="card-title text-center">{user.first_name} {user.last_name}</h5>
                                    <p className="text-center text-muted">Registrado desde {user.created_at}</p>
                                    <div className="d-flex justify-content-center mb-3">
                                        <span className="badge bg-primary">{user.average_rate ? user.average_rate.toFixed(2) + '⭐' : '⭐⭐⭐⭐⭐'}</span>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <ul className="list-unstyled">
                                            <li><strong>Nombre:</strong> {user.first_name}</li>
                                            <li><strong>Apellido:</strong> {user.last_name}</li>
                                        </ul>
                                    </div>
                                    <p>¿Te gustaría puntuar a este creador?</p>
                                    <form onSubmit={handleSubmit}>
                                        <input value={rate} onChange={(e) => setRate(e.target.value)} min={0} max={5} className="form-control w-75" type="number" placeholder="Puntuar"></input>
                                        <input className="btn btn-success mt-1" value={'Confirmar'} type="submit"></input>
                                        {store.message && <div><p className="alert alert-success mt-1">{store.message}</p></div>}
                                        {store.error && <div><p className="alert alert-danger mt-1">{store.error}</p></div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
