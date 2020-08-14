const express = require('express');
const path = require('path');
const app = express();



// Connect to Database
// TODO: Remove connection string from file.
const dbConnect = require('./config/db.js')
dbConnect();

// Initialize Middlewares
app.use(express.json())
app.use(express.static('/client/public'))


// Mount Routers

const PORT = 5000;
const HOST = `localhost`
app.listen(PORT, () => console.log(`You are now listenting on ${HOST}:${PORT}`))