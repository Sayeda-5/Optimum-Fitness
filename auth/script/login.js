import { header } from "../component/header.js";

let head = document.getElementById("header");

head.innerHTML = header();

//------------------------------------------------------------------------------------------->
//modal box logic
//------------------------------------------------------------------------------------------->
let modal = document.querySelector(".modals");
let fgtPass = document.getElementById("fgt_pass");
let close = document.getElementById("close_pass");
let entEmail = document.getElementById("ent_email");

close.addEventListener("click", () => {
  modal.style.display = "none";
});

fgtPass.addEventListener("click", () => {
  modal.style.display = "flex";
});

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

//------------------------------------------------------------------------------------------->
// login logic
//------------------------------------------------------------------------------------------->

let URL = "https://639ad46531877e43d677befe.mockapi.io/optimumfitness/users";

let form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let username = form.login_username.value;
  let password = form.login_password.value;

  try {
    let res = await fetch(URL);

    if (res.ok) {
      let data = await res.json();

      let count = 0;

      for (let i of data) {
        if (i.username !== username) continue;

        localStorage.setItem('userImage',i.avatar);

        if (i.password === password) count++;
      }

      if (count) {
        alert(`you have been successfully logged in`);

        if(username=="UjjwalS" || username=="Retsudan"){
          localStorage.setItem('adminName',username);
          window.location.href="../admin/admin.html";
        }else{
          localStorage.setItem('username',username);
          window.location.href="../Envious-society-6497/index.html"
        }
      } else {
        alert(`username and password doesn't match`);
      }
    } else {
      alert(`server responded with ${res.status}`);
    }
  } catch (err) {
    console.log(err);
  }
});
