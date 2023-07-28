
/**
 * 
 * Routes
 * /api/usuarios
 * 
 */


const { Router } = require('express');
const { getUsuarios, crearUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

const { check } = require('express-validator');
const validarToken = require('../middlewares/validar-jwt');

router.get("/", validarToken, getUsuarios);

router.post(
	"/",
	[
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		validarCampos,
	],
	crearUsuario
);

router.put(
	"/:id",
	[
		validarToken,
		check("nombre", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		check("role", "El role es obligatorio").not().isEmpty(),
		validarCampos,
	],
	updateUsuario
);

router.delete("/:id", validarToken, deleteUsuario);

 
module.exports = router;