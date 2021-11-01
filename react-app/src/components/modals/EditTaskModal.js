import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import EditTask from '../EditTask';

function EditTaskModal({ taskId, projId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <i className="fas fa-edit fa-1x"></i>
            </button>
            {showModal && (
                <Modal className="modal__editTask" onClose={() => setShowModal(false)}>
                    <EditTask taskId={taskId} projId={projId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default EditTaskModal
