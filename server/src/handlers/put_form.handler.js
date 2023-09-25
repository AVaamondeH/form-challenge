const { put_form } = require("../controllers/put_form.controller");
const { responseObj } = require("../utils/response");

const put_form_handler = async(req, res) => {
    try {
        const {id, data} = req.body;
        const response = await put_form(id, data);
        if(!response) throw Error("A problem occurred updating your form")
        return res.status(200).json(responseObj("Form updated succesfully", response))

    } catch (error) {
        if(error.message === "A problem occurred updating your form") return res.status(503).send(responseObj(error.message))
        return res.status(500).send(responseObj(error.message))
    }
}

module.exports = {
    put_form_handler
}