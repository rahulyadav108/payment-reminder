// ✅ Your Firebase config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ✅ Login with Email/Password
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch(err => alert("Login failed: " + err.message));
  });
}

// ✅ Register with Email/Password
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = registerForm['register-name'].value;
    const phone = registerForm['register-phone'].value;
    const email = registerForm['register-email'].value;
    const password = registerForm['register-password'].value;

    auth.createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        // You can save name and phone in Firebase Database if needed
        window.location.href = "dashboard.html";
      })
      .catch(err => alert("Registration failed: " + err.message));
  });
}

// ✅ Google Sign-In (Login or Register)
const googleBtns = document.querySelectorAll('.google-btn');
googleBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch(err => alert("Google sign-in failed: " + err.message));
  });
});
