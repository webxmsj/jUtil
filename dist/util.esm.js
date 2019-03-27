
/*!
 * Util.js - v0.0.1
 * 
 * undefined
 *
 * Copyright (c) 2018 
 * Released under ISC License
 */

var U = function U(selector, context) {
  return new U.fn.init(selector, context);
};

U.extend(U.fn);
window.U = U;

export { U };
