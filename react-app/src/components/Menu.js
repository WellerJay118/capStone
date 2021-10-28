import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import LogoutButton from "./auth/LogoutButton";
import AddProjectModal from "./modals/AddProjectModal";


const MenuButton = () => {
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false)
    const user = useSelector(state => state.session.user) //use for toggle

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if(!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false)
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    let topBar;
    if(user) {
        topBar = (
            <div className="menu__dropdown">
                <button className="menu__dropdown--button" onClick={(e) => history.push('/projects')}>My Projects</button>
                <LogoutButton />
            </div>


      )
    } else {
        topBar = (
            <div className="menu__dropdown">
                <button className="menu__dropdown--button" onClick={(e) => history.push('/login')}>Login or Sign Up</button>
            </div>
      )
    }

    return (
        <div className="menu__wrapper">
            <AddProjectModal user={user} className="modal__menu-add"/>
            <button id="menu__button" onClick={openMenu}>
                <i className="fas fa-bars fa-2x"></i>
            </button>

            <div>
            {showMenu && topBar}
            </div>
        </div>
    )
}
export default MenuButton
