const express = require('express')
const router = express.Router()

const getSingleComment = require('../controllers/comments').getSingleComment
const getAllComments = require('../controllers/comments').getAllComments

router.get('/', getAllComments).get('/:id', getSingleComment)

module.exports = router
