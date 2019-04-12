import U from './u-class';
import { isFunction } from './utils';

function wrap(structure) {
    var func = isFunction(structure)
    if (this[0] && !func)
        var dom = U(structure).get(0),
            clone = dom.parentNode || this.length > 1

    return this.each(function (index) {
        U(this).wrapAll(func
            ? structure.call(this, index)
            : clone ? dom.cloneNode(true) : dom
        )
    })
}

function wrapAll(structure) {
    if (this[0]) {
        U(this[0]).before(structure = U(structure))
        var children
        // drill down to the inmost element
        while ((children = structure.children()).length) structure = children.first()
        U(structure).append(this)
    }
    return this
}

function wrapInner(structure) {
    var func = isFunction(structure)
    return this.each(function (index) {
        var self = U(this),
            contents = self.contents(),
            dom = func ? structure.call(this, index) : structure
        contents.length ? contents.wrapAll(dom) : self.append(dom)
    });
}

function unwrap() {
    this.parent().each(function () {
        U(this).replaceWith(U(this).children())
    })
    return this
}

export {
    wrap,
    wrapAll,
    wrapInner,
    unwrap
}
