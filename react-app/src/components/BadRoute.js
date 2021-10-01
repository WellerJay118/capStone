import React from "react"
import { NavLink } from "react-router-dom"

const BadRoute = () => {

    return (
        <div className="badroute__wrapper">
            <h1>404, Page Not Found</h1>
            <NavLink className="badroute__wrapper" to="/login">
                <i class="fas fa-crow fa-5x"></i>
            </NavLink>
        </div>
    )
}
export default BadRoute
