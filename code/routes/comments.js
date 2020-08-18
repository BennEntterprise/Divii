const express = require('express')
const router = express.Router();

const getSingleComment = require('../controllers/comments').getSingleComment


router
    .get('/:id', getSingleComment)


module.exports = router