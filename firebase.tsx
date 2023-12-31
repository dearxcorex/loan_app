// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO0sc1AwDrrEZoJI9CnwLqMRiCOUc9ApQ",
  authDomain: "loanapp-b961c.firebaseapp.com",
  projectId: "loanapp-b961c",
  storageBucket: "loanapp-b961c.appspot.com",
  messagingSenderId: "28055878135",
  appId: "1:28055878135:web:edd06b718726e5ccc116f2",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

const firestore: Firestore = getFirestore(app);

export { app, firestore };
