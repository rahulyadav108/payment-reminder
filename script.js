import {
  auth,
  db,
  provider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  ref,
  set,
  push,
  onValue,
  onAuthStateChanged
} from "./app.js";

// ---------- Register ----------
const registerBtn = document.getElementById("registerBtn");
if (registerBtn) {
  registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const number = document.getElementById("regNumber").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    if (!name || !number || !email || !password || password !== confirm) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      await set(ref(db, 'users/' + uid), {
        name,
        number,
        email
      });
      window.location.href = "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// ---------- Login ----------
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// ---------- Google Sign-In ----------
const googleBtn = document.getElementById("googleBtn");
if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = ref(db, "users/" + user.uid);
      await set(userRef, {
        name: user.displayName,
        email: user.email,
        number: "Not set"
      });
      window.location.href = "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// ---------- Dashboard Logic ----------
onAuthStateChanged(auth, (user) => {
  if (window.location.pathname.includes("dashboard.html") && !user) {
    window.location.href = "login.html";
  }

  if (user) {
    const uid = user.uid;
    const nameTag = document.getElementById("username");
    if (nameTag) {
      onValue(ref(db, "users/" + uid), (snapshot) => {
        const data = snapshot.val();
        nameTag.textContent = data?.name || "User";
      });
    }

    // Load message history
    const historyList = document.getElementById("messageHistory");
    if (historyList) {
      onValue(ref(db, "messages/" + uid), (snapshot) => {
        historyList.innerHTML = "";
        const data = snapshot.val();
        for (let key in data) {
          const li = document.createElement("li");
          li.textContent = `${data[key].debtorName}: ${data[key].message}`;
          historyList.appendChild(li);
        }
      });
    }

    // Add new debtor
    const addBtn = document.getElementById("addDebtorBtn");
    if (addBtn) {
      addBtn.addEventListener("click", async () => {
        const debtorName = document.getElementById("debtorName").value;
        const debtorNumber = document.getElementById("debtorNumber").value;
        const dueDate = document.getElementById("dueDate").value;
        const message = document.getElementById("reminderMessage").value;

        if (!debtorName || !debtorNumber || !dueDate || !message) {
          alert("Please fill all debtor fields.");
          return;
        }

        await push(ref(db, "messages/" + uid), {
          debtorName,
          debtorNumber,
          dueDate,
          message
        });

        alert("Debtor added & message scheduled!");
      });
    }
  }
});
