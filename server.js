const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const restricted = require('./restricted-middleware.js')
const authRouter = require("./auth/auth-router.js")
const userRouter = require("./user/user-router.js")
const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', restricted, userRouter)
server.get('/', (req, res) => {
    res.send("It's working")
});

module.exports= server;