/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Form from "../components/Form";
import { get_form } from "../redux/dataSlice";
import { useEffect } from "react";


function FormUpdate() {
    const {id} = useSelector(state => state.data)
    const {json} = useSelector(state => state.data)
    const dispatch = useDispatch();
    console.log(json);

    useEffect(() => {
        dispatch(get_form(id))
    }, []);

    if (!json.length) {
        return <div>Cargando datos...</div>;
    }

    return (
        <>
        <h2 className="text-6xl">Respuestas</h2>
        <h5 className="text-lg">Puedes actualizar si te equivocaste</h5>
        <Form 
        json= {json}
        update = {true} />
        </>
    );
}

export default FormUpdate;