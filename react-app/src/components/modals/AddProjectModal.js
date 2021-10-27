import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import CreateProject from '../CreateProject';

function AddProjectModal({ user }) {
    const [showModal, setShowModal] = useState(false);

    return(

        <>
            <button hidden={!user} className="navbar__createproj--button" onClick={() => setShowModal(true)}>
                <i className="fas fa-plus-circle fa-2x"></i>
            </button>
            {showModal && (
                <Modal className="modal__addProject" onClose={() => setShowModal(false)}>
                    <CreateProject setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}


export default AddProjectModal
