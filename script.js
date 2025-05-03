// Login
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";  // Redirect to dashboard
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Register
registerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = registerEmail.value;
  const password = registerPassword.value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";  // Redirect to dashboard
    })
    .catch((error) => {
      alert(error.message);
    });
});

// Google Sign-In
const googleBtn = document.getElementById("googleBtn");

googleBtn.addEventListener("click", () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // Redirect to dashboard after successful Google login
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Google Sign-In failed: " + error.message);
    });
});

