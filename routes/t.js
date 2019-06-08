var fs = require('fs')
const file = fs.readFileSync('../public/t.m4a');
	const audioBytes = file.toString('base64');
	console.log(audioBytes)