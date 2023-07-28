const { response } = require("express");
var bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
	// const usuarios = await getUsuarios()
	const usuarios = await Usuario.find({}, "nombre email role google");

	res.json({
		data: true,
		usuarios,
	});
};

const crearUsuario = async (req, res = response) => {
	// const usuarios = await getUsuarios();

	const { email, password } = req.body;


	
	try {
		const existeEmail = await Usuario.findOne({ email });
		
		if (existeEmail) {
			return res.status(400).json({
				ok: false,
				msg: "El email ya esta registrado",
			});
		}
		
		const usuario = new Usuario(req.body);

		// Encrypt pass
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		// Generar Token - JWT
		const token = await generarJWT(usuario.uid);

		// Guardar usuario
		await usuario.save();

		res.json({
			data: true,
			usuario,
			token
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Error inesperado... revisar logs",
		});
	}
};

const updateUsuario = async (req, res = response) => {

	const uid = req.params.id;

	// TODO validar token y comprobar si el usuario es correcto
	try {
		// const usuario = Usuario.findById(uid);
		
		// await usuario.updateOne(req.body);
		const usuarioDB = await Usuario.findById( uid );

		if ( !usuarioDB ) {
			return res.status(404).json({
				ok: false,
				msg: 'No existe usuario con ese id',
			});
		}

		const { password, google, email, ...campos } = req.body;

		console.log(usuarioDB.email, email)
		if ( usuarioDB.email !== email ) {
	 		// Busca si ya existe el email si ya existe, lanza error y si no, no entra
			// en esta condicion y actualiza el email
			const existeEmail = await Usuario.findOne({ email });
			if ( existeEmail ) {
				return res.status(400).json({
					ok: false,
					msg: 'Ya existe un usuario con ese email'
				})
			}
		}

		campos.email = email

		const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true });
		

		res.json({
			ok: true,
			usuario: usuarioActualizado,
		});

	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: "Error inesperado... revisar logs",
		})
	}
}


const deleteUsuario = async (req, res= response) => {
	console.log(" Parammms ", req.params);

	const uid = req.params.id;

	
	// const deletedUser = await Usuario.deleteOne({id: req.params.id});
	try {
		// Verificar si existe
		const usuarioDB = await Usuario.findById(uid);
		
		if (!usuarioDB) {
			return res.status(404).json({
				ok: false,
				msg: "No existe un usuario con ese id",
			});
		}
		
		const usuario = await Usuario.findByIdAndDelete( uid );

		res.json({
			ok: true,
			msg: 'Usuario eliminado',
			usuario
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Talk to the admin'
		})

	}
}



module.exports = {
	getUsuarios,
	crearUsuario,
	updateUsuario,
	deleteUsuario,
};
