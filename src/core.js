/*
* @Author: xiaofei.meng_tic
* @Date:   2019-03-27 11:46:22
* @Last Modified by:   mengxiaofei
* @Last Modified time: 2019-03-28 11:17:07
*/
import U from './Util'
import {
    class2type,
    concat,
    containers,
    contains,
    document,
    emptyArray,
    filter,
    fragmentRE,
    isArray,
    methodAttributes,
    simpleSelectorRE,
    singleTagRE,
    slice,
    tagExpanderRE,
    tempParent
} from './vars';


U.fn = U.prototype = {
  constructor: U,
  length: 0,
  init: function(selector, context) {
    var dom
    if (!selector) { return this }
    // 如果是字符串
    else if (typeof selector === 'string') {
      selector = selector.trim()
      // 如果是 html 片段
      if (selector[0] === '<' && fragmentRE.test(selector)) {
        dom = U.fragment(selector, RegExp.$1, context)
        selector = null
      }
      // 如果存在上下文，采用上下文查找
      else if (context !== undefined) {
        return U(context).find(selector)
      }
      // 如果是 css 选择器
      else {
        dom = U.qsa(document, selector)
      }
    }
    // 如果是 函数
    else if (isFunction(selector)) {
      return D(document).ready(selector)
    }
    // 如果是 集合
    else if (isU(selector)) {
      return selector
    }
    // 如果是 节点数组
    else if (isArray(selector)) {
      dom = compact(selector)
    }
    // 包装 DOM 节点
    else if (isObject(selector)) {
      dom = [selector], selector = null
    }
    else if (context !== undefined) {
      return U(context).find(selector)
    }
    else {
      dom = U.qsa(document, selector)
    }
    return U.makeArray(dom, selector, this)
  },
  concat: function() {
    var i, value, args = []
    for (i = 0; i < arguments.length; i++) {
      value = arguments[i]
      args[i] = isU(value) ? value.toArray() : value
    }
    return concat.apply(isU(this) ? this.toArray() : this, args)
  },
  pluck: function(property) {
    return U.map(this, function(el) {return el[property]})
  },
  toArray: function() {
    return this.get()
  },
  get: function(idx) {
    return idx === undefined
      ? slice.call(this)
      : this[idx > 0 ? idx : idx + this.length]
  },
  size: function() {
    return this.length
  },
  each: function (callback) {
    emptyArray.every.call(this, function(el, idx) {
      return callback.call(el, idx, el) !== false
    })
    return this
  },
  map: function(fn) {
    return U(U.map(this, function (el, i) { return fn.call(el, i, el) }))
  },
  slice: function() {
    return U(slice.apply(this, arguments))
  },
  first: function() {
    var el = this[0]
    return el && !isObject(el) ? el : U(el)
  },
  last: function() {
    var el = this[this.length - 1]
    return el && !isObject(el) ? el : U(el)
  },
  eq: function(idx) {
    return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
  }
}

U.extend = U.fn.extend = function() {
  var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
  i = 1,
  length = arguments.length,
  deep = false;
  // 深度拷贝
  if (typeof target === 'boolean') {
    deep = target
    target = arguments[i] || {}
    i++
  }

  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }
  // 如果只 传一个参数  则扩展自身
  if (i === length) {
    target = this
    i--
  }

  for (; i < length; i ++) {
    if ((options = arguments[i]) != null) {
      // 扩展 基础对象
      for (name in options) {
        src = target[name]
        copy = options[name]
        // 防止永 不结束的 循环
        if (target === copy) {
          continue;
        }
        // 扩展 原生对象 或 数组
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }
          target[name] = U.extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}

U.fn.init.prototype = U.fn;

// Export Static
function grep(elements, callback) {
    return filter.call(elements, callback)
}

function noop() {
}

export {
  // type,
  // contains,
  // camelize as camelCase,
  // isFunction,
  // isWindow,
  // isPlainObject,
  // isEmptyObject,
  // isNumeric,
  // isArray,
  // inArray,
  // trim,
  grep,
  noop
}
