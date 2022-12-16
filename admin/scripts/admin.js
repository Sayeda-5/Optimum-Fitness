window.onload = () => {
  let loader = document.getElementById("loader");
  let adminMain = document.getElementById("admin_main");

  setTimeout(()=>{
    loader.style.display='none';
    adminMain.style.display='block';
  },1000)
};
