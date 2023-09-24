import { useEffect, useState } from "react";
import { items } from "../../api/items.json"

function Form() {
    const [json, setJson] = useState(items)

    useEffect(() => {
        console.log(json);
    }, []);

    return (
        <>
            {json.map(item => {
                const { type, label, name, require, options } = item
                return (
                    <form key={name} action="">
                        <div className="relative z-0 w-full mb-6 group">
                            <label htmlFor={name}>
                                {require ? `${label}*` : label}
                                {type === "select"
                                    ? (
                                        <select name={name}>
                                            <option value="" disabled>
                                                Selecciona una opción
                                            </option>
                                            {options.map(({ label, value }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                    )
                                    : (
                                        type === "radio" ? (
                                        <div>
                                        {options.map(({ label, value }) => (
                                            <div key={value}>
                                                <input
                                                    name={name}
                                                    type={type}
                                                    value={value}
                                                />
                                                <label htmlFor={value}>{label}</label>
                                            </div>
                                        ))}
                                        </div>
                                        ) : (
                                            <input name={name} type={type} />
                                        )
                                    )}
                            </label>
                        </div>
                    </form>
                );
            })}
            <div>En progreso</div>
        </>
    );
}

export default Form;