'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////LECTURE

//SELECTING ELEMENTS
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//CREATING AND INSERTING ELEMENTS
//insertAdjacentHTML -> creates HTML elements

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message); // adds as first child
header.append(message); //add as last child
//will only be inserted once, is live in the dom so can not be in two places at once

//header.append(message.cloneNode(true)) //way to clone message to appear in two places

//header.before(message);
//header.after(message);

//DELETE ELEMENTS
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    //message.parentElement.removecchild(message) -> old way
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(getComputedStyle(message).color); // -> real style as appears on page eveen if not declared on CSS
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

// Atributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
logo.aalt = 'Beautiful minimalist logo';
console.log(logo.className);
//non-standard
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.getAttribute('src'));
console.log(logo.src);

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'l');
logo.classList.remove('c');
logo.classList.toggle('cc');
logo.classList.contains('c');

// Smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords); //coordiantes of the window
  console.log(e.target.getBoundingClientRect());
  console.log('current scroll X/Y', window.pageXOffset, window.pageYOffset); //gives pixels of amount already scrolled
  //Scrolling
  //window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top +  window.pageYOffset);

  // specify an object to creaate smooth scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // }); -> old way of doing it
  section1.scrollIntoView({ behavior: 'smooth' }); // new way supported in modern browsers
});

// EVENTS

const h1 = document.querySelector('h1');

// use addeventlistener because ccan add multiple events and remove events

const alertH1 = function (e) {
  alert('onmouseenter: heading');
  //h1.removeEventListener('mouseenter', alertH1)
};

//h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1, 3000)); //remove event listener after 3 seconds

// Bubbling

//rgb(255,255,255);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  //this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, 'current target', e.currentTarget);
  console.group(e.currentTarget === this); // returns true

  //stop event propagation
  //e.stopPropagation(); -> not usually used
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    //this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  },
  false
); // third parameter true listens not to bubbling events but to capturing events

// Event Delegation
// Page navigation

// Without event delegation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   });
// });

// with event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//DOM traversing
//selecting child selectors

console.log(h1.querySelectorAll('.highlight'));
//direct children
console.log(h1.childNodes);
console.log(h1.children);
//h1.firstElementChild.style.color = 'white';
//h1.lastElementChild.style.color = 'orangered';

// selecting parent nodes
console.log(h1.parentNode);
console.log(h1.parentElement);

//h1.closest('.header').style.background = 'var(--gradient-secondary';

//h1.closest('h1').style.background = 'var(--gradient-primary)';

// siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el === h1) el.style.transform = 'scale(0.5)';
});

// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

//tabs.forEach(t => t.addEvent('click', () => console.log('TAB'))); -> bad practice because creates operations over and over

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //guard clause
  if (!clicked) return;
  //active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operatioss__tab--active');

  //activate content area
  document.querySelector(
    `.operations__content--${clicked.dataset.tab}`.classList.add(
      'operations__content--active'
    )
  );
});

//menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
    // this is opacity
  }
};

const nav = document.querySelector('.nav');

// first solution
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// better solution

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// Scroll event is not very efficient & should be avoided
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function(){
//   console.log(window.scrollY);

//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

//const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect();
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; // same as entries[0]
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
  // rootMargin: `-${navHeight}px`doesn't work but should
});

headerObserver.observe(header);

// Reveal sections

//const allSections = document.querySelectorAll('.section'),

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  //replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// SLIDER
// put slides side by side

const slider = function() {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

//make slider appear while building it
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';


const init = function() {
  goToSlide();
  createDots();
  activateDot();
}

//functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
  // 0%, 100%, 200%, 300%
};
goToSlide(0);

//going to the next slide by changing the property
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset; // destructing using {} because data.slice == {slide};
    goToSlide(slide);
    activateDot(slide);
  }
});
};
slider();

// LIFECYCLE DOM EVENTS

document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree built', e);
})

window.addEventListener('load', function(e){
  console.log("page fully loaded", e);
});

//ask user if they are sure they want to leave the page
// to work, user has to interact with the page
window.addEventListener('beforeunload', function(e) {
  e.preventDefault() // not necessary in chrome
  console.log(e);
  e.returnValue = '';
});
