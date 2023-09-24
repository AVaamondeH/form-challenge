const { Form } = require("../db");

const get_form = async () => {
    try {
        const data = await Form.finAll();
        return data
    } catch (error) {
        return (error.message)
    }
};

module.exports = {
    get_form
};
