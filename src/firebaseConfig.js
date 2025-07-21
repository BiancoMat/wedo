
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkosBa7JWBLBprYqCQWlXC95pG-Ht3lD0",
  authDomain: "wedo-91064.firebaseapp.com",
  projectId: "wedo-91064",
  storageBucket: "wedo-91064.firebasestorage.app",
  messagingSenderId: "831893795924",
  appId: "1:831893795924:web:e02f74fc4b4b15ce88e9c1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
