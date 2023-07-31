import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: "AIzaSyDXJ-zQhkI9TLaGyAOzMuviD400QQYCTiM",
  authDomain: "cms-ticket-sale-appli-cd8b5.firebaseapp.com",
  projectId: "cms-ticket-sale-appli-cd8b5",
  storageBucket: "cms-ticket-sale-appli-cd8b5.appspot.com",
  messagingSenderId: "19843806980",
  appId: "1:19843806980:web:694b856ab398772a5b8251",
  measurementId: "G-NPNQM6W9KW"
};

// Initialize Firebase
const app = initializeApp(config);
const db = getFirestore(app)

export { db }