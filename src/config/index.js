require('dotenv').config(); // instatiate environment variables

const CONFIG = {}; // Make this global to use all over the application

CONFIG.app = process.env.APP || 'localhost';
CONFIG.port = process.env.PORT || '7000';

CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'db-password';
CONFIG.db_name = process.env.DB_NAME || 'userTable';

module.exports = CONFIG;
