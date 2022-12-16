
signin = document.querySelector("#signin")
register = document.querySelector("#resgister")
loader = document.querySelector("#loader")
main = document.querySelector("#main")
about = document.querySelector(".navbar-link")




signin.addEventListener("click",()=>{
    main.style.display="none"
    loader.style.display="flex"
    setTimeout(()=>{
        location.href="auth\login.html"
    },1000)
})


about.addEventListener("click",()=>{
    main.style.display="none"
    loader.style.display="flex"
    setTimeout(()=>{
        location.href="./about.html"
    },1000)
})