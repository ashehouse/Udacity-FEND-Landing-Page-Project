// Start Global Variables

const NAVBARLIST = document.querySelector('#navbar__list');

const SECTIONS = document.querySelectorAll('section');

const TOTOPBUTTON = document.getElementById('backToTop');

const HEADINGS = document.querySelectorAll('h2');




// Check if something is in view
const isInViewport = (elem) => {
    let bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// build the nav

let nav = '';

for (let i = 0; i < SECTIONS.length; i++) {
    nav += `<li class = "menu__link" data-target = "#${SECTIONS[i].id}">${SECTIONS[i].dataset.nav}</li>`
}

NAVBARLIST.insertAdjacentHTML('beforeend', nav);

const navLinks = document.querySelectorAll('.menu__link');

const menuArea = document.querySelector('header');


// Scroll to top button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'});
}

document.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    TOTOPBUTTON.style.display = "block";
  } else {
    TOTOPBUTTON.style.display = "none";
  };
}

// Open and close section
HEADINGS.forEach(ele => {
    let target = ele.nextElementSibling;
    let btn = ele.querySelector('button');   
    btn.onclick = () => {
    if (target.style.maxHeight){
        target.style.maxHeight = null;
      } else {
        target.style.maxHeight = target.scrollHeight + "px";
      };
    };
})

// Hide menu whe not scrolling
var isScrolling 

window.addEventListener('scroll', () =>{
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() =>{
        menuArea.classList.add('isHidden')
    }, 2000)
}, false)


// Add special class to SECTIONS that are active/inView
SECTIONS.forEach(ele => {
    (window.addEventListener('scroll', () => {
        menuArea.classList.remove('isHidden');
        let navTarget = document.querySelector(`[data-target="#${ele.id}"]`);
        if (isInViewport(ele)) {
            navTarget.classList.add('active');
            ele.classList.add('active-class');
        } else {
            ele.classList.remove('active-class');
            navTarget.classList.remove('active');
        };
    }));
})

// Scroll to anchor ID using scrollTO event
navLinks.forEach(el => {
    el.addEventListener('click', () => {
    let target = document.querySelector(el.getAttribute('data-target'));
    target.scrollIntoView({behavior: 'smooth'});
    })
})