const { Form } = require("../db");

const put_form = async (id, data) => {
    const updateForm = await Form.upsert({
        id: id,
        json: data
    });
    if (!updateForm) throw Error("A problem occurred updating your form")
    return updateForm
};

module.exports = {
    put_form
};
