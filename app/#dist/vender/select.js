'use strict'

document.addEventListener('DOMContentLoaded', function () {

  const selectWrapper = document.querySelector('.form__item_select_wrapper');
  const select = document.querySelector('select');
  if (select !== null) {
    select.addEventListener('blur', () => selectEvent());
    select.addEventListener('click', () => selectEvent());
  }

  function selectEvent() {
    if (window.event.type == 'click') {
      if (select.classList.contains('__active')) {
        select.classList.remove('__active');
        selectWrapper.classList.remove('__active');
      } else {
        select.classList.add('__active');
        selectWrapper.classList.add('__active');
      }
    }
    if (window.event.type == 'blur') {
      select.classList.remove('__active');
      selectWrapper.classList.remove('__active');
    }
  };

});