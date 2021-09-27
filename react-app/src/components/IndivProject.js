import { useDispatch, useSelector } from "react-redux"


const IndivProject = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const thisProject = useSelector(state => state.projects[projId]
}
