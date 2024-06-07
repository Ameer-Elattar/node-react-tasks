const express = require("express");
const router = express.Router();
const multer = require("multer");
const imagesController = require("../controllers/imagesController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .route("/images")
  .get(imagesController.getAllImages)
  .post(upload.single("image"), imagesController.uploadImage);

router
  .route("/images/:id")
  .get(imagesController.getImageByID)
  .delete(imagesController.deleteImageByID);
module.exports = router;
