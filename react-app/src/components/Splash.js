import { useState } from "react";
import {useSelector} from "react-redux"
import { useHistory } from "react-router"
import SignUpForm from "./auth/SignUpForm";
import { Modal } from "./context/Modal";
import firstPic from "../components/images/Login-ss.png"
import secondPic from "../components/images/create-ss.png"
import thirdPic from "../components/images/projects-ss.png"
import fourthPic from "../components/images/tasks-ss.png"


const SplashPage = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false)
    if (sessionUser) history.push('/projects')

    return(
        <div className="splash-container">
            <div className="splash-wrapper">

                <div className="splash-gridrow__auth">
                    <button onClick={() => history.push('/login')}>Login</button>

                    <button onClick={() => setShowModal(true)}>Sign Up</button>
                    {showModal && (
                        <Modal className="modal__signup" onClose={() => setShowModal(false)}>
                            <SignUpForm />
                        </Modal>
                    )}
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow">
                    <div className="splash-gridrow__image">
                        <img alt="" src={firstPic}></img>
                    </div>
                    <div className="splash-gridrow__text">
                        <p>Lists on Lists is the no-fluff, straight forward option for project tracking and soon to be project management.</p>
                    </div>
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow">
                    <div className="splash-gridrow__text">
                        <p>Straight forward creation of new "Projects".</p>
                    </div>
                    <div className="splash-gridrow__image">
                        <img alt="" src={secondPic}></img>
                    </div>
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow">
                    <div className="splash-gridrow__image">
                        <img alt="" src={thirdPic}></img>
                    </div>
                    <div className="splash-gridrow__text">
                        <p>Easy to track multiple projects at a time.</p>
                    </div>
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow">
                    <div className="splash-gridrow__text">
                        <p>Concise, simple and easy tracking of every task for every Project!</p>
                    </div>
                    <div className="splash-gridrow__image">
                        <img alt="" src={fourthPic}></img>
                    </div>
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow__auth">
                    <button onClick={() => history.push('/login')}>Login</button>
                    <button onClick={() => setShowModal(true)}>Sign Up</button>
                    {showModal && (
                        <Modal className="modal__signup" onClose={() => setShowModal(false)}>
                            <SignUpForm />
                        </Modal>
                    )}
                </div>


            </div>

        </div>
    )
}

export default SplashPage
