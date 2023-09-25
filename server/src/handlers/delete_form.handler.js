const { delete_form } = require("../controllers/delete_form.controller")
const { responseObj } = require("../utils/response")

const delete_form_handler = async (req, res) => {
    try {
        const {id} = req.query
        const response = await delete_form(id)
        if(!response) throw Error("A problem occurred erasing your form")
        return res.status(200).json(responseObj("Form deleted succesfully", response))

    } catch (error) {
        if(error.message === "A problem occurred erasing your form") return res.status(503).send(responseObj(error.message))
        return res.status(500).send(responseObj(error.message))
    }
}

module.exports ={ 
    delete_form_handler
};