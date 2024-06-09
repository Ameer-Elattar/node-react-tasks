import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../config/firebase";

const addImageToFavorite = async (payload) => {
  const collectionRef = collection(firestore, "favorites");
  await addDoc(collectionRef, payload);
};

const getFavoriteImages = async () => {
  const snapshot = await getDocs(collection(firestore, "favorites"));
  return snapshot.docs.map((doc) => doc.data());
};
export { addImageToFavorite, getFavoriteImages };
