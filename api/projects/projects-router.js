// Write your "projects" router here!
const express = require('express')
const { checkProjectId, validateProject } = require('./projects-middleware')
const Project = require('./projects-model')
const router = express.Router()

//[GET] /api/projects
router.get('/', (req, res, next) => {
   Project.get(req.params.id)
    .then(projects => {
        res.status(200).json(projects)
    }).catch(error => {
        next(error)
    })
})

// [GET] /api/projects/:id with middleware
router.get('/:id', checkProjectId, (req, res) => {
    res.status(200).json(req.project)
})
// without middleware
// router.get('/:id', async (req, res, next) => {
//     try {
//         const project = await Project.get(req.params.id)
//         if (!project) {
//             res.status(404).json({
//                 message: "Project cannot be found"
//             })
//         } else {
//             res.json(project)
//         }
//     } catch (err) {
//         next(err)
//     }
// })

// [POST] /api/projects
router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        }).catch(next)
})

// [PUT] /api/projects/:id
router.put('/:id', checkProjectId, validateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(next);
})

// [DELETE] /api/projects/:id
router.delete('/:id', checkProjectId, (req, res, next) => {
    Project.remove(req.params.id)
        .then (() =>{
            res.status(200).json({
                message: "Project has been removed"
            })
        })
        .catch(next)
})

// [GET] /api/projects/:id/actions
router.get('/:id/actions', checkProjectId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(projectAction => {
            res.status(200).json(projectAction)
        }).catch(next)
})

module.exports = router