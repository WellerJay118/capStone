import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useParams } from "react-router";



const EditProject = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch()
    })


    return (
        <div className="borderBlack">

        </div>
    )
}

export default EditProject
