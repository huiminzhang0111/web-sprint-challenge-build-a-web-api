// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const router = express.Router()

//[GET] /api/projects
router.get('/', (req, res) => {
   Project.get(req.params.id)
    .then(projects => {
        res.status(200).json(projects)
    }).catch(error => {
        res.status(500).json({
            message: 'Error retrieving the projects',
          });
    })
})

// [GET] /api/projects/:id
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.get(req.params.id)
        console.log(project)
        if (!project) {
            res.status(404).json({
                message: "the project cannot be found"
            })
        } else {
            res.json(project)
        }
    } catch (err) {
        res.status(500).json({
            message: "The project information could not be retrieved",
            err: err.message,
            stack: err.stack
        })
    }
})

// [POST] /api/projects
router.post('/', (req, res) => {
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        }).catch(error => {
            res.status(400).json({
                message: "Please fill in missing parts"
            })
        })
})

// [PUT] /api/projects/:id
router.put('/:id', (req, res) => {
    const changes = req.body
    Project.update(req.params.id, changes)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "project cannot be found"
                })
                }
        }).catch(error => {
            res.status(500).json({
                message: "error updating project"
            })
        })
    
})

// [DELETE] /api/projects/:id
router.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
        .then (count => {
            if (count > 0) {
                res.status(200).json({ message: "project has been remobed" })
            } else {
                res.status(404).json({ message: "project cannot be found" })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error removing the project',
              })
        })
})

module.exports = router