const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;
const HOST = `127.0.0.1;`


app.use('/', path.join(__dirname, '/public'))


app.listen(`You are now listening on ${HOST}:${PORT}`)