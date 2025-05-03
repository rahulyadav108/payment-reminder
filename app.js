// Firebase v9+ (Modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4rUpC-Y7m1hGwKydLjTN4hnH4PUejF-0",
  authDomain: "paymentloo.firebaseapp.com",
  databaseURL: "https://paymentloo-default-rtdb.firebaseio.com",
  projectId: "paymentloo",
  storageBucket: "paymentloo.firebasestorage.app",
  messagingSenderId: "678382986235",
  appId: "1:678382986235:web:14d671959c28ec800a215e",
  measurementId: "G-33XCH79XP2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("userName").innerText = user.displayName || "No Name";
    document.getElementById("userEmail").innerText = user.email;
  } else {
    window.location.href = "index.html";
  }
});

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
