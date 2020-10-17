'use stict';

function Route(name, htmlName, defaultRoute) {
  try {
    if (!name || !htmlName) {
      throw 'error: параметры name и htmlName являются обязательными';
    }
    this.constructor(name, htmlName, defaultRoute);
  } catch (e) {
    console.error(e);
  }
}

Route.prototype = {
  name: undefined,
  htmlName: undefined,
  default: undefined,
  constructor: function (name, htmlName, defaultRoute) {
    this.name = name;
    this.htmlName = htmlName;
    this.default = defaultRoute;
  },
  isActiveRoute: function (hashedPath) {
    return hashedPath.replace('#', '') === this.name;
  }
}