const asyncHandler = require('express-async-handler')
const Tarea = require('../model/tareasModel')

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find({user: req.user.id})
    res.status(200).json({ tareas })
})

const setTareas = asyncHandler(async (req, res) => {
    if(!req.body.texto) {
        res.status(400)
        throw new Error("Por favor teclea una descripción")
    }

    const tarea = await Tarea.create({
        texto: req.body.texto,
        user: req.user.id
    })

    res.status(201).json({ tarea })
})

const updateTareas = asyncHandler(async (req, res) => {
    //Verificar que la tarea exista
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea) {
        res.status(400)
        throw new Error('La tarea no fué encontrada')
    }

    //Verificar que la tarea perteneza al usurio
    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Accesso no autorizado')
    } else {
        const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json(tareaUpdated)
    }

    
})

const deleteTareas =asyncHandler(async (req, res) => {
    //Verificar que la tarea exista
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea) {
        res.status(400)
        throw new Error('La tarea no fué encontrada')
    }

    //Verificar que la tarea perteneza al usurio
    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Accesso no autorizado')
    } else {
        await Tarea.deleteOne(tarea)
        res.status(200).json({ id: req.params.id })
    }

    
})

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}