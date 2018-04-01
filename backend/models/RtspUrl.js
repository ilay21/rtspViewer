const mongoose = require('mongoose');

const rtspUrlSchema = mongoose.Schema({
	url: String,
	username: String
})

module.exports = mongoose.model('RtspUrl', rtspUrlSchema)
