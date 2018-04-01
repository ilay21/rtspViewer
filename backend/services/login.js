const User = require('./../models/User');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = async (req, res) => {

	const loginData = req.body;

	const user = await User.findOne({
		username: loginData.username
	});
	if (!user)
		res.status(401).send({
			messgae: 'Username or Password invalid'
		});

	bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
		if (!isMatch) res.status(401).send({
			messgae: 'Username or Password invalid'
		});

		console.log(user.username)
		let payload = {
			sub: user.username
		}
		let token = jwt.encode(payload, '123456');
		res.status(200).send({
			token
		});
	})

}
