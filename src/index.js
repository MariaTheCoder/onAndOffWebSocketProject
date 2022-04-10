const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const wsServer = new Server(server);

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

wsServer.on("connection", (client) => {
  console.log("a user connected");

  client.on("toggle light", () => {
    console.log("toggle switch has been pressed");
  });

  client.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log(`listening on http://localhost:${port}`);
});
