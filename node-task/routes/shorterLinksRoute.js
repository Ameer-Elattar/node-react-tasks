const express = require("express");


const router = express.Router();


const shorterLinkController = require("../controllers/shorterLinksController");


router
  .route("/shorter-link")
  .get(shorterLinkController.getAllShortLinks)
  .post(shorterLinkController.createShorterLink);


module.exports = router;
