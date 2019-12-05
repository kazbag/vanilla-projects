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

const menu = document.querySelector('.menu-nav')
const hamburger = document.querySelector('.hamburger')

const toggleNav = () => {
    menu.classList.toggle('menu-nav--visible')
}
hamburger.addEventListener('click', toggleNav)