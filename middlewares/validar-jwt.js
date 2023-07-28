
const jwt = require('jsonwebtoken');
const { request } = require('express');
const Usuario = require('../models/usuario');

const validarToken = (req = request, res, next) => {
	
    try {
        const token = req.header("x-token");

        if (!token) {
            return res.status(401).json({
				ok: true,
				msg: "No hay token en la petición",
			});
        }

		const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
			ok: true,
			msg: "Token no válido",
		});
    }
};

module.exports = validarToken;