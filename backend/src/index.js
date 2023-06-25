require('./db/mongoose')
const express = require('express')
const goalRouter = require('./routers/goals')
const userRouter = require('./routers/user')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000
app.use(cors())

app.use(express.json())
app.use(goalRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log('App running on port 5000...')
})
