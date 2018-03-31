const RtspUrl = require('./../models/RtspUrl');
const User = require('./../models/User');

module.exports = (req, res) => {
    const {url} = req.body;

    console.log(req.userId);

    User.findOne()
    //let user = new RtspUrl();

    // user.save((err, result) => {
    //     if (err) console.log('saving user error')
    //     res.sendStatus(200);
    // })
    res.sendStatus(200);
}