var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var argv = require('yargs').argv;

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV: `"${argv.env || ''}"`
})
