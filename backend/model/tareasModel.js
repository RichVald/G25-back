const mongoose = require('mongoose')

const tareaSchema = mongoose.Schema({
    texto: {
        type: String,
        required: [true, "Por favor teclea una descripción de la tarea"]
    },
    completada: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true //crea campos createdAt y updatedAt automáticamente
})

module.exports = mongoose.model('Tarea', tareaSchema)