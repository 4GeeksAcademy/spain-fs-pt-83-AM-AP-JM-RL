import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/UserForm.css";
import { useNavigate } from "react-router-dom";
import * as filestack from "filestack-js";
import { BackButton } from "./BackButton";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faCalendar, faComment, faMapMarker, faCamera } from "@fortawesome/free-solid-svg-icons";

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
            <div className="container user-form-container animate__animated animate__fadeIn">
                <div className="user-form-card rounded-4 shadow-lg">
                    <div className="form-header gradient-bg p-5 rounded-top-4">
                        <BackButton variant="light" />
                        <h1 className="text-white text-center mb-0">
                            <FontAwesomeIcon icon={faUser} className="me-2" />
                            Editar Perfil
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 p-lg-5">
                        <Row className="g-4">
                            <Col md={6}>
                                <FormField
                                    icon={faEnvelope}
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tucorreo@ejemplo.com"
                                />

                                <FormField
                                    icon={faUser}
                                    label="Nombre"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Tu nombre"
                                />

                                <FormField
                                    icon={faUser}
                                    label="Apellido"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Tu apellido"
                                />

                                <FormField
                                    icon={faCalendar}
                                    label="Edad"
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="Tu edad"
                                />
                            </Col>

                            <Col md={6}>
                                <FormField
                                    icon={faLock}
                                    label="Contraseña Actual"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />

                                <FormField
                                    icon={faMapMarker}
                                    label="Ubicación"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Ciudad, País"
                                />

                                <div className="form-field mb-4">
                                    <label className="form-label text-muted small">
                                        <FontAwesomeIcon icon={faCamera} className="me-2 text-primary" />
                                        Foto de Perfil
                                    </label>
                                    <div
                                        className="image-upload-wrapper border-dashed rounded-3 p-4 text-center cursor-pointer"
                                        onClick={handleUploadImage}
                                    >
                                        {image ? (
                                            <img src={image} alt="Preview" className="upload-preview rounded-3" />
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faCamera} className="text-muted h3 mb-3" />
                                                <p className="mb-0 text-muted">Haz clic para subir una imagen</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Col>

                            {/* Biografía Full Width */}
                            <Col xs={12}>
                                <FormField
                                    icon={faComment}
                                    label="Biografía"
                                    type="textarea"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Cuéntanos sobre ti..."
                                    rows={4}
                                />
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-center">
                            <div className="me-1">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="btn-save px-5 rounded-pill w-100"
                                >
                                    <small>Guardar</small>
                                </Button>

                            </div>
                            <div className="ms-1">
                                <Button
                                    variant="outline-primary"
                                    onClick={handleShowPasswordChange}
                                    className="px-5 rounded-pill w-100"
                                >
                                    <small>Cambiar Contraseña</small>
                                </Button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <Modal show={showPasswordChange} onHide={handleClosePasswordChange} centered>
                <Modal.Header closeButton className="gradient-bg text-white">
                    <Modal.Title>
                        <FontAwesomeIcon icon={faLock} className="me-2" />
                        Cambiar Contraseña
                    </Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmitPasswordChange}>
                    <Modal.Body className="p-4">
                        <div className="d-flex flex-column gap-3">
                            <FormField
                                icon={faLock}
                                label="Nueva Contraseña"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                centered
                            />

                            <FormField
                                icon={faLock}
                                label="Confirmar Contraseña"
                                type="password"
                                value={matchingPassword}
                                onChange={(e) => setMatchingPassword(e.target.value)}
                                placeholder="••••••••"
                                centered
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Button
                            variant="outline-danger"
                            onClick={handleClosePasswordChange}
                            className="px-4 rounded-pill"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            className="px-5 rounded-pill"
                        >
                            Confirmar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
};

const FormField = ({ icon, label, type = "text", value, onChange, placeholder, required, rows, centered }) => {
    const inputClass = `form-control ${centered ? 'text-center' : ''}`;

    return (
        <div className="form-field mb-4">
            <label className="form-label text-muted small">
                <FontAwesomeIcon icon={icon} className="me-2 text-primary" />
                {label}
            </label>
            {type === "textarea" ? (
                <textarea
                    className={inputClass}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                />
            ) : (
                <input
                    type={type}
                    className={inputClass}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                />
            )}
        </div>
    );
};