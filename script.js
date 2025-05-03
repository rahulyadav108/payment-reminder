// Firebase Authentication Logic

// Register User
function registerUser() {
  const name = document.getElementById("register-name").value;
  const phone = document.getElementById("register-phone").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm-password").value;

  if (!name || !phone || !email || !password || !confirmPassword) {
    alert("Please fill all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Registered successfully!");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}


// Login User
function loginUser() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Login successful");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Google Sign-In
function googleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      alert("Signed in with Google");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}
