const {Form} = require("../db")

const delete_form = async (id) => {
    
    const newDelete = await Form.destroy({
        where: {
            id: id
        }
    })
    return newDelete
}

module.exports = {
    delete_form
}