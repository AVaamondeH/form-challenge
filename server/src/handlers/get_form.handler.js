const { get_form } = require("../controllers/get_form.controller")
const { responseObj } = require("../utils/response")

const get_form_handler = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id);
        if (!id) throw new Error("Missing id")
        const response = await get_form(id)
        if(!response) throw Error("Empty database")
        return res.status(200).json(responseObj("Data acquire succesfully", response))

    } catch (error) {
        if(error.message === "Service unavailable") return res.status(503).send(responseObj(error.message))
        return res.status(500).send(responseObj(error.message))
    }
}

module.exports ={ 
    get_form_handler
};