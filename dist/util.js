
/*!
 * Util.js - v0.0.1
 * 
 * undefined
 *
 * Copyright (c) 2018 
 * Released under ISC License
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.util = {})));
}(this, (function (exports) { 'use strict';

  var U = function U(selector, context) {
    return new U.fn.init(selector, context);
  };

  U.extend(U.fn);
  window.U = U;

  exports.U = U;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
