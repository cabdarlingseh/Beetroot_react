// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuC8gZrDEftEqCwn6nzqO1ryG6tPLN__8",
    authDomain: "beetroot-react.firebaseapp.com",
    projectId: "beetroot-react",
    storageBucket: "beetroot-react.firebasestorage.app",
    messagingSenderId: "225996967720",
    appId: "1:225996967720:web:5422ff8fe9327b7c900a1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);