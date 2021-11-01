import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import CreateProject from '../CreateProject';

function AddProjectModal({ user, className }) {
    const [showModal, setShowModal] = useState(false);

    let buttonToggle;
    if (className === "modal__noproject-add") {
        buttonToggle = (
                <button onClick={() => setShowModal(true)}>
                    Create one here!
                </button>
        )
    }
    if (className === "modal__menu-add") {
        buttonToggle = (
            <button hidden={!user} className="navbar__createproj--button" onClick={() => setShowModal(true)}>
                <i className="fas fa-plus-circle fa-2x"></i>
            </button>
        )
    }

    return(

        <>
            {buttonToggle}
            {showModal && (
                <Modal className="modal__addProject" onClose={() => setShowModal(false)}>
                    <CreateProject setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}


export default AddProjectModal
