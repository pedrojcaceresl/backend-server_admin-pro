const jwt = require("jsonwebtoken");

const generarJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = {
			uid,
		};

		const SECRET = process.env.JWT_SECRET;

		jwt.sign(
			payload,
			SECRET,
			{
				expiresIn: "12h",
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar el JWT: ', err.message);
				}
				resolve(token);
			}
		);
	});
};

module.exports = {
	generarJWT,
};
