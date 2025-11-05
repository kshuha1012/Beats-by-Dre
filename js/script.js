'use strict';
// Header
const header = document.getElementById('header');

// Navbar
const nav = document.querySelector('.navbar');

// Modals
const searchModal = document.querySelector('.modal__search');
const cartModal = document.querySelector('.modal__cart');
const contactModal = document.querySelector('.modal__contact');
const btnCloseSearchModal = document.querySelector('.modal__search-close');
const btnCloseCartModal = document.querySelector('.modal__cart-close');
const btnCloseContactModal = document.querySelector('.modal__contact-close');
const btnsOpenModals = document.querySelectorAll('.features__link');

// Detail headphone
const detailHeadphone = document.querySelector('.detail__features');

// Overlay
const backdrop = document.querySelector('.overlay');

// Sidebar
const sidebar = document.querySelector('.sidebar');

// SidebarList
const sidebarList = document.querySelector('.sidebar__list');

// Sidebar overlay
const sidebarBackdrop = document.querySelector('.sidebar__overlay');

// sidebar close button
const closeSidebarBtn = document.querySelector('.sidebar__close');

// Hamburger Tab
const hamburgerTab = document.querySelector('.hamburger__tab');

// btn purchase
const purchaseBtn = document.querySelector('.purchase');

// Scroll up button
const scrollToUp = document.querySelector('.scroll-up');

// section-1
const section1 = document.getElementById('section--1');

///////////////////////////////////////////////////////////
// Modal functions
const openModal = function (e) {
  e.preventDefault();
  const parentEl = this.closest('.features__item');

  if (parentEl.getAttribute('id') === 'search') {
    searchModal.classList.remove('hidden');
  }
  if (parentEl.getAttribute('id') === 'cart') {
    cartModal.classList.remove('hidden');
  }
  if (parentEl.getAttribute('id') === 'contact') {
    contactModal.classList.remove('hidden');
  }

  backdrop.classList.remove('hidden');
};

const openSearchModal = function (e) {
  [searchModal, backdrop].forEach((el) => el.classList.remove('hidden'));
};

btnsOpenModals.forEach((btn) => btn.addEventListener('click', openModal));

const closeModal = function (e) {
  [searchModal, cartModal, contactModal, backdrop].forEach((modal) =>
    modal.classList.add('hidden')
  );
};

[
  btnCloseSearchModal,
  backdrop,
  btnCloseCartModal,
  btnCloseContactModal,
].forEach((el) => el.addEventListener('click', closeModal));

// keyboard events
document.addEventListener('keydown', function (e) {
  if (e.keyCode === 90 && e.ctrlKey) {
    openSearchModal();
  }

  if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
    closeModal();
  }
  if (e.key === 'Escape' && !cartModal.classList.contains('hidden')) {
    closeModal();
  }
  if (e.key === 'Escape' && !contactModal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////
// Sidebar functions
// open sidebar
const openSidebar = function (e) {
  sidebar.classList.remove('sidebar__move');
  sidebarBackdrop.classList.remove('hidden');
};

hamburgerTab.addEventListener('click', openSidebar);

// close sidebar
const closeSidebar = function (e) {
  sidebar.classList.add('sidebar__move');
  sidebarBackdrop.classList.add('hidden');
};

[sidebarBackdrop, closeSidebarBtn].forEach((el) =>
  el.addEventListener('click', closeSidebar)
);

//////////////////////////////////////////////
// Button Scrolling
purchaseBtn.addEventListener('click', function (e) {
  // const s2coords = detailHeadphone.getBoundingClientRect();
  // console.log(s2coords);
  // console.log('Current scroll X/Y:', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'Height/width viewport:',
  //   document.documentElement.clientWidth,
  //   document.documentElement.clientHeight
  // );

  // window.scrollTo({
  //   top: s2coords.top + window.pageYOffset,
  //   left: s2coords.left + window.pageXOffset,
  //   behavior: 'smooth',
  // });

  detailHeadphone.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////////////
// Scroll Up
window.addEventListener('scroll', function (e) {
  window.pageYOffset > 270
    ? scrollToUp.classList.remove('scroll-up--hidden')
    : scrollToUp.classList.add('scroll-up--hidden');
});

scrollToUp.addEventListener('click', function (e) {
  header.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////
// Page navigation
// document.querySelectorAll('.sidebar__link').forEach(function (link) {
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     closeSidebar();
//   });
// });

// Event delegation
sidebarList.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('sidebar__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    closeSidebar();
  }
});

///////////////////////////////////////////
// Fade animation
const handleOver = function (e) {
  if (e.target.classList.contains('sidebar__link')) {
    const link = e.target;
    const siblings = link
      .closest('.sidebar__list')
      .querySelectorAll('.sidebar__link');

    siblings.forEach((el) => {
      if (link != el) {
        el.style.opacity = this;
      }
    });
  }
};

sidebarList.addEventListener('mouseover', handleOver.bind(0.5));
sidebarList.addEventListener('mouseout', handleOver.bind(1));

///////////////////////////////////////////////////////////
// Tabbed components
const lastProducts = document.querySelector('.last__products');
const detailImg = document.querySelector('.detail__img');
const projectLink = location.origin;

lastProducts.addEventListener('click', function (e) {
  const dataTab = e.target.dataset.tab;
  if (e.target.classList.contains(`last__product--img-${dataTab}`)) {
    const currentImg = e.target;
    const siblings = currentImg
      .closest('.last__products--main')
      .querySelectorAll('.last__product--img');

    if (detailImg.src !== `${projectLink}/images/last-product-${dataTab}.png`) {
      currentImg.src = `images/last-detail-headphone.png`;
      detailImg.src = `images/last-product-${dataTab}.png`;
    } else if (
      currentImg.src === `${projectLink}/images/last-detail-headphone.png`
    ) {
      currentImg.src = `images/last-product-${dataTab}.png`;
      detailImg.src = `images/last-detail-headphone.png`;
    }

    siblings.forEach((el, i) => {
      if (el !== currentImg) {
        el.src = `images/last-product-${i + 1}.png`;
      }
    });
  }
});

///////////////////////////////////////////////////
// Added to cart
const cartProducts = document.querySelector('.modal__cart--products');
const productsCartArray = [];

document.querySelectorAll('.last__icon--cart-icon').forEach((el) => {
  el.addEventListener('click', (e) => {
    cartProducts.innerHTML = '';
    const dataCart = e.target.dataset.cart;

    //Image
    const image = document.querySelector(`.last__product--img-${dataCart}`);
    const cloneImage = image.cloneNode(true);
    cloneImage.className = '';
    cloneImage.classList.add('last__product--img');

    // Price
    const price = document.querySelector(`.last__product--price-${dataCart}`);
    const clonePrice = price.cloneNode(true);
    clonePrice.className = '';

    // Name
    const name = document.querySelector(`.last__product--name-${dataCart}`);
    const cloneName = name.cloneNode(true);
    cloneName.classList = '';

    // CheckingExistingProduct
    const checkingProductsArray = productsCartArray.find((el) => {
      return el.cloneImage.currentSrc === cloneImage.currentSrc ? true : false;
    });

    if (!checkingProductsArray) {
      productsCartArray.push({ cloneImage, clonePrice, cloneName });
    }

    console.log(productsCartArray);

    productsCartArray.forEach((obj) => {
      const html = `
        <div class='modal__cart--product'>
          <img src="${obj.cloneImage.currentSrc}" class="${obj.cloneImage.className}" alt="${obj.cloneImage.alt}" />
          <p class="modal__cart-product-price font__18">${obj.clonePrice.innerText}</p>
          <p class="modal__cart-product-name font__18">${obj.cloneName.innerText}</p>
          <button class="modal__cart--product-btn font__24">&times;</button>
        </div>
      `;

      cartProducts.insertAdjacentHTML('beforeend', html);
    });
  });
});

///////////////////////////////////////////
// Sticky navigation
/*
const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

// IntersectionObserver
const obsCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    console.log(entry.target);
  }
  observer.unobserve(entry.target);
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: '20px',
};

const observation = new IntersectionObserver(obsCallback, obsOptions);
observation.observe(section1);
*/

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight + 10}px`,
});

headerObserver.observe(header);

////////////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////////
// Lazy loading images
const allImages = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.6,
});

allImages.forEach((img) => imgObserver.observe(img));

// Lazy collection images
const collectImages = document.querySelectorAll('.collection');

const collectImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('lazy-img');
  observer.unobserve(entry.target);
};

const collectImgObserver = new IntersectionObserver(collectImg, {
  root: null,
  threshold: 0.6,
});

collectImages.forEach((img) => collectImgObserver.observe(img));

/////////////////////////////////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll('li[data-list]');
  const btnLeft = document.querySelector('.last__collection--larr');
  const btnRight = document.querySelector('.last__collection--rarr');
  const dotsSlider = document.querySelector('.dots');

  const curSlide = 0;
  const maxSlide = [...slides].length;

  const slideIndex = []; // 0, 1, 2
  for (let i = curSlide; i < maxSlide; i++) {
    slideIndex.push(i);
  }

  // Slider functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotsSlider.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i + 1}></button>`
      );
    });
  };

  const activateDot = function (slide = 2) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const findActiveSlide = function () {
    slides.forEach((s) => {
      if (s.classList.contains('last__collection-item--2')) {
        const activeSlide = s.dataset.list;
        activateDot(activeSlide);
      }
    });
  };

  const moveSlide = function (slideInd) {
    slideInd.forEach((item, index) => {
      document.querySelector('.last__collection-imgs').children[
        index
      ].className = `last__collection-img--sub last__collection-img last__collection-item--${
        item + 1
      }`;
    });
  };

  const nextSlide = function (e) {
    slideIndex.unshift(slideIndex.pop()); // 2, 0, 1

    moveSlide(slideIndex);
    findActiveSlide();
  };

  const prevSlide = function (e) {
    slideIndex.push(slideIndex.shift());

    moveSlide(slideIndex);
    findActiveSlide();
  };

  const init = function () {
    createDots();
    activateDot();
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });
};

slider();

//1 Traversing downwards
// parent
// const featureList = document.querySelector('.features__list');  element node
// child
// const featureItems = featureList.querySelectorAll('.features__item');
// const featureItems = featureList.children;
// console.log(featureItems);

// 2 Traversing upwards
// child
// const logo = document.querySelector('a[href="/"]');
// parent
// const navbar = logo.parentElement;
// ancestor
// const header = logo.closest('#header');
// console.log(header);

// 3 Traversing sideways
// const first = document.querySelector('.price__product--current');
// const last = document.querySelector('.price__product--last');

// const nextSibling = first.nextElementSibling;
// console.log(nextSibling, last);

// const prevSibling = last.previousElementSibling
// console.log(prevSibling, first);

// parent
// const parent = document.querySelector('.price__product');
// const children = parent.children;
// const first = parent.children[0];
// const second = parent.children[1];
// console.log(first, second);

// const sibling = first.parentElement.children[1];
// console.log(sibling);
