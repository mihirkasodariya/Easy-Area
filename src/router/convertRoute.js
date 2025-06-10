// const express = require("express");
// const router = express.Router();
const areaMeasuringController = require("../controller/convertController");

//router.post("/convert", convertArea);
//router.post("/convert", convertArea);
// router.post("/", areaMeasuring);
// socket.on("areaMeasuring", (payload) => areaMeasuringController.areaMeasuring(socket, payload));


module.exports = (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("areaMeasuring", (payload) => {
    console.log("Received areaMeasuring event:", payload);
    areaMeasuringController.areaMeasuring(socket, payload);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
};

// module.exports = router;
