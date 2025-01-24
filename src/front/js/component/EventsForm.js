import React, { useContext, useState } from "react";
import '../../styles/EventsForm.css';
import { Context } from "../store/appContext";
import * as filestack from "filestack-js";

export const EventsForm = () => {
    const { actions } = useContext(Context)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [image, setImage] = useState('')
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState('')

    const client = filestack.init('AVQNdAjjIRHW0xnKKEipvz') 


    const handleUploadImage = () => {
        const options = {
            onUploadDone: (res) => {
                setImage(res.filesUploaded[0].url)
            },
            fromSources: ["local_file_system"]
        }
        client.picker(options).open()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {};
        formData.title = title;
        formData.description = description;
        formData.date = date;
        formData.time = time;
        formData.price = price;
        formData.location = location;
        formData.image = image;
        formData.type = type;

        try {
            await actions.createEvent(formData);
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
                        <label htmlFor="tipo" className="form-label">Tipo de evento</label>
                        <select required value={type} onChange={(e) => setType(e.target.value)} className="form-select" aria-label="Default select example">
                            <option value={''} disabled>De qué va tu evento?</option>
                            <option value="concierto">Concierto</option>
                            <option value="fiesta">Fiesta</option>
                            <option value="cultural">Cultural</option>
                            <option value="empresarial">Empresarial</option>
                            <option value="otros">Otros</option>
                        </select>
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
                        <select required value={location} onChange={(e) => setLocation(e.target.value)} className="form-select" aria-label="Default select example"> 
                        <option value={''} disabled>¿Donde es el evento?</option>
                            <option value="barcelona">Barcelona</option>
                            <option value="madrid">Madrid</option>
                            <option value="sevilla">Sevilla</option>
                            <option value="valencia">Valencia</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Descripción del evento</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" rows="3" placeholder="Descripción" required></textarea>
                    </div>
                </div>
                <div className="col-md-6">
                    <div onClick={handleUploadImage} className="image-upload-wrapper border rounded p-3">
                        <img src="https://via.placeholder.com/300" alt="Añadir foto" className="placeholder-image img-fluid mb-3" />
                    </div>
                </div>
                <div className="col-12">
                    <button className="btn btn-success w-50">Crear evento</button>
                </div>
            </form>
            {message && <div><p>{message}</p></div >}
            {error && <div><p>{error}</p></div>}
        </div>
    )
}
