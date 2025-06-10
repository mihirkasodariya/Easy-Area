const express = require("express");
const router = express.Router();

router.use("/user", require("./userRoutes"));
router.use("/map", require("./areaRouter"));
router.use("/distance", require("./distanceRoutes"));

router.use("/convert", require("./convertRoute"));

module.exports = router;
