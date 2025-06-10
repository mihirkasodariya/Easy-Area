const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");
const { validateAccessToken, authorizeRoles } = require("../middeleware/auth");

router.get("/getGoogleOAuthUrl", userController.getGoogleOAuthUrl); // user
router.post("/googleOAuthLogin", userController.googleOAuthLogin); // user

module.exports = router;
