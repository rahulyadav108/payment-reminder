// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD4rUpC-Y7m1hGwKydLjTN4hnH4PUejF-0",
  authDomain: "paymentloo.firebaseapp.com",
  databaseURL: "https://paymentloo-default-rtdb.firebaseio.com",
  projectId: "paymentloo",
  storageBucket: "paymentloo.appspot.com",
  messagingSenderId: "678382986235",
  appId: "1:678382986235:web:14d671959c28ec800a215e",
  measurementId: "G-33XCH79XP2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


// Google Login Button
const googleBtns = document.querySelectorAll(".google-login");
googleBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert("Google Sign-In Error: " + error.message);
      });
  });
});
