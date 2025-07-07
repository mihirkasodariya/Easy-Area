// const express = require("express");
// const router = express.Router();
const waypointsController = require("../controller/waypointsController");
// const { validateAccessToken, authorizeRoles } = require("../middeleware/auth");

module.exports = (socket) => {
  console.log("Socket connected:", socket.id);

  // Listen for 'calculateDistance' (no slash)
  socket.on("handleCalculateDistance", (payload) => {
    console.log("Received handleCalculateDistance event:", payload);
    waypointsController.handleCalculateDistance(socket, payload);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
};

