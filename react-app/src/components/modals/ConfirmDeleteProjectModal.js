import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import ConfirmDeleteProject from '../ConfirmDeleteProject';

function ConfirmDeleteProjectModal({ id, className }) {
    const [showModal, setShowModal] = useState(false);

    let buttonToggle;
    if (className === "modal__allProjects-delete") {
        buttonToggle = (
        <button id={id} onClick={() => setShowModal(true)}>
            <i id={id} className="far fa-trash-alt fa-2x"></i>
        </button>
        )
    }
    if (className === "modal__indivProject-delete") {
        buttonToggle = (
            <button id="editform__button--delete" onClick={() => setShowModal(true)}>
                Delete Project
             </button>
        )
    }


    return(
        <>
            {buttonToggle}
             {showModal && (
                <Modal className="modal__deleteProject" onClose={() => setShowModal(false)}>
                  <ConfirmDeleteProject id={id} setShowModal={setShowModal} />
                </Modal>
             )}
        </>
    )
}

export default ConfirmDeleteProjectModal
