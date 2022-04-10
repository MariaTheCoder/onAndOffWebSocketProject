const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const io = new Server(server);

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

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log(`listening on http://localhost:${port}`);
});
