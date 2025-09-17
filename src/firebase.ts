// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYkoAs-97MqwNlK-c7-P3RFolp3anP1IM",
  authDomain: "todo-app-14d64.firebaseapp.com",
  projectId: "todo-app-14d64",
  storageBucket: "todo-app-14d64.firebasestorage.app",
  messagingSenderId: "335625791411",
  appId: "1:335625791411:web:7a79c61cc3c38f097a4dc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)