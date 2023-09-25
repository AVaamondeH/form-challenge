const express = require("express");
const { router }= require("./routes/routes");
const cors = require("cors");
const morgan = require("morgan");

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(router);
server.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'https://selpro-soluciones.netlify.app'];
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    } res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

module.exports = server;
