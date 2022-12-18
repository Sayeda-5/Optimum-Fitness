let getSidebar = document.querySelector('nav');
let getToggle = document.getElementsByClassName('toggle');
for (let i = 0; i <= getToggle.length; i++) {
    getToggle[i].addEventListener('click', function () {
        getSidebar.classList.toggle('active');
    });
}

<<<<<<< HEAD
aboutus=document.querySelector("#aboutus")
drop=document.querySelector("#drop")
let ss=0

aboutus.addEventListener("click",()=>{
    if(ss==0){
        ss=1;
        drop.style.display="block"
    }
    else{
        ss=0
        drop.style.display="none"
    }
})
=======
let username = document.getElementById("username")
username.innerText = localStorage.getItem("username")
>>>>>>> b345f981dfe9fdc664d14f4bc2f49cac0c9a22e9

let username_img = document.getElementById("userImage")
username_img.src = localStorage.getItem("userImage")

