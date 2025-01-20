import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/UserForm.css"

export const UserForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [bio, setBio] = useState('')
    const [location, setLocation] = useState('')

    const { actions } = useContext(Context)

    const handleSubmit = (e) => {
        const formData = {
            email,
            password,
            firstName,
            lastName,
            age,
            bio,
            location
        }
        e.preventDefault()
        actions.updateUser(formData)
    }


    return (
        <div className="container w-50 mt-5 shadow p-4 rounded">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Formulario de Usuario</h2>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="inputEmail" placeholder="Introduce tu email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="inputPassword" placeholder="Introduce tu contraseña" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputFirstName" className="form-label">Nombre</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" id="inputFirstName" placeholder="Introduce tu nombre" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputLastName" className="form-label">Apellido</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" id="inputLastName" placeholder="Introduce tu apellido" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAge" className="form-label">Edad</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)} type="text" className="form-control" id="inputAge" placeholder="Introduce tu edad" />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputBio" className="form-label">Bio</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="form-control" id="inputBio" rows="3" placeholder="Cuéntanos sobre ti"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputLocation" className="form-label">Ubicación</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" id="inputLocation" placeholder="Introduce tu ubicación" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar</button>
            </form>
        </div>
    );
};
