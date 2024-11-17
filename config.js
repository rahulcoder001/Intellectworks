const { initializeApp } = require('firebase/app');
const { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDecqDsY5udl5N2J4S2dzmoaYQUyBiigjI",
  authDomain: "intellectworks-8af0b.firebaseapp.com",
  projectId: "intellectworks-8af0b",
  storageBucket: "intellectworks-8af0b.firebasestorage.app",
  messagingSenderId: "209731270946",
  appId: "1:209731270946:web:9b5de08581aebc0e7d8d7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// References to collections
const User = collection(db, 'users'); //collection for user
const Notes = collection(db, 'notes'); // collection for notes

// Export Firestore methods and collection references
module.exports = { 
  User, 
  Notes, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
};
