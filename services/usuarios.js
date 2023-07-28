
const usuarioModel = require('../models/usuario');

const getUsuarios = async () => {
    const usuarios = await usuarioModel.find();
    return usuarios;
}