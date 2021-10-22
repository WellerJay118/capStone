import React, { useState } from 'react'
import AddTask from '../AddTask'
import { Modal } from "../context/Modal"


function AddTaskModal({ id }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button className="task__container--addTask" onClick={() => setShowModal(true)}>Add Task</button>
            {showModal && (
                <Modal className="modal__addTask" onClose={() => setShowModal(false)}>
                    <AddTask id={id} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default AddTaskModal
