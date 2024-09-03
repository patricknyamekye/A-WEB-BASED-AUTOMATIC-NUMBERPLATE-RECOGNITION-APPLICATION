const express = require("express");
const router = express.Router();
const { img_gemini } = require("../controllers/imgGeminiController");
const {numberInput} = require("../controllers/imgGeminiController")

router.post("/img-gemini", img_gemini);
router.post("/numberinput",numberInput)

module.exports = router;
