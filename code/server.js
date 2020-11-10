"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config({ path: './config/config.env' });
// Custom middlewares
const errorHandler = require('./middleware/error');
// Bring in routers
const comment = require('./routes/comments');
const auth = require('./routes/auth');
// Connect to Database
// TODO: Remove connection string from file.
const dbConnect = require('./config/db.js');
dbConnect();
// Initialize Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('/api', (req, res) => {
    res.send('API RUNNING');
});
// Mount Routers
app.use('/api/comments', comment);
app.use('/api/auth', auth);
// Mount error handler @ end of piepline
app.use(errorHandler);
// Default Fallback to handle the React Index.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
const User_1 = require("./models/User");
app.get('/api/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    res.json(users);
}));
app.get('/api/prophecies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find();
    res.json(users);
}));
const PORT = parseInt(process.env.PORT) || 5000;
const HOST = process.env.HOST || `localhost`;
app.listen(PORT, () => console.log(`You The Server is Listening on http://${HOST}:${PORT}`));
