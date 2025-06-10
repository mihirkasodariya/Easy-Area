const { userModel, googleOAuthValidation } = require("../model/userModel");
const { generateJWToken } = require("../middeleware/auth");
const response = require("../utils/response");
const bcrypt = require("bcrypt");

module.exports.getGoogleOAuthUrl = async (req, res) => {
  try {
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}&scope=openid%20email%20profile`;
    return response.success(
      res,
      200,
      "Google OAuth URL generated successfully. Please proceed with the login process",
      { url: redirectUrl }
    );
  } catch (err) {
    console.error(err);
    return response.error(
      res,
      500,
      "Oops! Something went wrong. Our team is looking into it.",
      {}
    );
  }
};

module.exports.googleOAuthLogin = async (req, res) => {
  const axios = require("axios");

  const { code } = req.body;
  const { error } = googleOAuthValidation.validate(req.body);
  if (error) {
    return response.error(res, 400, error.details[0].message);
  }
  const decodedCode = decodeURIComponent(code);
  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code: decodedCode,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: "authorization_code",
      }
    );
    const { access_token } = tokenResponse.data;

    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const user = userInfoResponse.data;
    let createNewUser = await userModel.findOne({ email: user?.email });
    if (!createNewUser) {
      let createNewUser = new userModel({
        fname: user?.given_name,
        lname: user?.family_name,
        email: user?.email,
        profilePhoto: user?.picture,
      });
      await createNewUser.save();
    }
    console.log("createNewUser", createNewUser);
    let token = await generateJWToken({ id: createNewUser?._id });
    console.log("token", token);
    return response.success(res, 200, "Google authentication successful.", {
      //   _id: createNewUser?._id,
      token: token,
    });
  } catch (error) {
    if (
      error.response?.data?.error === "invalid_grant" ||
      error.response?.data?.error_description === "Bad Request"
    ) {
      return response.error(
        res,
        403,
        "Authorization code expired. Please try again.",
        {}
      );
    }
    console.error("Google signup error:", error.response?.data.error);
    return response.error(
      res,
      500,
      "Oops! Something went wrong. Our team is looking into it.",
      {}
    );
  }
};
