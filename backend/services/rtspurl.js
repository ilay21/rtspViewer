const RtspUrl = require('./../models/RtspUrl');
const User = require('./../models/User');

module.exports = {
	add: (req, res) => {
		const {
			url
		} = req.body;

		let rtspObj = new RtspUrl({
			url,
			username: req.userName
		});

		rtspObj.save((err, result) => {
			if (err) console.log('saving rtsp error')
			res.sendStatus(200);
		})
	},
	get: async (req, res) => {
		let list = await RtspUrl.find({});
		if (!list) res.sendStatus(404).send({
			message: 'Not found'
		});
		res.send(list);
	},
	delete: async (req, res) => {
		let {id} = req.query;
		if (!id) res.sendStatus(400).send({
			message: 'Bad request'
		});

		RtspUrl.deleteOne({
			_id: id
        })
        .catch(err=>{
            throw err;
        })
        .then((err, result) => {
            res.sendStatus(204);
		})
	}
}
