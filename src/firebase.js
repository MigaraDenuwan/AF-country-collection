// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPyQUjs6OjLmYBz2ybK4UqlKyPPIppUMI",
    authDomain: "af-assignment-853dd.firebaseapp.com",
    projectId: "af-assignment-853dd",
    storageBucket: "af-assignment-853dd.firebasestorage.app",
    messagingSenderId: "1055447065706",
    appId: "1:1055447065706:web:4d76dfacec585c5fc45613",
    measurementId: "G-WLBRJ8MD1E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
