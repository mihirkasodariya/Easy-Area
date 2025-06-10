// const express = require("express");
// const router = express.Router();
const distanceController = require("../controller/distanceController");
// const { validateAccessToken, authorizeRoles } = require("../middeleware/auth");

module.exports = (socket) => {
  console.log("Socket connected:", socket.id);

  // Listen for 'calculateDistance' (no slash)
  socket.on("calculateDistance", (payload) => {
    console.log("Received calculateDistance event:", payload);
    distanceController.handleCalculateDistance(socket, payload);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
};



//router.post("/convertdistance", distanceController.convertDistance);
// router.post(
//   "/convert-distance",
//   validateAccessToken,
//   distanceController.calculateDistance
// );
// router.get(
//   "/get-distances",
//   validateAccessToken,
//   distanceController.getAllDistances
// );
// router.delete(
//   "/delete-distance/:id",
//   validateAccessToken,
//   distanceController.deleteDistance
// );

// module.exports = router;
