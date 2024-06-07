const admin = require("firebase-admin");
const credientials = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(credientials),
  storageBucket: "gs://zetaton-task-d4852.appspot.com",
});

const bucket = admin.storage().bucket();
const firestore = admin.firestore();

module.exports = { bucket, firestore };
