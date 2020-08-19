const express = require('express');
const { post } = require('./comments');
const { getMe } = require('../controllers/auth');

const { protect } = require('../middleware/auth')
const router = express.Router();

const register = require('../controllers/auth').register
const login = require('../controllers/auth').login


router
    .post('/register', register)
    .post('/login', login)
    .get('/me', protect, getMe)

module.exports = router