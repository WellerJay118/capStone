import { useState } from "react";
import {useSelector} from "react-redux"
import { useHistory } from "react-router"
import SignUpForm from "./auth/SignUpForm";
import { Modal } from "./context/Modal";

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
                        <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm />
                        </Modal>
                    )}
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow">
                    <div className="splash-gridrow__image">
                        {/* <h2>Image here</h2> */}
                        <img alt="" src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"></img>
                    </div>
                    <div className="splash-gridrow__text">
                        <p>this is where alot of our text will go for the things and stuff we want to showcase from our first image</p>
                    </div>
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow">
                    <div className="splash-gridrow__text">
                        <p>this is where alot of our text will go for the things and stuff we want to showcase from our second image</p>
                    </div>
                    <div className="splash-gridrow__image">
                        {/* <h2>Image here</h2> */}
                        <img alt="" src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"></img>
                    </div>
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow">
                    <div className="splash-gridrow__image">
                        {/* <h2>Image here</h2> */}
                        <img alt="" src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"></img>
                    </div>
                    <div className="splash-gridrow__text">
                        <p>this is where alot of our text will go for the things and stuff we want to showcase from our third image</p>
                    </div>
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow">
                    <div className="splash-gridrow__text">
                        <p>this is where alot of our text will go for the things and stuff we want to showcase from our fourth image</p>
                    </div>
                    <div className="splash-gridrow__image">
                        {/* <h2>Image here</h2> */}
                        <img alt="" src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"></img>
                    </div>
                </div>

                <div className="splash-gridrow__border"></div>

                <div className="splash-gridrow__auth">
                    <button onClick={() => history.push('/login')}>Login</button>
                    <button onClick={() => setShowModal(true)}>Sign Up</button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm />
                        </Modal>
                    )}
                </div>


            </div>

        </div>
    )
}

export default SplashPage
