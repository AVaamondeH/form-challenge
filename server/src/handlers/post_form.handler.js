const { post_form } = require("../controllers/post_form.controller");
const { responseObj } = require("../utils/response");

const post_form_handler = async(req, res) => {
    try {
        const data = req.body;
        const response = await post_form(data);
        if(!response) throw Error("Service unavailable")
        return res.status(200).json(responseObj("Form created succesfully", response))

    } catch (error) {
        if(error.message === "Service unavailable") return res.status(503).send(responseObj(error.message))
        return res.status(500).send(responseObj(error.message))
    }
}

module.exports = {
    post_form_handler
}