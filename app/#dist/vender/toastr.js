'use strict';

let Toast = function (element, config) {
  let
    _this = this,
    _element = element,
    _config = {
      autohide: true,
      delay: 5000
    };
  for (let prop in config) {
    _config[prop] = config[prop];
  }
  Object.defineProperty(this, 'element', {
    get: function () {
      return _element;
    }
  });
  Object.defineProperty(this, 'config', {
    get: function () {
      return _config;
    }
  });
  _element.addEventListener('click', function (e) {
    if (e.target.classList.contains('toast__close')) {
      _this.hide();
    }
  });
}

Toast.prototype = {
  show: function () {
    let _this = this;
    this.element.classList.add('toast_show');
    if (this.config.autohide) {
      setTimeout(function () {
        _this.hide();
      }, this.config.delay)
    }
  },
  hide: function () {
    let event = new CustomEvent('hidden.toast', { detail: { toast: this.element } });
    this.element.classList.remove('toast_show');
    document.dispatchEvent(event);
  }
};

Toast.create = function (text, color) {
  let
    fragment = document.createDocumentFragment(),
    toast = document.createElement('div'),
    toastClose = document.createElement('button');
  toast.classList.add('toast');
  toast.style.backgroundColor = 'rgba(' + parseInt(color.substr(1, 2), 16) + ',' + parseInt(color.substr(3, 2), 16) + ',' + parseInt(color.substr(5, 2), 16) + ',0.5)';
  toast.textContent = text;
  toastClose.classList.add('toast__close');
  toastClose.setAttribute('type', 'button');
  toastClose.textContent = '×';
  toast.appendChild(toastClose);
  fragment.appendChild(toast);
  return fragment;
};

Toast.add = function (params) {
  let config = {
    text: 'Текст сообщения...',
    color: '#ffffff',
    autohide: true,
    delay: 5000
  };
  if (params !== undefined) {
    for (let item in params) {
      config[item] = params[item];
    }
  }
  if (!document.querySelector('.toasts')) {
    let container = document.createElement('div');
    container.classList.add('toasts');
    container.style.cssText = 'position: fixed; top: 15px; right: 15px; width: 250px;';
    document.body.appendChild(container);
  }
  document.querySelector('.toasts').appendChild(Toast.create(config.text, config.color));
  let toasts = document.querySelectorAll('.toast');
  let toast = new Toast(toasts[toasts.length - 1], { autohide: config.autohide, delay: config.delay });
  toast.show();
  return toast;
}

document.addEventListener('hidden.toast', function (e) {
  let element = e.detail.toast;
  if (element) {
    element.parentNode.removeChild(element);
  }
});

  // Toast.add({
    // text: 'Текст сообщения...',
    // color: '#ff0000',
    // autohide: document.querySelector('[name="autohide"]').checked,
    // delay: parseInt(document.querySelector('[name="toast-delay"]').value)
  // });

