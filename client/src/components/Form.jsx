/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { set_id } from "../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import { endpoint } from "../../utils/endpoint";

function Form({ json, update }) {
    const [inputs, setInputs] = useState({});
    const [required, setRequired] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        const initialInputs = json.reduce((acc, item) => {
            const { name, type } = item;
            if (name in item) {
                acc[name] = item[name];
            } else if (name) {
                switch (type) {
                    case "checkbox":
                        acc[name] = true;
                        break;
                    default:
                        acc[name] = "";
                        break;
                }
            }
            return acc;
        }, {});
        const needed = json.reduce((acc, item) => {
            const { name, required } = item;
            if (required) {
                acc[name] = required;
            }
            return acc;
        }, {});

        setInputs(initialInputs);
        setRequired(needed)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };
    const handleCheckbox = (event) => {
        let { name, value } = event.target;
        if (value === "false") value = false
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: !value,
        }));
    }
    const onInputTel = (event) => {
        let { value } = event.target;
        const regex = /^[0-9]{0,9}$/;
        if (!regex.test(value)) {
            value = value.replace(/[^0-9]/g, '');
            if (value.length > 9) {
                value = value.slice(0, 9);
            }
            event.target.value = value;
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        let verify = false
        for (const value in required) {
            if (inputs.hasOwnProperty(value) && !inputs[value]) {
                verify = true
            }
        }
        if (verify) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verifica que todos los campos requeridos esten llenos',
            })
            return;
        }
        try {
            if (update) {
                const form = JSON.parse(JSON.stringify(json));
                form.forEach((item) => {
                    const { name } = item;
                    if (inputs.hasOwnProperty(name)) {
                        item[name] = inputs[name];
                    }
                });
                const data = {
                    data: form
                }
                const send = await axios.post(`${endpoint}`, data)
                dispatch(set_id(send.data.data.id))
                Swal.fire({
                    title: "Exelente!",
                    html: "Datos actualizados con exito!",
                    icon: 'success'
                }).then(function () {
                    // Redirect the user
                    window.location.href = "/"
                });
            } else {
                const form = json.map(item => {
                    const { name } = item
                    for (const value in inputs) {
                        if (value === name) item[value] = inputs[value];
                    }
                    return item
                })
                const data = {
                    data: form
                }
                const send = await axios.post(`${endpoint}`, data)
                dispatch(set_id(send.data.data.id))
                Swal.fire({
                    title: "Exelente!",
                    html: "Datos guardados con exito!",
                    icon: 'success'
                }).then(function () {
                    // Redirect the user
                    navigate("/update");
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo paso enviando tu respuesta, intentalo mas tarde',
            })
        }
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <p className="text-red-600 p-5">Los elementos marcados con * son obligatorios</p>
            {json.map((item) => {
                const { type, label, name, required, options } = item;
                switch (type) {
                    case "select":
                        return (
                            <form key={name} action="">
                                <div className="mb-6">
                                    <label htmlFor={name} className="block text-gray-700">
                                        {required ? `${label} *` : label}
                                    </label>
                                    <select
                                        name={name}
                                        onChange={handleInputChange}
                                        value={inputs[name]}
                                        className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Selecciona una opción
                                        </option>
                                        {options.map(({ label, value }) => (
                                            <option key={value} value={value}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        );

                    case "radio":
                        return (
                            <form key={name} action="">
                                <div className="mb-6">
                                    <label htmlFor={name} className="block text-gray-700">
                                        {required ? `${label} *` : label}
                                    </label>
                                    <div>
                                        {options.map(({ label, value }) => (
                                            <div key={value} className="flex items-center mb-4">
                                                <input
                                                    name={name}
                                                    type={type}
                                                    value={value}
                                                    onChange={handleInputChange}
                                                    className="mr-2 leading-tight"
                                                    checked={inputs[name] === value}
                                                />
                                                <label htmlFor={value} className="text-gray-700">
                                                    {label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        );
                    case "checkbox":
                        return (
                            <form key={name} action="">
                                <div className="mb-6">
                                    <label htmlFor={name} className="block text-gray-700">
                                        {required ? `${label} *` : label}
                                    </label>
                                    <input
                                        name={name}
                                        type={type}
                                        value={inputs[name]}
                                        onChange={handleCheckbox}
                                        checked={inputs[name]}
                                        className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </form>
                        );
                    case "tel":
                        return (
                            <form key={name} action="">
                                <div className="mb-6">
                                    <label htmlFor={name} className="block text-gray-700">
                                        {required ? `${label} *` : label}
                                    </label>
                                    <input
                                        name={name}
                                        type={type}
                                        value={inputs[name]}
                                        onChange={handleInputChange}
                                        onInput={onInputTel}
                                        className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </form>
                        );

                    case "submit":
                        return (
                            <div
                                key={name}
                                className="bg-green-500 border rounded-full border-green-darkest p-2 shadow-md text-lg text-black hover:bg-green-800 hover:text-white cursor-pointer"
                                onClick={onSubmit}
                            >
                                {label}
                            </div>
                        );

                    default:
                        return (
                            <form key={name} action="">
                                <div className="mb-6">
                                    <label htmlFor={name} className="block text-gray-700">
                                        {required ? `${label} *` : label}
                                    </label>
                                    <input
                                        name={name}
                                        type={type}
                                        value={inputs[name]}
                                        onChange={handleInputChange}
                                        className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </form>
                        );
                }
            })}
        </div>

    );
}

export default Form;
