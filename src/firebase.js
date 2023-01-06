import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoEW6WKnUAiPQxQlRrgBRW6MIR7Ovyam0",
  authDomain: "blog-app-4a399.firebaseapp.com",
  projectId: "blog-app-4a399",
  storageBucket: "blog-app-4a399.appspot.com",
  messagingSenderId: "629062711465",
  appId: "1:629062711465:web:217c6868a7427dbbf091b8",
  measurementId: "G-GZCTNV4PLQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage };
