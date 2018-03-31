const mongoose = require('mongoose');

const rtspUrlSchema = mongoose.Schema({
	url: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

module.exports = mongoose.model('RtspUrl', rtspUrlSchema)
