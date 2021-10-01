// Write your "actions" router here!
const express = require('express')
const { validateProject } = require('../projects/projects-middleware')
const { checkActionId, validateAction } = require('./actions-middlware')
const Action = require('./actions-model')
const router = express.Router()

// [GET] /api/actions
router.get('/', (req, res, next) => {
    Action.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        }).catch(next)
})

// [GET] /api/actions/:id
router.get('/:id', checkActionId, (req, res, next) => {
    res.status(200).json(req.action)
})

// [POST] /api/actions
router.post('/', validateAction, (req, res) => {
    Action.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        }).catch(next)
})

// [PUT] /api/actions/:id
router.put('/:id', checkActionId, validateAction, (req, res, next) => {
    const changes = req.body
    Action.update(req.params.id, changes)
        .then(action => {
            res.status(200).json(action)
        }).catch(next)
})

// [DELETE] /api/actions/:id
router.delete('/:id', checkActionId, (req, res, next) => {
    Action.remove(req.params.id)
        .then (() => {
            res.status(200).json({
                message: "Action has been removed"
            })
        })
        .catch(next)
})

module.exports = router