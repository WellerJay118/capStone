import {useSelector} from "react-redux"
import { useHistory } from "react-router"

const SplashPage = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    if (sessionUser) history.push('/projects')

    return(
        <div className="splash-wrapper">
            <div className="splash-gridrow">
                <div className="splash-gridrow__image">
                    <h2>Image here</h2>
                </div>
                <div className="splash-gridrow__text">
                    <p>this is where alot of our text will go for the things and stuff we want to showcase from our first image</p>
                </div>
            </div>
            <div className="splash-gridrow">
                <div className="splash-gridrow__text">
                    <p>this is where alot of our text will go for the things and stuff we want to showcase from our second image</p>
                </div>
                <div className="splash-gridrow__image">
                    <h2>Image here</h2>
                </div>
            </div>
            <div className="splash-gridrow">
                <div className="splash-gridrow__image">
                    <h2>Image here</h2>
                </div>
                <div className="splash-gridrow__text">
                    <p>this is where alot of our text will go for the things and stuff we want to showcase from our third image</p>
                </div>
            </div>
            <div className="splash-gridrow">
                <div className="splash-gridrow__text">
                    <p>this is where alot of our text will go for the things and stuff we want to showcase from our fourth image</p>
                </div>
                <div className="splash-gridrow__image">
                    <h2>Image here</h2>
                </div>
            </div>

        </div>
    )
}

export default SplashPage
