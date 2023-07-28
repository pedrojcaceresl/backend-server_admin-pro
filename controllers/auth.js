

const { response } = require('express'); 
const Usuario = require('../models/usuario');
const brcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res= response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne( { email } );

        console.log({usuarioDB});
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Verificar contraseña
        const validPassword = brcrypt.compareSync( password, usuarioDB.password );

        if (!validPassword) {
            return res.status(400).json({
				ok: false,
				msg: "Contraseña no válida",
			});
        }

        // Generar token - JWT

        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok:true,
            token
        })


        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin',
        })
    }
}



module.exports = {
    login
}