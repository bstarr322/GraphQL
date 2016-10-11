var config = {};

config.EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT || '3000');
config.JSON_HOST = process.env.JSON_HOST || 'jsonplaceholder.typicode.com';
config.JSON_PORT = process.env.JSON_PORT || '';
config.GOALS_HOST = process.env.GOALS_HOST || 'localhost';
config.GOALS_PORT = process.env.GOALS_PORT || '9000';

module.exports = config;
