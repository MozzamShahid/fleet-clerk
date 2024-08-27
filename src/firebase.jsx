import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// // Your Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyC8kbTFF2KdtFsiPlFay5czb6ecUklsjCY",
//     authDomain: "mozzam-f2375.firebaseapp.com",
//     projectId: "mozzam-f2375",
//     storageBucket: "mozzam-f2375.appspot.com",
//     messagingSenderId: "761294726591",
//     appId: "1:761294726591:web:50958c78e3ed3290d96d0a",
//     measurementId: "G-0PE60CZ6PW"
//   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

