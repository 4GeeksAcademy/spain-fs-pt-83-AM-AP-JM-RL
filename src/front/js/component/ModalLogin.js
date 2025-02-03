import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/modal.css";


export const ModalLogin = ({ show, onClose, onRegisterClick }) => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.login(email, password);

        if (success) {
            navigate("/")
            setEmail('')
            setPassword('')
        } else {
            alert("Error");
        }
    }

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="background">


                <form className="modal-form" onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <div className="form-group">
                        <input
                            className="modal-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="modal-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="modal-button btn btn-primary">Login</button>
                    <button type="button" className="modal-button btn btn-secondary" onClick={onClose}>Close</button>
                    <h6>Don't have an account?</h6>
                    <button type="button" className="btn btn-secondary" onClick={onRegisterClick}>Register</button>
                    {store.message && <div><p className="alert alert-success mt-2 text-center">{store.message}</p></div>}
                    {store.error && <div><p className="text-danger">{store.error}</p></div>}
                </form>

            </div>
        </div>
    )
}