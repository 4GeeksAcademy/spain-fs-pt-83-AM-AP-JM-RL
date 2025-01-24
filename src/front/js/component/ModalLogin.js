import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/modal.css";


export const ModalLogin = ({ show, onClose, onRegisterClick }) => {
    const { actions } = useContext(Context);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
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
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <h6>Don't have an account?</h6>
            <button type="button" className="btn btn-secondary" onClick={onRegisterClick}>Register</button>
        </form>
    </div>
</div>
    )
}