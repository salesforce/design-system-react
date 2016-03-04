const packageJson = require('./package.json');
const header = packageJson.name + '\n' + 'v' + packageJson.version + '\n';

module.exports = header;
