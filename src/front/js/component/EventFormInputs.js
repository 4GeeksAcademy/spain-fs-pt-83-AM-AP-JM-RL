import React from "react";

export const EventFormInput = () => {

    const image = () => {
        return (
            <input type="file"></input>
        )
    }

    return (
        <form className="row row-cols-lg-auto g-3 align-items-center">
            <div className="col-5">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="col-5">
                <img src="..." className="img-fluid" alt="..." />
            </div>
        </form>
    )
}
