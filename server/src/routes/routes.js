const {Router} = require("express");
const router = Router()
const {get_form_handler} = require("../handlers/get_form.handler")
const {post_form_handler} = require("../handlers/post_form.handler")
const {put_form_handler} = require("../handlers/put_form.handler")
const {delete_form_handler} = require("../handlers/delete_form.handler")


router.get("/form", get_form_handler)
router.post("/form", post_form_handler)
router.put("/form", put_form_handler)
router.delete("/form", delete_form_handler)

module.exports = {
    router,
}