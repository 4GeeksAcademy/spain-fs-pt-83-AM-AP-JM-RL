import React, { useState } from "react";
import { EventFormInput } from "./EventFormInputs";

export const EventsForm = () => {

    const [isOpen, setIsOpen] = useState(false)



    return (<>
        <button onClick={() => setIsOpen(true)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#eventsFormModal">
            Launch demo modal
        </button>

        <div className="modal" id="eventsFormModal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <EventFormInput />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}