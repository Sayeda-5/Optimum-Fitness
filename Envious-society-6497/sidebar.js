let getSidebar = document.querySelector('nav');
let getToggle = document.getElementsByClassName('toggle');
for (let i = 0; i <= getToggle.length; i++) {
    getToggle[i].addEventListener('click', function () {
        getSidebar.classList.toggle('active');
    });
}

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


