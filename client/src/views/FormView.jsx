
import Form from "../components/Form";
import { items } from "../../api/items.json";

function FormView() {
    const json = items
    return (
        <>
            <h2 className="text-6xl">Completa el formulario</h2>
            <Form
                json={json}
            />
        </>
    );
}

export default FormView;