const axios = require("axios");
const { firestore } = require("../model/firebaseConfigration");

exports.createShorterLink = (req, res, next) => {
  axios.defaults.headers.common["User-Agent"] = "";

  const { title, imageURL } = req.body;
  const apikey = process.env.SHAREAHOLIC_APIKEY;

  if (!imageURL) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  axios
    .get(
      `https://www.shareaholic.com/v2/share/shorten_link?apikey=${apikey}&url=${imageURL}`
    )
    .then((response) => {
      firestore.collection("shorterLinks").doc().set({
        title,
        shorterLink: response.data.data,
      });
      res.status(200).json({ title, shorterLink: response.data.data });
    })
    .catch((err) => next(err));
};

exports.getAllShortLinks = (req, res, next) => {
  firestore
    .collection("shorterLinks")
    .get()
    .then((data) => {
      const shorterLinks = [];
      data.forEach((doc) => {
        shorterLinks.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      res.status(200).json({ shorterLinks });
    })
    .catch((err) => next(err));
};
