//------------------------------------------------------------------------------------------->
//Loading Effect
//------------------------------------------------------------------------------------------->

window.onload = () => {
  let loader = document.getElementById("loader");
  let adminMain = document.getElementById("admin_main");

  setTimeout(() => {
    loader.style.display = "none";
    adminMain.style.display = "block";
  }, 1000);

  getUsers();
  latestUser();
  adminData();
  pagination();
  appendUsers();
};

//------------------------------------------------------------------------------------------->
//For setting class of active on sidebar
//------------------------------------------------------------------------------------------->

const sidebar = document.querySelectorAll(".sidebar a");

for (let i of sidebar) {
  i.addEventListener("click", () => {
    removeSidebar();
    i.classList.add("active");
  });
}

function removeSidebar() {
  for (let i of sidebar) {
    i.classList.remove("active");
  }
}

//------------------------------------------------------------------------------------------->
//For SideBar
//------------------------------------------------------------------------------------------->

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");
const modal = document.querySelector(".modals");
const modal2 = document.querySelector(".modal-II");
const adminName=document.getElementById('admin_name');
const logout=document.getElementById('log_out');
const adminImg=document.getElementById('admin_img');

adminImg.src=localStorage.getItem('userImage');

logout.addEventListener('click',()=>{
  window.location.href="../auth/login.html";
})

adminName.innerText=localStorage.getItem('adminName') || 'Admin'

menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

//https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png

//------------------------------------------------------------------------------------------->
//change theme from light to dark and vice versa
//------------------------------------------------------------------------------------------->

themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});

//------------------------------------------------------------------------------------------->
//Now to append data from backend to server
//------------------------------------------------------------------------------------------->

let URL = "https://639ad46531877e43d677befe.mockapi.io/optimumfitness/users";
let tbody = document.getElementById("tbody");

async function getUsers(p = 1) {
  try {
    let res = await fetch(`${URL}?page=${p}&limit=5`);
    if (res.ok) {
      let users = await res.json();

      let userArr = users.map((el) => {
        if (el.admin == undefined) {
          let email = el.email;
          let name = el.username;
          let gender = el.gender;
          let height = `${el.height[0]} ft ${el.height[1]} in`;
          let weight = `${el.weight} kg`;
          let id = el.id;
          let className;
          el.gender === "male"
            ? (className = "success")
            : (className = "danger");

          return renderUsers(
            email,
            name,
            gender,
            height,
            weight,
            className,
            id
          );
        }
      });

      tbody.innerHTML = userArr.join("");

      let details = document.querySelectorAll(".details");

      for (let i of details) {
        i.addEventListener("click", (e) => {
          let dataId = e.target.dataset.id;
          setTimeout(() => {
            modal.style.display = "flex";
          }, 1000);
          getIndividualUser(dataId);
        });
      }
    } else {
      console.log(`The server responded with ${res.status} error`);
    }
  } catch (error) {
    console.log(error);
  }
}

function renderUsers(email, username, gender, height, weight, className, id) {
  return `
  <tr>
    <td>${email}</td>
    <td >${username}</td>
    <td class=${className}>${gender}</td>
    <td>${height}</td>
    <td class="warning">${weight}</td>
    <td class="primary pnt details" data-id=${id}>Details</td>
  </tr>
  `;
}

//------------------------------------------------------------------------------------------->
//Now appending the latest user data
//------------------------------------------------------------------------------------------->

async function latestUser() {
  try {
    let res = await fetch(`${URL}?page=1&limit=5`);

    if (res.ok) {
      let data = await res.json();

      let userArr = data.map((el) => {
        if (el.admin === undefined) {
          let avatar = el.avatar;
          let username = el.username;
          let f = el.height[0] * 30.48;
          let j = el.height[1] * 2.54;
          let cm = f + j;
          let m = cm / 100;
          let weight = el.weight;
          let bmi = parseInt(weight / m ** 2);
          let status;
          let color;
          if (bmi < 18.5) {
            status = "Underweight";
            color = `style="stroke: #7380ec;   stroke-dashoffset: calc(440 - (440*${bmi}/100));
            "`;
          } else if (bmi <= 24.9) {
            status = "Normal";
            color = `style="stroke: #41f1b6;   stroke-dashoffset: calc(440 - (440*${bmi}/100));
            "`;
          } else if (bmi <= 29.9) {
            status = "Overweight";
            color = `style="stroke: orange;   stroke-dashoffset: calc(440 - (440*${bmi}/100));
            "`;
          } else {
            status = "Obese";
            color = `style="stroke: red;   stroke-dashoffset: calc(440 - (440*${bmi}/100));
            "`;
          }

          return renderLatestUsers(avatar, username, status, color, bmi);
        }
      });

      let latest = document.getElementById("latest");
      latest.innerHTML = userArr.join("");
    } else {
      `The Mock Server Responded With ${res.status} error`;
    }
  } catch (err) {
    console.log(err);
  }
}

function renderLatestUsers(avatar, username, status, color, bmi) {
  return `
  <div class="income">
  <img src=${avatar} alt="img">

  <div class="middle">
      <div class="left">
          <h3 class="ble">@${username}</h3>
          <h2>${status}</h2>

      </div>
      <div class="progress">
          <svg>
              <circle cx="38" cy="38" r="36"></circle>
              <circle ${color} cx="38" cy="38" r="36"></circle>
          </svg>
          <div class="number">
              <p>${bmi}%</p>
          </div>
      </div>
  </div>
  <small class="text-muted">Last 24 Hours</small>
</div>
  `;
}

//------------------------------------------------------------------------------------------->
//Now Appending Admin data
//------------------------------------------------------------------------------------------->

async function adminData() {
  try {
    let res = await fetch(URL);
    let data = await res.json();

    let userArr = data.map((el) => {
      if (el.admin !== undefined && el.username!=localStorage.getItem('adminName')) {
        let image = el.avatar;
        let name = el.username;
        let email = el.email;

        return renderAdmin(image, name, email);
      }
    });

    let admins = document.querySelector(".updates");
    admins.innerHTML = userArr.join("");
  } catch (err) {
    console.log(err);
  }
}

function renderAdmin(image, username, email) {
  return `
  <div class="update">
  <div class="profile-photo">
      <img src=${image}
          alt="">
  </div>
  <div class="message">
      <p><b class="ble">@${username}</b></p>
      <p>${email}</p>
  </div>
</div>
  `;
}

///------------------------------------------------------------------------------------------->
//Now for Pagination
//------------------------------------------------------------------------------------------->

async function pagination() {
  let res = await fetch(URL);
  let data = await res.json();
  renderPaginationBtn(data.length);
}

function renderPaginationBtn(x) {
  let totalBtn = Math.ceil(x / 5);

  function listOfBtn() {
    let btnArr = [];

    for (let i = 1; i <= totalBtn; i++) {
      btnArr.push(getAsButton(i));
    }

    return btnArr.join("");
  }

  let paginationWrapper = document.getElementById("pagination_wrapper");

  paginationWrapper.innerHTML = `
  <div class="pagination">
  ${listOfBtn()}
  </div>
  `;

  let allBtn = document.querySelectorAll(".pgn-btn");
  allBtn[0].classList.add("active");

  for (let i of allBtn) {
    i.addEventListener("click", (el) => {
      let dataId = el.target.dataset.id;
      getUsers(dataId);
      removeClass();
      i.classList.add("active");
    });
  }

  function removeClass() {
    for (let i of allBtn) {
      i.classList.remove("active");
    }
  }
}

function getAsButton(dataId) {
  return `<button class="pgn-btn" ${
    dataId ? `data-id = ${dataId}` : ""
  } >${dataId}</button>`;
}

//------------------------------------------------------------------------------------------->
// for appending individual user after click
//------------------------------------------------------------------------------------------->

async function getIndividualUser(n) {
  let res = await fetch(`${URL}/${n}`);
  let data = await res.json();

  let avatar = data.avatar;
  let username = data.username;
  let f = data.height[0] * 30.48;
  let j = data.height[1] * 2.54;
  let cm = f + j;
  let m = cm / 100;
  let weight = data.weight;
  let bmi = parseInt(weight / m ** 2);
  let status;
  let color;
  if (bmi < 18.5) {
    status = "Underweight";
    color = `style="stroke: #7380ec;   stroke-dashoffset: calc(440 - (440*${bmi}/100));
            "`;
  } else if (bmi <= 24.9) {
    status = "Normal";
    color = `style="stroke: #41f1b6;   stroke-dashoffset: calc(440 - (440*${bmi}/100));
            "`;
  } else if (bmi <= 29.9) {
    status = "Overweight";
    color = `style="stroke: orange;   stroke-dashoffset: calc(440 - (440*${bmi}/100));
            "`;
  } else {
    status = "Obese";
    color = `style="stroke: red;   stroke-dashoffset: calc(440 - (440*${bmi}/100));
            "`;
  }

  let modalBox = document.getElementById("modals_box");
  modalBox.innerHTML = renderLatestUsers(avatar, username, status, color, bmi);
}

//------------------------------------------------------------------------------------------->
//Appending all the user data for further action
//------------------------------------------------------------------------------------------->

async function appendUsers() {
  let res = await fetch(URL);
  let data = await res.json();
  sortTheData(data);

  //------------------------------------------------------------------------------------------->
  //Now the sorting data
  //------------------------------------------------------------------------------------------->

  let sortName = document.getElementById("sortName");

  sortName.addEventListener("change", () => {
    if (sortName.value === "asc") {
      data.sort((a, b) => {
        const nameA = a.username.toUpperCase();
        const nameB = b.username.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });

      sortTheData(data);
    } else if (sortName.value === "dsc") {
      data.sort((a, b) => {
        const nameA = a.username.toUpperCase();
        const nameB = b.username.toUpperCase();

        if (nameA > nameB) {
          return -1;
        }

        if (nameA < nameB) {
          return 1;
        }

        return 0;
      });
      sortTheData(data);
    } else {
      appendUsers();
    }
  });

  //------------------------------------------------------------------------------------------->
  //sorting by weight
  //------------------------------------------------------------------------------------------->

  let sortWeight = document.getElementById("sortWeight");
  sortWeight.addEventListener("change", () => {
    if (sortWeight.value === "asc") {
      data.sort((a, b) => {
        return a.weight - b.weight;
      });
      sortTheData(data);
    } else if (sortWeight.value === "dsc") {
      data.sort((a, b) => {
        return b.weight - a.weight;
      });
      sortTheData(data);
    } else {
      appendUsers();
    }
  });
}

function sortTheData(data) {
  let dataArr = data.map((el) => {
    if (el.admin === undefined) {
      let image = el.avatar;
      let email = el.email;
      let username = el.username;
      let height = `${el.height[0]} ft ${el.height[1]} in`;
      let weight = el.weight;
      let id = el.id;

      return renderData(image, email, username, height, weight, id);
    }
  });

  let userTbody = document.getElementById("users_tbody");

  userTbody.innerHTML = dataArr.join("");

  const edit = document.querySelectorAll(".edit");
  const deleteD = document.querySelectorAll(".delete");

  for (let i of edit) {
    i.addEventListener("click", (e) => {
      let dataId = e.target.dataset.id;

      setTimeout(() => {
        modal2.style.display = "flex";
      }, 1000);

      openUser(dataId);
    });
  }

  for (let i of deleteD) {
    i.addEventListener("click", (e) => {
      let dataId = e.target.dataset.id;
      deleteUser(dataId);
    });
  }
}

function renderData(image, email, username, height, weight, id) {
  return `
  <tr>
  <td><img class="img" src=${image} alt=""></td>
  <td >${email}</td>
  <td class="primary">${username}</td>
  <td>${height}</td>
  <td>${weight}</td>
  <td class="edit pnt" data-id=${id}>Edit</td>
  <td class="delete pnt" data-id=${id}>Delete</td>
</tr>
  `;
}

//------------------------------------------------------------------------------------------->
//Sidebar Additional settings
//------------------------------------------------------------------------------------------->

const sideUser = document.getElementById("side_user");
const sideDash = document.getElementById("side_dash");
const mainDash = document.getElementById("main_dash");
const usersMain = document.getElementById("users_main");

sideUser.addEventListener("click", () => {
  mainDash.style.display = "none";
  usersMain.style.display = "block";
});

sideDash.addEventListener("click", () => {
  mainDash.style.display = "block";
  usersMain.style.display = "none";
});

//------------------------------------------------------------------------------------------->
//change users
//------------------------------------------------------------------------------------------->

async function openUser(n) {
  let res = await fetch(`${URL}/${n}`);
  let data = await res.json();

  let email = data.email;
  let username = data.username;
  let pass = data.password;
  let id = data.id;

  modal2.innerHTML = renderInput(email, username, pass, id);

  let chgBtn = document.getElementById("put_btn");

  chgBtn.addEventListener("click", async (e) => {
    let dataId = e.target.dataset.id;
    let username = document.getElementById("chg_username").value;
    let password = document.getElementById("chg_pass").value;

    console.log(dataId);

    let obj = {
      username,
      password,
    };

    let res = await fetch(`${URL}/${dataId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (res.ok) {
      alert("User data has been successfully changed");
      modal2.style.display = "none";
      appendUsers();
      getUsers();
    }
  });
}

function renderInput(email, username, pass, id) {
  return `
  <div>
  <div>                
      <h2>Email</h2>
      <input type="text" value=${email} readonly>
  </div>
  <div>                
      <h2>Username</h2>
      <input id="chg_username" type="text" value=${username}>
  </div>
  <div>                
      <h2>Password</h2>
      <input id="chg_pass" type="text" value=${pass}>
  </div>
  <button class="chg-btn" id="put_btn" data-id=${id}><b> DONE</b></button>
</div>
  `;
}

async function deleteUser(n) {
  alert("Are you sure you want to delete this user");

  let res = await fetch(`${URL}/${n}`, {
    method: "DELETE",
  });

  if (res.ok) {
    alert("User has been successfully deleted");
    appendUsers();
    getUsers();
  }
}

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }

  if (e.target == modal2) {
    modal2.style.display = "none";
  }
};
