// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "QQQQQQQQQQQQQQQQQQQQ",
  authDomain: "WWWWWWWWWWWWWWWW",
  projectId: "EEEEEEEEEEEEEEEE",
  storageBucket: "RRRRRRRRRRRRRRR",
  messagingSenderId: "TTTTTTTTTTTTTTT",
  appId: "YYYYYYYYYYYYYYYYYYYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "bookmarks");


function delEvent(){
  const del = document.querySelectorAll("i.delete");
  del.forEach(button => {
    button.addEventListener("click", event => {
        const delRef = doc(db, "bookmarks", button.dataset.id);
        deleteDoc(delRef)
          .then(() => {
            button.parentElement.parentElement.parentElement.remove();
          })
      })
  })
};


function cardTemp(data, id){

  const title = data.category === "youtube"? `${data.category[0].toUpperCase()}${data.category.slice(1,3)}${data.category[3].toUpperCase()}${data.category.slice(4)}` : data.category[0].toUpperCase()+data.category.slice(1);

  return  `<div class="card">
              <p class="title">${data.title}</p>
              <div class="sub-info">
                  <p>
                      <span class="category ${data.category}">${title}</span>
                  </p>
                  <a href="${data.link}" target="_blank"><i class="bi bi-box-arrow-up-right website"></i></a>
                  <a href="https://www.google.com/search?q=${data.title}" target="_blank"><i class="bi bi-google search"></i></a>
                  <span><i class="bi bi-trash delete" data-id="${id}"></i></span>
              </div>
          </div>`;
};

const cards = document.querySelector(".cards");

function getCard(){
  cards.innerHTML = "";
      getDocs(colRef)
      .then(data => {
          data.docs.forEach(document => {
              cards.innerHTML += cardTemp(document.data(), document.id);
          });
          delEvent();
  })
  .catch(error => {
      console.log(error);
  });
};
getCard();

const addForm = document.querySelector(".add");
addForm.addEventListener("submit", event => {
  event.preventDefault();

  addDoc(colRef, {
      link: addForm.link.value,
      title: addForm.title.value,
      category: addForm.category.value,
      createdAt: serverTimestamp()
  })
  .then(() => {
      addForm.reset();
      getCard();
  })
});

function individualCard(category){
  if(category === "All"){
    getCard();
  } else{
    const qRef = query(colRef, where("category", "==", category.toLowerCase()));
        
    cards.innerHTML = "";
    getDocs(qRef)
      .then(data => {
        console.log(data)
        if(data.docs.length === 0){
          cards.innerHTML = `<p style = "margin-top:50px; font-size: 20px; font-style: italic">No Bookmark is found in this category</p>`
        } else{
          data.docs.forEach(document => {
              cards.innerHTML += cardTemp(document.data(), document.id);
          });
        }
        
          delEvent();
      })
      .catch(error => {
        console.log(error);
      });
  }
}

const categoryList = document.querySelector(".category-list");
const categoryAll = document.querySelectorAll(".category-list span");

categoryList.addEventListener("click", event => {
    if(event.target.tagName === "SPAN"){
        individualCard(event.target.innerText);
        categoryAll.forEach(each => each.classList.remove("active"));
        event.target.classList.add("active");   
    }
});