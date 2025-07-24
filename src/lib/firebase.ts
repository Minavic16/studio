// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "nestedge-streamlined-education",
  "appId": "1:585071494466:web:3afa04c37fc3866a3574db",
  "storageBucket": "nestedge-streamlined-education.firebasestorage.app",
  "apiKey": "AIzaSyCZAcGYX-sPyhpf6fz13FoVLLMojRfLqAY",
  "authDomain": "nestedge-streamlined-education.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "585071494466"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
