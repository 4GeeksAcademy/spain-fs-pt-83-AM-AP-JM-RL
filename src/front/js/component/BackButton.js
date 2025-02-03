import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";

export const BackButton = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <button style={{ width: '50px' }} onClick={handleBack} className="btn btn-light">
            <FaBackspace />
        </button>
    )
}