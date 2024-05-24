const http = require('http');
const { handleRequest } = require('./handleRequest');
const  connectDB  = require('../config/db');
require('dotenv').config();
const startServer = () => {
    connectDB();
    const PORT = process.env.PORT || 5000;
    const server = http.createServer(handleRequest);
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

module.exports = { startServer };
