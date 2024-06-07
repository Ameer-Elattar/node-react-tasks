const express = require("express");
const dotenv = require("dotenv").config();
const server = express();
const imageRoute = require("./routes/imagesRoutes");

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

// logging middelware
server.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});
server.use(express.urlencoded({ extended: true }));
// routes middleware
server.use(imageRoute);

// notfound  middelware
server.use((req, res, next) => {
  res.status(404).json({ data: "Not Found" });
});

// Error middelware

server.use((err, req, res, next) => {
  res.status(500).json({ data: `From Error MW ${err}` });
});
