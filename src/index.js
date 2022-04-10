const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const wsServer = new Server(server);
let lightSwitch;

const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.get("/light", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "light.html"));
});

app.get("/switch", (req, res) => {
  if (!lightSwitch)
    return res.sendFile(path.join(__dirname, "html", "switch.html"));
  res.send("Sorry man, the switch is already in use");
});

wsServer.on("connection", (client) => {
  console.log("a user connected");

  if (client.handshake.query.switch && !lightSwitch) {
    lightSwitch = client;
    lightSwitch.on("disconnect", () => {
      console.log("light switch disconnected");
      lightSwitch = undefined;
    });
  } else {
    client.on("disconnect", () => {
      console.log("user disconnected");
    });
  }

  client.on("toggle light", () => {
    console.log("toggle switch has been pressed");
    wsServer.emit("toggle light");
  });
});

server.listen(3000, () => {
  console.log(`listening on http://localhost:${port}`);
});
