
var config = {};

config.EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT || '3000');
config.JSON_HOST = process.env.JSON_HOST || 'jsonplaceholder.typicode.com';
config.JSON_PORT = process.env.JSON_PORT || '';

config.GOALS_HOST = process.env.GOALS_HOST || 'localhost';
config.LEGACY_HOST = process.env.LEGACY_HOST || 'localhost';
config.GOALS_PORT = process.env.GOALS_PORT || '9000';
config.LEGACY_PORT = process.env.LEGACY_PORT || '12222';

config.IS_CORS_ENABLED = (process.env.IS_CORS_ENABLED === 'true') || false;
config.CORS_CLIENT = process.env.CORS_CLIENT || '';

module.exports = config;
