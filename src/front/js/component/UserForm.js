import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/UserForm.css";
import { useNavigate } from "react-router-dom";
import * as filestack from "filestack-js";
import { BackButton } from "./BackButton";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export const UserForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [matchingPassword, setMatchingPassword] = useState('')

    const token = sessionStorage.getItem('access_token')

    const handleShowPasswordChange = async (e) => {
        e.preventDefault()
        const response = await fetch('https://symmetrical-space-lamp-69r6p7wpq9wxc679-3001.app.github.dev/api/find-password', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ "password": password })
        })
        const data = await response.json()
        if (response.ok) {
            setShowPasswordChange(true)
        } else {
            toast.error(data.error)
        }
    }

    const handleClosePasswordChange = () => setShowPasswordChange(false)

    const { store, actions } = useContext(Context);

    const client = filestack.init("AVQNdAjjIRHW0xnKKEipvz");

    const handleUploadImage = () => {
        const options = {
            onUploadDone: (res) => {
                setImage(res.filesUploaded[0].url);
            },
            fromSources: ["local_file_system"],
        };
        client.picker(options).open();
    };



    const handleSubmitPasswordChange = async (e) => {
        e.preventDefault()
        if (newPassword.length < 8) {
            toast.warning('La contraseña debe tener más de 8 caracteres')
        } else {
            try {
                const response = await fetch('https://symmetrical-space-lamp-69r6p7wpq9wxc679-3001.app.github.dev/api/change-password', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify({ "password": newPassword, "matchingPassword": matchingPassword })
                })
                const data = await response.json()
                if (response.ok) {
                    toast.success(data.message)
                    setPassword('')
                    navigate('/user-details')
                } else {
                    toast.error(data.error)
                }

            } catch (error) {
                console.error(error.message)
            }
        }

    }



    const handleSubmit = async (e) => {
        const formData = {
            email,
            password,
            firstName,
            lastName,
            age,
            bio,
            location,
            image,
        };
        e.preventDefault();
        await actions.updateUser(formData);
        if (!store.error) {
            navigate("/user-details");
        }
    };

    return (
        <>
            <div className="container user-form-card mt-5 p-4 rounded">
                <BackButton />
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4">Formulario de Usuario</h2>
                    <div className="form-group mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="inputEmail" placeholder="Introduce tu email" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="inputPassword" placeholder="Introduce tu contraseña actual" required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="inputFirstName" className="form-label">Nombre</label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" id="inputFirstName" placeholder="Introduce tu nombre" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="inputLastName" className="form-label">Apellido</label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="form-control" id="inputLastName" placeholder="Introduce tu apellido" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="inputAge" className="form-label">Edad</label>
                        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" className="form-control" id="inputAge" placeholder="Introduce tu edad" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="inputBio" className="form-label">Bio</label>
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="form-control" id="inputBio" rows="3" placeholder="Cuéntanos sobre ti"></textarea>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="inputLocation" className="form-label">Ubicación</label>
                        <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" id="inputLocation" placeholder="Introduce tu ubicación" />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Foto de perfil</label>
                        <div onClick={handleUploadImage} className="image-upload-wrapper border rounded p-3 text-center">
                            <button type="button" className="btn btn-outline-primary">Subir Imagen</button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Guardar</button>
                    <Button variant="primary" onClick={handleShowPasswordChange}>
                        Cambiar contraseña
                    </Button>
                </form>
            </div >
            <Modal show={showPasswordChange} onHide={handleClosePasswordChange}>
                <Modal.Header closeButton>Modificar Contraseña</Modal.Header>
                <form onSubmit={handleSubmitPasswordChange}>
                    <Modal.Body>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} placeholder="Contraseña nueva" className="form-control mb-2 w-50 text-center" type="password"></input>
                            <input onChange={(e) => setMatchingPassword(e.target.value)} value={matchingPassword} placeholder="Confirma contraseña" className="form-control w-50 text-center" type="password"></input>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleSubmitPasswordChange}>
                            Confirmar
                        </Button>
                        <Button variant="danger" onClick={handleClosePasswordChange}>Cancelar</Button>

                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};
