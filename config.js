// Application configuration. While more sophisticated solutions are available this is simple and clean.
// The idea is that values can be overridden by ennvironment variables. This eases multi-environment deployment.
// See: https://12factor.net/config
var config = {};

config.EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT || '3000');
config.GOALS_HOST = process.env.GOALS_HOST || 'jsonplaceholder.typicode.com';


module.exports = config;
