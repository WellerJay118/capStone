import React, { useState } from 'react';
import { Modal } from "../context/Modal";
import ConfirmDeleteTask from '../ConfirmDeleteTask';

function ConfirmDeleteTaskModal({ taskId, projId }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
        <button id={taskId} onClick={() => setShowModal(true)}>
            <i id={taskId} className="far fa-trash-alt"></i>
        </button>
        {showModal && (
            <Modal className="modal__deleteTask" onClose={() => setShowModal(false)}>
                <ConfirmDeleteTask taskId={taskId} projId={projId} setShowModal={setShowModal} />
            </Modal>
        )}
        </>
    )

}

export default ConfirmDeleteTaskModal
