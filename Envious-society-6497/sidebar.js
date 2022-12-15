let getSidebar = document.querySelector('nav');
let getToggle = document.getElementsByClassName('toggle');
for (let i = 0; i <= getToggle.length; i++) {
    getToggle[i].addEventListener('click', function () {
        getSidebar.classList.toggle('active');
    });
}
