const {Form} = require("../db")

const post_form = async (data) => {
    
    const newForm = await Form.create({
        json: data,
    })
    return newForm
}

module.exports = {
    post_form
}