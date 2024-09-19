import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore" 



const firebaseConfig = {
  apiKey: "AIzaSyBQ3RfbyOS9hQz3yyLfmVQRL8mltIgsw3c",
  authDomain: "ruminote-f0353.firebaseapp.com",
  projectId: "ruminote-f0353",
  storageBucket: "ruminote-f0353.appspot.com",
  messagingSenderId: "1096858736093",
  appId: "1:1096858736093:web:360f3672b81f0a5174d234"
};

// Initialize Firebase, app contains tons of stuff
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);

