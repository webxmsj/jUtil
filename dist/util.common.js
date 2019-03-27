
/*!
 * Util.js - v0.0.1
 * 
 * undefined
 *
 * Copyright (c) 2018 
 * Released under ISC License
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var U = function U(selector, context) {
  return new U.fn.init(selector, context);
};

U.extend(U.fn);
window.U = U;

exports.U = U;
