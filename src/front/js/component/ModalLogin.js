import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const ModalLogin = ({ show, onClose }) => {
    const { actions } = useContext(Context);
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.login(email, password);

        if (success) {
            navigate("/")
        } else {
            alert("Error");
        }
    }

    if(!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                </form>
            </div>
        </div>
    )
}