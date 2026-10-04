import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  onSnapshot, 
  addDoc, 
  query, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCOnKJIYQ2BTH0Se5ePFoRuQzTTUu1woZo",
  authDomain: "globalcomputerseluru-dddd3.firebaseapp.com",
  projectId: "globalcomputerseluru-dddd3",
  storageBucket: "globalcomputerseluru-dddd3.firebasestorage.app",
  messagingSenderId: "177329078331",
  appId: "1:177329078331:web:bcd123d8b3fa34f7aedc1e",
  measurementId: "G-QBRCMSQV0P"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

export { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc, 
  getDocs, 
  onSnapshot, 
  addDoc, 
  query, 
  orderBy,
  serverTimestamp 
};
export default app;
