import {getFirestore} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD79z-hzmLf7sdI6CWEKYdU7ng02RPU38E",
  authDomain: "aura-derm-react.firebaseapp.com",
  projectId: "aura-derm-react",
  storageBucket: "aura-derm-react.firebasestorage.app",
  messagingSenderId: "700553768441",
  appId: "1:700553768441:web:8c6e065dfbc9628117a128",
  measurementId: "G-4361VECLTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);