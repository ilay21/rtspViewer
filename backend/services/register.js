const User = require('./../models/User');

module.exports = (req, res) => {
    const userData = req.body;
    let user = new User(userData);

    user.save((err, result) => {
        if (err) console.log('saving user error')
        res.sendStatus(200);
    })
}