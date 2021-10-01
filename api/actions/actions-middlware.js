// add middlewares here related to actions
const Action = require('./actions-model')

async function checkActionId(req, res, next) {
    try {
        const possibleAction = await Action.get(req.params.id)
        if (possibleAction) {
            req.action = possibleAction
            next()
        } else {
            next({ status: 404, message: "Action cannot be found" })
        }
    } catch (error) {
        next(error)
    }
}

function validateAction(req, res, next) {
    const { notes, description, completed, project_id } = req.body
    if (!notes || !description || !completed || !project_id) {
        res.status(400).json({
            message: "Action info missing required fields"
        })
    } else {
        next()
    }
}


module.exports = { checkActionId, validateAction }