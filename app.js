// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
    getDatabase,
    get,
    ref,
    push,
    child,
    onChildChanged,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyBDv5AKm1GQSjuCd-fOP4qgr8XU1K6ToXA",
authDomain: "turuu-37c99.firebaseapp.com",
databaseURL: "https://turuu-37c99-default-rtdb.firebaseio.com",
projectId: "turuu-37c99",
storageBucket: "turuu-37c99.appspot.com",
messagingSenderId: "50540425756",
appId: "1:50540425756:web:fadd6ab84a485226e165d9",
measurementId: "G-723S43PSKN"
};

// Initialize Firebase
console.log("Setup start.");
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("Setup finish.");
const dbRef = ref(db);
const btn =document.getElementsByTagName("button")[0];
const names = document.getElementsByTagName("input")[0];

const users = [];
btn.addEventListener("click" , ()=>{
    let name = names.value;
    saveName(name , users.length);
})
onChildChanged(ref(db, "users/"), (snapshot) => {
    if (snapshot.exists()) {
      console.log("Child changed.", snapshot.val());
      const changedUser = snapshot.val();
      const findIndex = users.findIndex((user) => user.id === changedUser.id);
      users[findIndex] = changedUser;
      drawUser();
    }
});


function saveName(name , id , color = "violet"){
    push(child(dbRef , "users/") , {
        name:name,
        id:id,
        color:color
    })
    .then(() => {
        alert("Амжилттай хадгаллаа.");
        console.log(push)
        onChildChanged((snapshot) => {
            if (snapshot.exists()) {
              console.log("Child changed.", snapshot.val());
              const changedUser = snapshot.val();
              const findIndex = users.findIndex((user) => user.id === changedUser.id);
              users[findIndex] = changedUser;
              drawUser();
            }
        })
    })
    .catch((err) => {
        console.log("Push-Err", err);
    });
    // name=name;
    // console.log(name)
}

function drawUser(){
    const usEL = document.getElementById("object");
    let userList = ""
    users.forEach(user =>{
        userList+= `
        <p style="color:${user.color}">Name: ${user.name}</p>
        `
    })
    usEL.innerHTML = userList;
       
}
function getusers(){
    
    get(child(dbRef , "users/"))
    .then((snapshot) =>{
        if(snapshot.exists()){
            snapshot.forEach((doc) => {
                console.log("data-rece");
                users.push(doc.val());
            })
            drawUser();
        }
        console.log("Response-Data" , snapshot)
    })
    .catch((err) => console.log("DB-ERR", err));
    console.log("DB", db);
    
}



getusers();