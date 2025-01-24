import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/modal.css";


export const ModalRegister = ({ show, onClose }) => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await actions.register(email, password);
        if (success) {
            navigate('/')
        }
    }

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="background">
  
                <form className="modal-form register" onSubmit={handleSubmit}>
                    <h3>Register</h3>
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
                    <button type="submit" className="btn btn-primary">Register</button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>


    );
};