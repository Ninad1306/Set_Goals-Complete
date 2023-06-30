const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
    try {
        const user = new User({ ...req.body })
        await user.save()
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send()
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if(user.status === true){
            return res.status(401).send()
        }
        user.status = true
        await user.save()
        res.send(user)
    }
    catch (e) {
        res.status(400).send()
    }
})
router.get('/users', async (req, res) => {
    try {
        const count = await User.countDocuments({ status: true })
        if(count){
            return res.send("data")
        }
        res.send("no-data")
    }
    catch (e) {
        res.status(400).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.status = false
        await user.save()
        res.send(user)
    }
    catch (e) {
        res.status(400).send()
    }
})

module.exports = router