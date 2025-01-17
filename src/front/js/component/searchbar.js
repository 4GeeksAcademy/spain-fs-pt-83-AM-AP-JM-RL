import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const SearchBar = () => {

    const [input, setInput] = useState("");

    const { store, actions } = useContext(Context);
    
    const fetchData = (value) => {
       
    }

    const handleInputChange = (value) => {
        setInput(value)
        fetchData(value)
    }
    return (
        <div className="search-bar">
            <div className="input-wrapper">
                <i className="fa-solid fa-magnifying-glass" />
                <input placeholder="Search..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)} />

            </div>
        </div>
    )
} 