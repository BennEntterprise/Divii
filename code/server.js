const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

// Custom middlewares
const errorHandler = require('./middleware/error')

// Bring in routers
const comment = require('./routes/comments')
const auth = require('./routes/auth')

// Connect to Database
// TODO: Remove connection string from file.
const dbConnect = require('./config/db.js')
dbConnect();


// Initialize Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('/client/public'))


app.get('/api', (req, res) => {
    res.send('API RUNNING')
})
// Mount Routers
app.use('/api/comments', comment)
app.use('/api/auth', auth)

// Mount error handler @ end of piepline
app.use(errorHandler)


// Bring in Models 
const Comment = require('./models/Comment')
const User = require('./models/User')
const Prophecy = require('./models/Prophecy')



app.get('/api/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
})
app.get('/api/prophecies', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || `localhost`
app.listen(PORT, () => console.log(`You The Server is Listening on ${HOST}:${PORT}`))