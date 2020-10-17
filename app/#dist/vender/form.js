'use strict'

document.addEventListener('DOMContentLoaded', function () {

  const form = document.getElementById('form');
  if (form !== null) {
    form.addEventListener('submit', formSend);
  }

  async function formSend(evt) {
    evt.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('image', formImage.files[0]);

    if (error === 0) {
      form.classList.add('__sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        let result = await response.json();
        // alert(result.message);
        Toast.add({
          text: result.message,
          color: '#008000',
        });
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('__sending');
      } else {
        // alert('Ошибка');
        Toast.add({
          text: 'Ошибка',
          color: '#ff0000',
        });
        form.classList.remove('__sending');
      }

    } else {
      // alert('Заполните обязательные поля');
      Toast.add({
        text: 'Заполните обязательные поля',
        color: '#ff0000',
      });
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.__req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('__email')) {
        if (emailCheck(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('__phone')) {
        if (phoneCheck(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('__error');
    input.classList.add('__error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('__error');
    input.classList.remove('__error');
  }
  function emailCheck(input) {
    return !/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  function phoneCheck(input) {
    return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
  }

  const formImage = document.getElementById('formImage');
  const formPreview = document.getElementById('formPreview');

  if (formImage !== null) {
    formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
    });
  }

  function uploadFile(file) {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      // alert('Разрешены только изображения');
      Toast.add({
        text: 'Разрешены только изображения',
        color: '#ff0000',
      });
      formImage.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      // alert('Файл должен быть менее 2 МБ');
      Toast.add({
        text: 'Файл должен быть менее 2 МБ',
        color: '#ff0000',
      });
      return;
    }

    let render = new FileReader();
    render.onload = function (evt) {
      formPreview.innerHTML = `<img src="${evt.target.result}" alt="Фото">`;
    };
    render.onerror = function (evt) {
      // alert('Ошибка');
      Toast.add({
        text: 'Ошибка',
        color: '#ff0000',
      });
    };
    render.readAsDataURL(file);
  }

});