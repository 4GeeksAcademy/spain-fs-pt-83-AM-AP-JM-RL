import React from "react";

export const ModalRegister = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <h2>Register</h2>
                <form>
                    <div className="form-group">
                        <label>Usuario:</label>
                        <input type="text" className="form-control" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" className="btn btn-primary">Register</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};