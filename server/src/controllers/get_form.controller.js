const { Form } = require("../db");

const get_form = async (id) => {
    try {
        const data = await Form.findByPk(id);
        console.log(data);
        return data
    } catch (error) {
        return (error.message)
    }
};

module.exports = {
    get_form
};
