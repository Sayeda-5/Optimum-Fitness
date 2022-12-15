import { header } from "../component/header.js";

// Appending header

let head = document.getElementById("header");

head.innerHTML = header();

//------------------------------------------------------------------------------------------->
// this is for gender functionality
//------------------------------------------------------------------------------------------->

let genderArr = document.querySelectorAll('input[name="gender"]');

let selectedValue;

for (let i of genderArr) {
  i.addEventListener("change", () => {
    if (i.checked) {
      selectedValue = i.value;

      if (selectedValue === "female") {
        let select = document.getElementById("register-select");
        select.style.display = "inline";
      } else {
        let select = document.getElementById("register-select");
        select.style.display = "none";
      }
    }
  });
}

//------------------------------------------------------------------------------------------->
//appending date according to month
//------------------------------------------------------------------------------------------->

let selectDate = document.getElementById("select_days");
let selectMonth = document.getElementById("select_month");
let newOption = [];

for (let i = 1; i < 32; i++) {
  newOption.push(renderDate(i));
}

selectDate.innerHTML = newOption.join("");

selectMonth.addEventListener("change", () => {
  newOption = [];
  for (let i = 1; i < 32; i++) {
    if (selectMonth.value === "February" && i > 28) {
      break;
    } else if (
      selectMonth.value === "April" ||
      selectMonth.value === "June" ||
      selectMonth.value === "September" ||
      selectMonth.value === "November"
    ) {
      if (i > 30) break;
    }

    newOption.push(renderDate(i));
  }

  selectDate.innerHTML = newOption.join("");
});

function renderDate(i) {
  return `
    <option value="${i}">${i}</option>
    `;
}

//------------------------------------------------------------------------------------------->
// Checkbox Functionality
//------------------------------------------------------------------------------------------->

let checkAll = document.getElementById("check_all");
let tos = document.getElementById("Tos_pp");
let checkedEmail = document.getElementById("receive_email");
let checkPersonalized = document.getElementById("personalized");

checkAll.addEventListener("change", () => {
  if (checkAll.checked === true) {
    tos.checked = true;
    checkedEmail.checked = true;
    checkPersonalized.checked = true;
  } else {
    tos.checked = false;
    checkedEmail.checked = false;
    checkPersonalized.checked = false;
  }
});

//------------------------------------------------------------------------------------------->
//Now for post our signup;
//------------------------------------------------------------------------------------------->

let form = document.querySelector("form");

let URL = "https://639ad46531877e43d677befe.mockapi.io/optimumfitness/users";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let email = form.signup_email.value;
  let username = form.signup_username.value;
  let password = form.signup_password.value;
  let gender = selectedValue;
  let date = form.select_days.value;
  let month = form.select_month.value;
  let year = form.select_year.value;
  let feet = form.height_ft.value;
  let inch = form.height_in.value;
  let weight = form.weight_kg.value;

  //Checking password logic

  if (password.length < 8) {
    alert("Password should be at least 8 character");
    return;
  }

  let count = 0;

  for (let i = 0; i < password.length; i++) {
    if (
      password[i] == "@" ||
      password[i] == "&" ||
      password[i] == "*" ||
      password[i] == "%" ||
      password[i] == "." ||
      password[i] == "#" ||
      password[i] == "!"
    ) {
      count++;
    }
  }

  if (count == 0) {
    alert("Password should contain at least one special character");
    return;
  }

  //Now posting data into the server

  let obj = {
    username,
    email,
    password,
    gender,
    DOB: `${date} ${month} ${year}`,
    height: [feet,inch],
    weight,
  };

  try {
    let res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (res.ok) {
      alert("Successfully signed up");
      window.location.href = "login.html";
    } else {
      alert(`Server says ${res.status} error`);
    }
  } catch (err) {
    console.log(err);
  }
});
