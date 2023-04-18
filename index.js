const express = require("express");
const cors = require("cors");
require("dotenv").config();
// add db later 
const PORT = process.env.PORT || 8080;
const DB_URL= process.env.DB_URL;

const server = express();

server.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
  server.use(express.json({ limit: "5mb" }));
  
  server.use(express.urlencoded({ extended: false }));
  
  
  server.listen(PORT, () => {
    console.log("Server is Working in PORT 8080");
  });