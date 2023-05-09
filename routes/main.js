const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const wordController = require('../controllers/words')

router.get('/', homeController.getIndex)
router.post('/wordList', wordController.wordsList)

module.exports = router