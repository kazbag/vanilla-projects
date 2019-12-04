AOS.init();
let navbar = document.querySelector('.nav')
let sticky = navbar.offsetTop
window.onscroll = () => {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add('sticky')
    }
    else
        navbar.classList.remove('sticky')
}