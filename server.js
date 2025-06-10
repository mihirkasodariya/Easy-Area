const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const { Server } = require("socket.io");

const connectDB = require("./dbconnect");
connectDB();

const distanceHandler = require("./src/router/distanceRoutes");
const areaHandler = require("./src/router/convertRoute");

const app = express();
const port = process.env.PORT || 3001;

const server = http.createServer(app);

const io = new Server(server, {
  path: "/socket",
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./src/router/index"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/start", (req, res) => {
  res.send("<h1>Hello Molimor</h1>");
});

const distanceNamespace = io.of("/calculateDistance");
distanceNamespace.on("connection", (socket) => {
  console.log("📏 [Distance] connected:", socket.id);
  distanceHandler(socket);
  socket.on("disconnect", () => {
    console.log("📏 [Distance] disconnected:", socket.id);
  });
});

const areaNamespace = io.of("/convertArea");
areaNamespace.on("connection", (socket) => {
  console.log("📐 [Area] connected:", socket.id);
  areaHandler(socket);
  socket.on("disconnect", () => {
    console.log("📐 [Area] disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
