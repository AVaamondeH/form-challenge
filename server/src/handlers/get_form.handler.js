const { get_form } = require("../controllers/get_form.controller")
const { responseObj } = require("../utils/response")

const get_form_handler = async (req, res) => {
    try {
        const response = await get_form()
        if(!response) throw Error("Service unavailable")
        return res.status(200).json(responseObj("Data acquire succesfully", response))

    } catch (error) {
        if(error.message === "Service unavailable") return res.status(503).send(responseObj(error.message))
        return res.status(500).send(responseObj(error.message))
    }
}

module.exports ={ 
    get_form_handler
};