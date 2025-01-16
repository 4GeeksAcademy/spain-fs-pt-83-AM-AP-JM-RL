import React, { useContext, useRef, useState } from "react";
import '../../styles/EventsForm.css';
import { Context } from "../store/appContext";

export const EventsForm = () => {
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const { actions } = useContext(Context)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await actions.createEvent({ title, description, date, time, price, location, image })

        } catch (error) {
            setError(`Ha ocurrido un error creando el evento, ${error}`)
            setMessage('')
        }

        setTitle('')
        setDescription('')
        setDate('')
        setTime('')
        setPrice('')
        setLocation('')
        setImage('')

    }

    return (
        <div className="container text-center mt-5">
            <h1 className="fs-1 text-center mb-4 fw-bold text-decoration-underline">Crear Evento</h1>
            <form onSubmit={handleSubmit} className="row row-cols g-3 align-items-center">
                <div className="col-md-6 text-center">
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className="form-control" id="titulo" placeholder="Título" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fecha" className="form-label">Fecha</label>
                        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="form-control" id="fecha" placeholder="Fecha" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hora" className="form-label">Hora</label>
                        <input value={time} onChange={(e) => setTime(e.target.value)} type="time" className="form-control" id="hora" placeholder="Hora" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">Precio</label>
                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="form-control" id="precio" placeholder="Precio" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ubicacion" className="form-label">Ubicación</label>
                        <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" id="ubicacion" placeholder="Ubicación" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripción del evento</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" rows="3" placeholder="Descripción" required></textarea>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="image-upload-wrapper border rounded p-3" onClick={handleImageClick}>
                        <img src="https://via.placeholder.com/300" alt="Añadir foto" className="placeholder-image img-fluid mb-3" />
                        <input type="file" className="form-control" id="imagen" ref={fileInputRef} style={{ display: 'none' }} required />
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-success w-50">Crear evento</button>
                </div>
            </form>
            {message && <div><p>{message}</p></div>}
            {error && <div><p>{error}</p></div>}
        </div>
    )
}
