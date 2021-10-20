import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import EditProject from "../EditProject";


function EditProjectModal({ id }) { //may need to receive proiject id to pass on later.
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <i className="fas fa-edit fa-2x"></i>
            </button>
            {showModal && (
                <Modal className="modal__editProject" onClose={() => setShowModal(false)}>
                    <EditProject id={id }setShowModal={setShowModal}/>
                    {/* Might have to pass in ID for project  */}
                </Modal>
            )}
        </>
    )


}

export default EditProjectModal;
