
var config = {};

config.EXPRESS_PORT = parseInt(process.env.EXPRESS_PORT || '3000');
config.JSON_HOST = process.env.JSON_HOST || 'jsonplaceholder.typicode.com';
config.JSON_PORT = process.env.JSON_PORT || '';

config.GOALS_HOST = process.env.GOALS_HOST || 'localhost';
config.FILES_HOST = process.env.FILES_HOST || 'localhost';
config.LEGACY_HOST = process.env.LEGACY_HOST || 'localhost';


config.GOALS_PORT = process.env.GOALS_PORT || '9000';
config.FILES_PORT = process.env.FILES_PORT || '9001';
config.LEGACY_PORT = process.env.LEGACY_PORT || '12222';

config.IS_CORS_ENABLED =  process.env.IS_CORS_ENABLED || false;
config.CORS_CLIENT = process.env.CORS_CLIENT || '';

// config.IS_AUTH_ENABLED = process.env.IS_AUTH_ENABLED || false;
config.IS_AUTH_ENABLED = true;
config.HEADER_AUTH_KEY_NAME = 'x-auth-token';
config.HEADER_BUSINESS_KEY_NAME = 'x-auth-business';

module.exports = config;
