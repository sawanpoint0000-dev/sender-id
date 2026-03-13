/* AUTO REFRESH */
setTimeout(() => location.reload(), 5400000);

/* FIREBASE INIT (:contentReference[oaicite:0]{index=0}) */
const firebaseConfig = {
  apiKey: "AIzaSyCrnG8iz_JUgqiG8zVStqKBpicOF4m2SB0",
  authDomain: "iruserid-5c557.firebaseapp.com",
  databaseURL: "https://iruserid-5c557-default-rtdb.firebaseio.com",
  projectId: "iruserid-5c557",
  storageBucket: "iruserid-5c557.firebasestorage.app",
  messagingSenderId: "234438715803",
  appId: "1:234438715803:web:2f254753f6b6827d6a193e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* PASSWORD GENERATOR */
function generatePassword(){
  const lower="abcdefghijklmnopqrstuvwxyz";
  const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num="0123456789";
  const sp="@#$%!&*";
  const all=lower+upper+num+sp;

  const len=Math.floor(Math.random()*5)+8;
  let p="";

  p+=lower[Math.floor(Math.random()*lower.length)];
  p+=upper[Math.floor(Math.random()*upper.length)];
  p+=num[Math.floor(Math.random()*num.length)];
  p+=sp[Math.floor(Math.random()*sp.length)];

  for(let i=p.length;i<len;i++){
    p+=all[Math.floor(Math.random()*all.length)];
  }

  return p.split("").sort(()=>Math.random()-0.5).join("");
}

/* GENERATE */
function generate(){

const email=document.getElementById("email").value.trim();
const mobile=document.getElementById("mobile").value.trim();

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

/* OUTPUT */
document.getElementById("pass").value=password;
document.getElementById("userid").value=userId;
document.getElementById("phone").value=mobile;
document.getElementById("mailout").value=email;

document.getElementById("final").value=
`${userId}
${password}
${mobile}
${email}`;

/* SAVE */
db.ref("users").push({
email:email,
mobile:mobile,
userid:userId,
password:password,
time:Date.now()
});

}

/* COPY */
function copyText(btn,id){
navigator.clipboard.writeText(
document.getElementById(id).value
);
btn.innerText="Copied";
setTimeout(()=>btn.innerText="Copy",2000);
}

function copyAll(btn){
navigator.clipboard.writeText(
document.getElementById("final").value
);
btn.innerText="Copied";
setTimeout(()=>btn.innerText="ALL COPY",2000);
}
