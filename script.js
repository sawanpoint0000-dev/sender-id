// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

/* Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyCrnG8iz_JUgqiG8zVStqKBpicOF4m2SB0",
  authDomain: "iruserid-5c557.firebaseapp.com",
  databaseURL: "https://iruserid-5c557-default-rtdb.firebaseio.com",
  projectId: "iruserid-5c557",
  storageBucket: "iruserid-5c557.firebasestorage.app",
  messagingSenderId: "234438715803",
  appId: "1:234438715803:web:2f254753f6b6827d6a193e"
};

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);

/* Database */
const db = getDatabase(app);

/* Save Data Function */
function saveData(data){

const userRef = ref(db, "users");

push(userRef, data)
.then(()=>{
console.log("Data saved ✔");
})
.catch((err)=>{
console.log("Error:", err);
});

}
