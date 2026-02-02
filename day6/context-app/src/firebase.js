
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoTkhovBvV_qvKZutE_cPIxy9SVMkM_e8",
  authDomain: "context-app-81669.firebaseapp.com",
  databaseURL: "https://context-app-81669-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "context-app-81669",
  storageBucket: "context-app-81669.firebasestorage.app",
  messagingSenderId: "224163457805",
  appId: "1:224163457805:web:3a2202655857f18d979e44",
  measurementId: "G-79CKDHZ1KR"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);