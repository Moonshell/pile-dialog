var dialogUtils = require('./_dialog-utils.js'),
    dialogTypes = require('./_dialog-types.js');

/**
 * 几种基本的 对话框相关原型
 */
module.exports = {
    ENTITY: {
        'setAttr': function (attr, value) {
            var self = this;
            self.dom.setAttribute(attr, value);
        },
        'removeAttr': function (attr) {
            var self = this;
            self.dom.removeAttribute(attr);
        },
        'setText': function (text) {
            var self = this;
            self.dom.innerHTML = text;
        },
        'setStyle': function (style) {
            var self = this,
                dom = self.dom;
            for (var name in style) {
                if (!style.hasOwnProperty(name)) {
                    continue;
                }
                dom.style[name] = style[name];
            }
        },
        'show': function () {
            var self = this;
            self.dom.style.display = 'block';
        },
        'hide': function () {
            var self = this;
            self.dom.style.display = 'none';
        }
    },
    CONTAINER: {
        'prepend': function (thing, _index) {
            var self = this,
                child = self._recognize(thing);
            self._prepend(child, _index);
        },
        'append': function (thing) {
            var self = this,
                child = dialogTypes.tryParse(thing);
            if (!child) {
                var err = new Error('无法转换为对话框相关类：');
                err.target = thing;
                throw err;
            }
            self._append(child);
        },
        '_prepend': function (child, _index) {
            var self = this,
                index = _index | 0,
                children = self.children;
            // 添加前，先从原有 parent 和 Dialog 中移除
            if (child._parent) {
                child._parent.remove(child);
            }
            child._parent = self;
            children.splice(index, 0, child);
            var nextNode = dialogUtils.getChildElem(self.dom, index);
            if (nextNode) {
                self.dom.insertBefore(child.dom, nextNode);
            } else {
                self.dom.appendChild(child.dom);
            }
        },
        '_append': function (child) {
            var self = this,
                children = self.children;
            // 添加前，先从原有 parent 和 Dialog 中移除
            if (child._parent) {
                child._parent.remove(child);
            }
            child._parent = self;
            children.push(child);
            self.dom.appendChild(child.dom);
        },
        'find': function (thing) {
            var self = this,
                children = self.children,
                child = null;
            if (thing.dialogType && children.indexOf(thing) >= 0) {
                // 寻找的是 Dialog.Child 对象
                child = thing;
            } else if (typeof thing === 'number') {
                // 寻找的是 Dialog.Child 对象序号
                if (thing < 0) {
                    thing = children.length + thing;
                }
                child = children[thing];
            } else {
                // 尝试进行 对话框相关类的对比
                children.forEach(function (_child) {
                    if (dialogTypes.compare(_child, thing)) {
                        child = _child;
                    }
                });
            }
            return child;
        },
        'remove': function (thing) {
            var self = this,
                child = self.find(thing);
            if (!child) {
                // 无法识别，放弃
                return;
            }
            this._remove(child);
        },
        '_remove': function (child) {
            var self = this,
                children = self.children;
            delete child._parent;
            children.splice(children.indexOf(child), 1);
            self.dom.removeChild(child.dom);
        },
        'clear': function () {
            var self = this,
                children = self.children,
                len = children.length;
            for (var i = 0, child; (i < len) && (child = children[i]); i++) {
                delete child._parent;
            }
            self.children = [];
            self.dom.innerHTML = '';
        },
        'setContent': function (content) {
            var self = this,
                arr = content.length === undefined ? [content] : content;

            self.clear();
            for (var i = 0, len = arr.length; i < len; i++) {
                self.append(content[i]);
            }
        }
    },
    IN_CONTAINER: {
        'prev': function () {
            var self = this,
                parent = self && self._parent,
                children = parent && parent.children,
                pos = children && children.indexOf(self);
            return pos >= 0 && parent && parent.find && parent.find(pos - 1);
        },
        'next': function () {
            var self = this,
                parent = self && self._parent,
                children = parent && parent.children,
                pos = children && children.indexOf(self);
            return pos >= 0 && parent && parent.find && parent.find(pos + 1);
        },
        'parent': function () {
            var self = this;
            return self._parent;
        },
        'dialog': function () {
            var self = this;
            while (self && !(self instanceof PileDialog)) {
                self = self._parent;
            }
            return self;
        }
    }
};