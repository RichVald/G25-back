const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //obtenemos el token
            token = req.headers.authorization.split(' ')[1];

            //Verificar que el token sea correcto
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Obtenemos los datos del usurio desde el id del payload del jwt
            req.user = await User.findById(decoded.id).select('-password');

            next()

        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('No autorizado');
        }
    }
    if (!token) {
        res.status(401);
        throw new Error('No se proporciono token')
    }
})

module.exports = {
    protect
}