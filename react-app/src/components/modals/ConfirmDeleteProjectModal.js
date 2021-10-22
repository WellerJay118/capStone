import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import ConfirmDeleteProject from '../ConfirmDeleteProject';

function ConfirmDeleteProjectModal({ id }) {
    const [showModal, setShowModal] = useState(false);

    return(
        <>
            <button id="editform__button--delete" onClick={() => setShowModal(true)}>
                Delete Project
             </button>
             {showModal && (
                <Modal className="modal__deleteProject" onClose={() => setShowModal(false)}>
                  <ConfirmDeleteProject id={id} setShowModal={setShowModal} />
                </Modal>
             )}
        </>
    )
}

export default ConfirmDeleteProjectModal
