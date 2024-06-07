const { bucket, firestore } = require("../model/firebaseConfigration");
exports.uploadImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(404).json({ data: "not image found" });
  }
  try {
    const imageId = firestore.collection("images").doc().id;
    const file = bucket.file(`images/${imageId}_${req.file.originalname}`);
    await file.save(req.file.buffer, {
      metadata: { contentType: req.file.mimetype },
    });
    const downloadURL = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });

    await firestore
      .collection("images")
      .doc(imageId)
      .set({
        downloadURL: downloadURL[0],
        metadata: {
          contentType: req.file.mimetype,
          imageName: req.file.originalname,
        },
      });
    res
      .status(201)
      .json({ data: { id: imageId, downloadURL: downloadURL[0] } });
  } catch (error) {
    next(error);
  }
};

exports.getAllImages = (req, res, next) => {
  firestore
    .collection("images")
    .get()
    .then((data) => {
      const images = [];
      data.forEach((doc) => {
        images.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      res.status(200).json({ images });
    })
    .catch((err) => next(err));
};

exports.getImageByID = (req, res, next) => {
  firestore
    .collection("images")
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.status(200).json({ data: doc.data() });
    })
    .catch((err) => next(err));
};

exports.deleteImageByID = (req, res, next) => {
  firestore
    .collection("images")
    .doc(req.params.id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Image not found" });
      }
      firestore
        .collection("images")
        .doc(req.params.id)
        .delete()
        .then(() => {
          const file = bucket.file(
            `images/${req.params.id}_${doc.data().metadata.imageName}`
          );
          file.delete();
        });
      res.status(200).json({ msg: "Image deleted ", data: doc.data() });
    })
    .catch((err) => next(err));
};
