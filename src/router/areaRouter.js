// routes/areaRouter.js
const express = require("express");
const router = express.Router();
const areaController = require("../controller/areacontroller");

router.post("/addAreaMeasuring", areaController.addAreaMeasuring);
//router.get("/getAreaMeasuring", areaController.getAllAreaMeasuring);
router.get("/getAreaMeasuring", areaController.getAreaMeasuring);
router.put("/updateAreaMeasuring/:id", areaController.updateAreaMeasuring);
router.delete(
  "/softDeleteAreaMeasuring/:id",
  areaController.softDeleteAreaMeasuring
);

module.exports = router;
