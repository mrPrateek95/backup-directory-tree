const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function (title, subtitle, message) {
    try {
        const terminalNotifierCommand = `/usr/local/bin/terminal-notifier -title "${title}" -subtitle "${subtitle}" -message "${message}" -sound "default"`
        await exec(terminalNotifierCommand);
    } catch (error) {
        console.error(error);
        throw error
    }
}