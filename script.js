
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

window.register = function () {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Registration successful!");
      window.location.href = "dashboard.html";
    })
    .catch(error => alert(error.message));
};

window.login = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => alert("Login failed: " + error.message));
};

window.loginWithGoogle = function () {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => alert("Google Sign-In failed: " + error.message));
};

if (window.location.pathname.includes("dashboard.html")) {
  onAuthStateChanged(auth, user => {
    if (user) {
      document.getElementById("user-email").innerText = user.email;
    } else {
      window.location.href = "index.html";
    }
  });
}

window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
document.getElementById("messageType").addEventListener("change", function () {
  const customMsgBox = document.getElementById("customMessage");
  customMsgBox.style.display = this.value === "custom" ? "block" : "none";
});

document.getElementById("debtorForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("debtorName").value;
  const number = document.getElementById("debtorNumber").value;
  const dueDate = document.getElementById("dueDate").value;
  const messageType = document.getElementById("messageType").value;
  const customMessage = document.getElementById("customMessage").value;

  // Replace this with Firebase Database logic
  alert(`Debtor added:
    Name: ${name}
    Number: ${number}
    Due: ${dueDate}
    Message: ${messageType === 'custom' ? customMessage : 'Default Reminder'}
  `);
});

window.showNotifications = function () {
  document.getElementById("notifications").style.display = "block";
  document.getElementById("profile").style.display = "none";
};

window.showProfile = function () {
  document.getElementById("notifications").style.display = "none";
  document.getElementById("profile").style.display = "block";
};
