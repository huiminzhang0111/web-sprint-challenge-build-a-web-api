// add middlewares here related to projects
const yup = require('yup')
const Project = require('./projects-model')

async function checkProjectId(req, res, next) {
    try {
        const possibleProject = await Project.get(req.params.id)
        if (possibleProject) {
            req.project = possibleProject
            next()
        } else {
            next({ status: 404, message: "Project cannot be found" })
        }
    } catch (error) {
        next(error)
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !description || !completed) {
        res.status(400).json({
            message: "Project info missing required fields"
        })
    } else {
        next()
    }
}

module.exports = { checkProjectId, validateProject }