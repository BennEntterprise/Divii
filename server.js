const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })


//Bring in Routers
// const comments = require('./controllers/comments')

// Connect to Database
// TODO: Remove connection string from file.
const dbConnect = require('./config/db.js')
dbConnect();


// Initialize Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('/client/public'))


// Mount Routers

// TEST Route
app.get('/api', (req, res) => {
    res.send('API RUNNING')
})
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || `localhost`
app.listen(PORT, () => console.log(`You The Server is Listening on ${HOST}:${PORT}`))