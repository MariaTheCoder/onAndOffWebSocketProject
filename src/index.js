const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/light", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "light.html"));
});

app.get("/switch", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "switch.html"));
});

server.listen(3000, () => {
  console.log(`listening on http://localhost:${port}`);
});
