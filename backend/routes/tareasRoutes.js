const express = require('express')
const router = express.Router()
const { getTareas, setTareas, updateTareas, deleteTareas } = require('../controllers/tareasController')

router.get('/', getTareas)

router.post('/', setTareas)

router.put('/:id', updateTareas)

router.delete('/:id', deleteTareas)

module.exports = router