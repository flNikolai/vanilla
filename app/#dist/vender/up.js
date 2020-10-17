'use strict';

document.addEventListener('DOMContentLoaded', function () {

  function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('to__top_show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('to__top_show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  let goTopBtn = document.querySelector('.to__top');
  if (goTopBtn !== null) {
    window.addEventListener('scroll', trackScroll);
    goTopBtn.addEventListener('click', backToTop);
  }

});