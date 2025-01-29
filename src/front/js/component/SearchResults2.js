import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const SearchResults2 = () => {

    const { store, actions } = useContext(Context)
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        actions.getEvents()
    }, [store.getEvents])

    const handleChange = (e) => {
        e.preventDefault()
        const formData = {
            title,
            type
        }
        actions.searchEvents(formData)
    }

    return (
        <>


            <div className="container-fluid">
                <form onChange={handleChange} className="d-flex justify-content-center" role="search">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control me-2 w-25 text-center mt-3" type="search" placeholder="Title" aria-label="Search" />
                    <select value={type} onChange={(e) => setType(e.target.value)} className="form-select w-25" aria-label="Default select example">
                        <option value={''} disabled>Filtrar por tipo de evento</option>
                        <option value="concierto">concierto</option>
                        <option value="fiesta">fiesta</option>
                        <option value="cultural">cultural</option>
                        <option value="empresarial">empresarial</option>
                        <option value="otros">otros</option>
                    </select>
                </form>
            </div>

            {store.filteredEvents.map(event => (
                <div key={event.id} className="card" style={{ width: '18rem' }}>
                    <img src={event.image} className="card-img-top" alt='Event image' />
                    <div className="card-body">
                        <h5 className="card-title">{event.title}</h5>
                        <p className="card-text">{event.description}</p>
                    </div>
                </div>
            ))}
        </>
    )
}