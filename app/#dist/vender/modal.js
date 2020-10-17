'use strict'

const body = document.querySelector('body');

const modalBtn = document.querySelectorAll('[data-toggle]');
modalBtn.forEach(function (open) {
  open.addEventListener('click', modalBtnSend);
})

const modalBtnClose = document.querySelectorAll('[data-dismiss]');
modalBtnClose.forEach(function (close) {
  close.addEventListener('click', modalClose);
})


async function modalBtnSend(evt) {

  evt = evt || window.event;
  const target = evt.target;

  evt.preventDefault();

  if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
    if (target.hasAttribute('data-target')) {
      const nameID = target.getAttribute('data-target');
      document
        .getElementById(nameID)
        .classList
        .add('__open');
      body
        .classList
        .add('lock');
    }
  }

}

async function modalClose(evt) {

  evt = evt || window.event;
  const target = evt.target;

  evt.preventDefault();

  if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal')) {
    const modal = document.querySelector('[class="modal __open"]');
    modal
      .classList
      .remove('__open');
    body
      .classList
      .remove('lock');
  }

}