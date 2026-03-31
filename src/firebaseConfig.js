// 1. Import the core Firebase library
import { initializeApp } from "firebase/app";

// 2. Import the Auth and Database tools we turned on in the dashboard
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 3. Your specific Moonlight Mana Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "moonlight-mana.firebaseapp.com",
  projectId: "moonlight-mana",
  storageBucket: "moonlight-mana.firebasestorage.app",
  messagingSenderId: "397036863449",
  appId: "1:397036863449:web:b27d6365770b4a9c4923c8"
};

// 4. Initialize the Firebase app
const app = initializeApp(firebaseConfig);

// 5. Export Auth and Database so the rest of your app can use them
export const auth = getAuth(app);
export const db = getFirestore(app);