// LOGIN
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          alert("Login Failed: " + error.message);
        });
    });
  }

  // REGISTER
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("registerEmail").value;
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          alert("Registration Failed: " + error.message);
        });
    });
  }

  // GOOGLE SIGN-IN
  const googleBtn = document.getElementById("googleBtn");
  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(() => {
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          alert("Google Sign-In Failed: " + error.message);
        });
    });
  }
});
