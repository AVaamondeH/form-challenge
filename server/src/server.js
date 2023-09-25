const express = require("express");
const { router }= require("./routes/routes");
const cors = require("cors");
const morgan = require("morgan");

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(router);

module.exports = server;
