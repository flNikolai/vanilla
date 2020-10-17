'use strict';

document.addEventListener('DOMContentLoaded', function () {

  const humburger = document.querySelector('.humburger');
  const body = document.querySelector('body');
  if (humburger !== null) {
    humburger.onclick = () => {
      open()
    };
  }

  window.addEventListener('click', (evt) => {
    if (!humburger.contains(evt.target)) {
      close()
    }
  })

  function open() {
    humburger.classList.toggle("__active");
    // document.querySelector(".header__menu").classList.toggle("__active");
    body.classList.toggle("__active");
  }

  function close() {
    humburger.classList.remove("__active");
    body.classList.remove("__active");
  }

});