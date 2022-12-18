let getSidebar = document.querySelector('nav');
let getToggle = document.getElementsByClassName('toggle');
for (let i = 0; i <= getToggle.length; i++) {
    getToggle[i].addEventListener('click', function () {
        getSidebar.classList.toggle('active');
    });
}

let username = document.getElementById("username")
username.innerText = localStorage.getItem("username")

let username_img = document.getElementById("userImage")
username_img.src = localStorage.getItem("userImage")

