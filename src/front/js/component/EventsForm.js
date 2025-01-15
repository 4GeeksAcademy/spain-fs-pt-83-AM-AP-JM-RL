import React, { useRef } from "react";
import '../../styles/EventsForm.css';

export const EventsForm = () => {
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="container text-center mt-5">
            <h1 className="fs-1 text-center mb-4">Crear Evento</h1>
            <form className="row row-cols g-3 align-items-center">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Título</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Título" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Fecha</label>
                        <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="Fecha" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Hora</label>
                        <input type="time" className="form-control" id="exampleFormControlInput1" placeholder="Hora" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Precio</label>
                        <input type="number" className="form-control" id="exampleControlInput1" placeholder="Precio" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Ubicación</label>
                        <input type="text" className="form-control" id="exampleControlInput1" placeholder="Ubicación" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Tipo de Evento</label>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue={'Tipo de Evento'}>Selecciona una categoría</option>
                            <option value="2">Concierto</option>
                            <option value="3">Fiesta</option>
                            <option value="4">Festival</option>
                            <option value="5">Teatro</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="image-upload-wrapper border rounded p-3" onClick={handleImageClick}>
                        <img src="https://via.placeholder.com/300" alt="Añadir foto" className="placeholder-image img-fluid mb-3" />
                        <input type="file" className="form-control" id="exampleControlInput1" ref={fileInputRef} style={{ display: 'none' }} />
                    </div>
                </div>
            </form>
        </div>
    )
}
