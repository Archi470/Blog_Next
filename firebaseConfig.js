import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBL6vqDHdnS54X76bcoOmEH4KbjSoSnSGk",
    authDomain: "archi-16436.firebaseapp.com",
    projectId: "archi-16436",
    storageBucket: "archi-16436.firebasestorage.app",
    messagingSenderId: "842641071625",
    appId: "1:842641071625:web:2fbf3fc0dcbc8eebe722d8",
    measurementId: "G-2GNGJX6N6L"
  };
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);