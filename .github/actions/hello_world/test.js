const core = require('@actions/core');
const github = require('@actions/github');

try {
	const whoToSayHi = core.getInput('who-to-say-hi');
	console.log(`Hello ${whoToSayHi}`);
	const time = (new Date()).toTimeString();
	core.setOutput(`time: ${time}`);
	// JSON webhook payload
	// of trigger event (push)
	const payload = JSON.stringify(github.context.payload, undefined, 2);
	console.log("_____payload ", payload)
} catch (err) {
	core.setFailed(`error: ${err.message}`)
}