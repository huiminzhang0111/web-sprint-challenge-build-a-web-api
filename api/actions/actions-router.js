// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const router = express.Router()

// [GET] /api/actions
router.get('/', (req, res) => {
    Action.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        }).catch(error => {
            res.status(500).json({
                message: "Error retrieving the projects"
            })
        })
})

// [GET] /api/actions/:id
router.get('/:id', async (req, res) => {
    try {
        const action = await Action.get(req.params.id)
        if (!action) {
            res.status(404).json({
                message: "No aciton can be found"
            })
        } else {
            res.json(action)
        }
    } catch (err) {
        res.status(500).json({
            message: "The action info cannot be retrieved"
        })
    }
})

// [POST] /api/actions
router.post('/', (req, res) => {
    Action.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        }).catch(errro => {
            res.status(400).json({
                message: "Please fill in missing parts"
            })
        })
})

// [PUT] /api/actions/:id
router.put('/:id', (req, res) => {
    const changes = req.body
    Action.update(req.params.id, changes)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(400).json({
                    message: "Action cannot be found"
                })
            }
        }).catch (error => {
            res.status(500).json({
                message: "Error updating the action"
            })
        })
})

// [DELETE] /api/actions/:id
router.delete('/:id', (req, res) => {
    Action.remove(req.params.id)
        .then (count => {
            if (count > 0) {
                res.status(200).json({ message: "Action has been remobed" })
            } else {
                res.status(404).json({ message: "Action cannot be found" })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error removing the action',
              })
        })
})

module.exports = router