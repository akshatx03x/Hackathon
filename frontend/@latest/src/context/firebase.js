// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADgEYl4AC94V8LDZbcnxnsHJCjKDYhiws",
  authDomain: "hackathon-2b758.firebaseapp.com",
  projectId: "hackathon-2b758",
  storageBucket: "hackathon-2b758.firebasestorage.app",
  messagingSenderId: "1008255032235",
  appId: "1:1008255032235:web:4ebbc4af8d3a98815510ee",
  measurementId: "G-XCQB0NDKS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };