var argv = require('yargs').argv;

module.exports = {
  NODE_ENV: '"production"',
  ENV: `"${argv.env || ''}"`
}
