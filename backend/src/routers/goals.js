const express = require('express')
const router = new express.Router()
const Goal = require('../models/goal')

router.post('/goals', async (req, res) => {
    try {
        const goal = new Goal({ ...req.body })
        await goal.save()
        res.status(201).send(goal)
    }
    catch (e) {
        res.status(400).send()
    }
})

// router.get('/goals/:userEmail', async (req, res) => {
//     try {
//         const goals = await Goal.find({userEmail: req.params.userEmail})
//         res.send(goals)
//     }
//     catch (e) {
//         res.status(400).send()
//     }
// })

router.get('/goals/:id', async (req, res) => {
    try {
        const goals = await Goal.find({userId: req.params.id})
        res.send(goals)
    }
    catch (e) {
        res.status(400).send()
    }
})

router.patch('/goals/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['desc', 'completed']

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
    if (!isValidUpdate) {
        return res.status(400).send()
    }
    try {
        const goal = await Goal.findOne({ _id: req.params.id })
        if (!goal) {
            return res.status(404).send()
        }
        updates.forEach(update => goal[update] = req.body[update])
        await goal.save()
        res.send(goal)
    }
    catch (e) {
        res.status(400).send()
    }
})

router.delete('/goals/:id', async (req, res) => {
    try {
        const goal = await Goal.findByIdAndDelete(req.params.id)

        if(!goal){
            res.status(404).send()
        }
        res.send(goal)
    }
    catch (e) {
        res.status(400).send()
    }
})

module.exports = router