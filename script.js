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


googleBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      window.location.href = "dashboard.html";  // Redirect
    })
    .catch((error) => {
      alert(error.message);
    });
});

