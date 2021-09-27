import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { fetchAllProj } from "../store/project";


const IndivProject = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    // const sessionUser = useSelector(state => state.session.user)
    const thisProject = useSelector(state => (state.projects[id]))

    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])

    return (
        <div className="blackBorder">
            <h1>From individual project</h1>
            {console.log('@@@@@@@@@@@@@@@@@@',thisProject.id)}
            {thisProject.projDesc}
        </div>
    )


}

export default IndivProject
