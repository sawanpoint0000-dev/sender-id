/* 🔄 AUTO REFRESH AFTER 7 MINUTES */
setTimeout(() => location.reload(), 420000);

/* 🔥 FIREBASE CONFIG (UNCHANGED) */
firebase.initializeApp({
  apiKey: "AIzaSyCrnG8iz_JUgqiG8zVStqKBpicOF4m2SB0",
  authDomain: "iruserid-5c557.firebaseapp.com",
  databaseURL: "https://iruserid-5c557-default-rtdb.firebaseio.com",
  projectId: "iruserid-5c557",
  storageBucket: "iruserid-5c557.firebasestorage.app",
  messagingSenderId: "234438715803",
  appId: "1:234438715803:web:2f254753f6b6827d6a193e"
});
const db = firebase.database();

/* 🧠 UNIQUE BROWSER ID */
let containerId = localStorage.getItem("containerId");
if (!containerId) {
  containerId = "browser_" + Math.random().toString(36).slice(2, 10);
  localStorage.setItem("containerId", containerId);
}

/* 🔐 FIXED RANDOM-LOOKING IRCTC PASSWORD POOL (ONLY 10) */
const PASSWORD_POOL = [
  "Ir@9A3ctc",
  "Ra#7L2@in",
  "In@5D8ia!",
  "Tr@6N1#ck",
  "Pa@8S2!wd",
  "Us@4R9#id",
  "Lo@7G!23",
  "Co@6F#8m",
  "Sa@5F9!e",
  "Ti@8K#4t"
];

/* 🎯 RANDOM PICK (BUT ONLY FROM ABOVE 10) */
function getPassword() {
  const i = Math.floor(Math.random() * PASSWORD_POOL.length);
  return PASSWORD_POOL[i];
}

/* ⚡ GENERATE */
function generate() {
  const email = emailEl.value.trim();
  const mobile = mobileEl.value.trim();

  if (!email || !mobile) {
    alert("Email & Mobile required");
    return;
  }

  /* 🆔 USER ID */
  const name = email.split("@")[0].replace(/[^a-zA-Z]/g, "").toLowerCase();
  const digits = Math.floor(10 + Math.random() * 90);
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const userId =
    name +
    digits +
    letters[Math.floor(Math.random() * 26)] +
    letters[Math.floor(Math.random() * 26)];

  /* 🔐 PASSWORD (FROM FIXED 10 ONLY) */
  const password = getPassword();

  /* 📌 SET OUTPUTS */
  pass.value = password;
  userid.value = userId;
  phone.value = mobile;
  mailout.value = email;

  final.value =
`${userId}
${password}
${mobile}
${email}`;

  /* 🔥 SAVE TO FIREBASE */
  db.ref("users/" + containerId + "/activity").push({
    email,
    mobile,
    userid: userId,
    password,
    time: Date.now()
  });
}

/* 📋 COPY FUNCTIONS */
function copyText(btn, id) {
  navigator.clipboard.writeText(document.getElementById(id).value);
  btn.classList.add("copied");
  setTimeout(() => btn.classList.remove("copied"), 2000);
}

function copyAll(btn) {
  navigator.clipboard.writeText(final.value);
  btn.classList.add("copied");
  setTimeout(() => btn.classList.remove("copied"), 3000);
}

/* 🔗 SHORTCUT ELEMENTS */
const emailEl = email;
const mobileEl = mobile;
