
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const router = Router();

/**
 * Path: '/api/login'
 */

router.post(
	"/",
	[
		check("email", "El email es obligatorio").isEmail(),
		check("password", "El password es obligatorio").not().isEmpty(),
        validarCampos
	],
	login
);

module.exports = router;