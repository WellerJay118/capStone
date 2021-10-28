import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import EditProject from "../EditProject";


function EditProjectModal({ id, className }) { //may need to receive proiject id to pass on later.
    const [showModal, setShowModal] = useState(false);

    let buttonToggle;
    if(className === "modal__allprojects-edit") {
        buttonToggle = (
            <button onClick={() => setShowModal(true)}>
                <i className="fas fa-edit fa-2x"></i>
            </button>
        )
    }

    if(className === "modal__indivproject-edit") {
        buttonToggle = (
            <button className="indivproj__header--button" onClick={() => setShowModal(true)}>
                Project Properties
            </button>
        )
    }

    return (
        <>
            {buttonToggle}
            {showModal && (
                <Modal className="modal__editProject" onClose={() => setShowModal(false)}>
                    <EditProject id={id} setShowModal={setShowModal}/>
                    {/* Might have to pass in ID for project  */}
                </Modal>
            )}
        </>
    )


}

export default EditProjectModal;
