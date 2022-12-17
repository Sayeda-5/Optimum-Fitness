loader = document.querySelector("#loader")
main = document.querySelector("#main")
window.onload = () => {
    main.style.display="none"
    loader.style.display="flex"
    setTimeout(()=>{
        main.style.display="block"
        loader.style.display="none"
    },1000)
  };
  