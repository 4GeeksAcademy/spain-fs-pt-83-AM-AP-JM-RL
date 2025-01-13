import React from "react";


export const ModalLogin = ({ show, onClose }) => {
    if(!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <h2>Login</h2>
                <form>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" placeholder="Enter email" required/>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                </form>
            </div>
        </div>
    )
}