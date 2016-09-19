(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var dialogTypes = require('./_dialog-types.js'),
    dialogPrototypes = require('./_dialog-prototypes.js');

module.exports = DialogButton;

function DialogButton(opt) {
    var self = this;
    if (!self instanceof DialogButton) {
        return new DialogButton(opt);
    }

    var text = opt.text || '',
        style = opt.style || {},
        className = opt.className || 'dialog-btn';

    self.opt = opt;
    self.text = opt.text;
    self.click = opt.click;

    self.dom = document.createElement('A');
    self.dom.className = className;
    self.dom.innerHTML = text;
    self.dom.addEventListener('click', function (e) {
        if (!self.dom.hasAttribute('disabled')) {
            self.click(e);
        }
    });

    self.setStyle(style);
}

dialogTypes.register('BUTTON', DialogButton,
    [dialogPrototypes.ENTITY, dialogPrototypes.IN_CONTAINER],
    function parser(thing) {
        if (thing instanceof Object &&
            typeof thing.text === 'string' &&
            typeof thing.click === 'function') {
            return new DialogButton(thing);
        } else {
            return null;
        }
    },
    function comparator(instance, thing) {
        return instance === thing || instance.opt === thing ||
            (instance.text === thing.text && instance.click === thing.click);
    }
);


},{"./_dialog-prototypes.js":5,"./_dialog-types.js":7}],2:[function(require,module,exports){
var dialogTypes = require('./_dialog-types.js'),
    dialogPrototypes = require('./_dialog-prototypes.js');

module.exports = DialogChild;

function DialogChild(opt) {
    var self = this;
    if (!self instanceof DialogChild) {
        return new DialogChild(opt);
    }

    self.dom = opt.dom;
}

dialogTypes.register('CHILD', DialogChild,
    [dialogPrototypes.ENTITY, dialogPrototypes.IN_CONTAINER],
    function parser(thing) {
        if (thing instanceof HTMLElement) {
            return new DialogChild({
                dom: thing
            });
        } else {
            return null;
        }
    },
    function comparator(instance, thing) {
        return instance === thing || instance.opt === thing ||
            (instance.dom === thing);
    }
);

},{"./_dialog-prototypes.js":5,"./_dialog-types.js":7}],3:[function(require,module,exports){
var dialogTypes = require('./_dialog-types.js'),
    dialogPrototypes = require('./_dialog-prototypes.js');

module.exports = DialogPara;

function DialogPara(opt) {
    var self = this;
    if (!self instanceof DialogPara) {
        return new DialogPara(opt);
    }

    var text = opt.text || '',
        style = opt.style || {},
        className = opt.className || 'dialog-para';

    self.text = opt.text;

    self.dom = document.createElement('P');
    self.dom.className = className;
    self.dom.innerHTML = text;

    self.setStyle(style);
}

dialogTypes.register('PARA', DialogPara,
    [dialogPrototypes.ENTITY, dialogPrototypes.IN_CONTAINER],
    function parser(thing) {
        if (typeof thing === 'string') {
            return new DialogPara({
                text: thing
            });
        } else {
            return null;
        }
    },
    function comparator(instance, thing) {
        return instance === thing || instance.opt === thing ||
            (instance.text === thing);
    }
);
},{"./_dialog-prototypes.js":5,"./_dialog-types.js":7}],4:[function(require,module,exports){
module.exports = DialogPromise;

function DialogPromise() {
    var self = this;
    self.callbacks = [];
}

DialogPromise.prototype = {
    'construct': DialogPromise,
    'resolve': function (result) {
        this.complete("resolve", result);
    },
    'reject': function (result) {
        this.complete("reject", result);
    },
    'complete': function (type, result) {
        while (this.callbacks[0]) {
            var callback = this.callbacks.shift()[type];
            typeof(callback) === 'function' && callback(result);
        }
    },
    'then': function (successHandler, failedHandler) {
        this.callbacks.push({
            resolve: successHandler,
            reject: failedHandler
        });
        return this;
    }
};

},{}],5:[function(require,module,exports){
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
                child = dialogTypes.tryParse(thing);
            if (!child) {
                var err = new Error('无法转换为对话框相关类：');
                err.target = thing;
                throw err;
            }
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
},{"./_dialog-types.js":7,"./_dialog-utils.js":8}],6:[function(require,module,exports){
var dialogTypes = require('./_dialog-types.js'),
    dialogPrototypes = require('./_dialog-prototypes.js');

module.exports = DialogRow;

function DialogRow(opt) {
    var self = this;
    if (!self instanceof DialogRow) {
        return new DialogRow(opt);
    }

    self.children = [];

    var content = opt.content || '',
        style = opt.style || {},
        className = opt.className || 'dialog-row';

    self.opt = opt;

    self.dom = document.createElement('DIV');
    self.dom.className = className;

    content && self.setContent(content);

    self.setStyle(style);
}

dialogTypes.register('ROW', DialogRow,
    [dialogPrototypes.ENTITY, dialogPrototypes.CONTAINER, dialogPrototypes.IN_CONTAINER]
);
},{"./_dialog-prototypes.js":5,"./_dialog-types.js":7}],7:[function(require,module,exports){
var dialogUtils = require('./_dialog-utils.js');

var types = {},
    parsers = {},
    comparators = {};

/**
 * 对话框相关类管理器
 */
module.exports = {
    register: function (name, constructor, prototypes, parser, comparator) {
        types[name] = constructor;
        parsers[name] = parser || null;
        comparators[name] = comparator || null;

        prototypes = prototypes || [];
        prototypes.splice(0, 0, {dialogType: name});
        constructor.prototype = dialogUtils.extend.apply(dialogUtils, prototypes);
    },
    getType: function (name) {
        return types[name];
    },
    // 尝试将参数转换成某种 对话框相关类
    tryParse: function (thing) {
        var typeObject;
        if (thing.dialogType) {
            return thing;
        }
        for (var name in types) {
            if (!types.hasOwnProperty(name)) {
                continue;
            }
            var parser = parsers[name];
            typeObject = parser && parser(thing);
            if (typeObject) {
                break;
            }
        }
        return typeObject || null;
    },
    compare: function (instance, thing) {
        var name = instance.dialogType,
            comparator = comparators[name];
        return comparator && comparator(instance, thing);
    }
};
},{"./_dialog-utils.js":8}],8:[function(require,module,exports){
var dialogUtils = {
    NODE_TYPES: {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    },
    extend: function (extPrototype, basePrototype) {
        var undefined = void(0),
            basePrototypes = Array.prototype.slice.call(arguments, 1);
        while (basePrototype = basePrototypes.shift()) {
            for (var p in basePrototype) {
                if (basePrototype.hasOwnProperty(p) && extPrototype[p] === undefined) {
                    extPrototype[p] = basePrototype[p];
                }
            }
        }
        return extPrototype;
    },
    isArray: function (tar) {
        return Object.prototype.toString.call(tar) === '[object Array]'
    },
    getChildElem: function (dom, index) {
        var childNodes = dom.childNodes,
            TYPES = this.NODE_TYPES,
            _pos = 0, _index = 0, node;
        while (node = childNodes[_pos++]) {
            if (node.nodeType === TYPES.ELEMENT_NODE) {
                if (index !== _index) {
                    _index++;
                    continue;
                }
                break;
            }
        }
        return node;
    },
    getPrevElem: function (dom) {
        do {
            dom = dom.previousSibling;
        }
        while (dom && dom.nodeType !== 1);
        return dom;
    },
    getNextElem: function (dom) {
        do {
            dom = dom.nextSibling;
        }
        while (dom && dom.nodeType !== 1);
        return dom;
    }
};

module.exports = dialogUtils;
},{}],9:[function(require,module,exports){
var dialogUtils = require('./_dialog-utils.js'),
    dialogTypes = require('./_dialog-types.js'),
    dialogPrototypes = require('./_dialog-prototypes.js'),

    WRAP_CLASS_NAME = 'dialog-wrap',
    TRANSITION_TIME = 300,
    TEMPLATE_TEXT = null;

module.exports = Dialog;

function Dialog(opt) {
    var self = this;
    if (!self instanceof Dialog) {
        return new Dialog(opt);
    }

    var prop = opt.prop || {
            skin: 'default',
            cover: true,
            closeBtn: true,
            lock: false
        },
        title = opt.title || '',
        content = opt.content || '',
        onOpen = opt['onOpen'],
        onClose = opt['onClose'];

    self.children = [];

    self.prop = {};
    self.doms = {};
    self.callbacks = {};

    var wrap = self.doms.wrap = document.createElement('DIV');
    wrap.className = WRAP_CLASS_NAME;
    wrap.innerHTML = TEMPLATE_TEXT;

    self.doms.cover = wrap.getElementsByClassName('dialog-cover')[0];
    self.doms.box = wrap.getElementsByClassName('dialog-box')[0];
    self.doms.title = wrap.getElementsByClassName('dialog-title')[0];
    self.doms.closeBtn = wrap.getElementsByClassName('dialog-close-btn')[0];
    self.doms.content = wrap.getElementsByClassName('dialog-content')[0];

    self.doms.wrap.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
    self.doms.cover.addEventListener('click', function (e) {
        if (!self.isLocked) {
            self.close(e);
        }
    });
    self.doms.closeBtn.addEventListener('click', function (e) {
        self.close(e);
    });

    // 内容部分的DOM作为默认DOM
    self.dom = self.doms.content;

    document.body.appendChild(wrap);

    self.setProp('skin', String(prop.skin || 'default'));
    self.setProp('cover', !!prop.cover);
    self.setProp('closeBtn', !!prop.closeBtn);
    self.setProp('lock', !!prop.lock);

    self.setTitle(title);
    self.setContent(content);

    onOpen && self.on('open', onOpen);
    onClose && self.on('close', onClose);
}

/****************************************/

Dialog.topZIndex = 1000000;

Dialog.setOptions = function (options) {
    (options['TRANSITION_TIME']) && (TRANSITION_TIME = options['TRANSITION_TIME']);
    (options['WRAP_CLASS_NAME']) && (WRAP_CLASS_NAME = options['WRAP_CLASS_NAME']);
    (options['TEMPLATE_TEXT']) && (TEMPLATE_TEXT = options['TEMPLATE_TEXT']);
};

/****************************************/

dialogTypes.register('DIALOG', Dialog, [{
    'setTitle': function (title) {
        this.title = title;
        this.doms.title.innerHTML = title;
    },
    'showTitle': function () {
        this.doms.title.style.display = 'block';
    },
    'hideTitle': function () {
        this.doms.title.style.display = 'none';
    },
    'setProp': function (name, value) {
        var self = this,
            prop = self.prop;
        prop[name] = value;
        switch (name) {
            case 'skin':
                var oldSkin = self._skin;
                if (oldSkin) {
                    self.doms.wrap.classList.remove(oldSkin);
                }
                self.doms.wrap.classList.add(value);
                self._skin = value;
                //self.doms.wrap.className = WRAP_CLASS_NAME + ' ' + value;
                break;
            case 'cover':
                self.doms.cover.style.display = value ? 'block' : 'none';
                break;
            case 'closeBtn':
                self.doms.closeBtn.style.display = value ? 'block' : 'none';
                break;
            case 'lock':
                self.isLocked = value;
                break;
        }
    },
    'open': function (e) {
        var self = this;

        if (self.trigger('open', e) === false) {
            return;
        }
        self._waitingTimeout && window.clearTimeout(self._waitingTimeout);
        self._waitingTimeout = window.setTimeout(function () {
            self._waitingTimeout = null;
        }, TRANSITION_TIME);

        var z = Dialog.topZIndex += 10;
        self.doms.wrap.style.zIndex = z;
        self.doms.cover.style.zIndex = z + 1;
        self.doms.box.style.zIndex = z + 2;

        self.doms.wrap.classList.add('open');
        self.doms.wrap.offsetWidth = self.doms.wrap.offsetWidth | 0;

        self.doms.cover.classList.add('show');
        self.doms.box.classList.add('show');
    },
    'close': function (e) {
        var self = this;

        if (self.trigger('close', e) === false) {
            return;
        }
        self._waitingTimeout && window.clearTimeout(self._waitingTimeout);
        self._waitingTimeout = window.setTimeout(function () {
            self.doms.wrap.classList.remove('open');
            self.doms.wrap.offsetWidth = self.doms.wrap.offsetWidth | 0;

            self._waitingTimeout = null;
        }, TRANSITION_TIME);

        self.doms.cover.classList.remove('show');
        self.doms.box.classList.remove('show');
    },
    'on': function (type, callback) {
        var self = this,
            typeCallbacks = self.callbacks[type];
        if (!dialogUtils.isArray(typeCallbacks)) {
            self.callbacks[type] = typeCallbacks = [];
        }
        typeCallbacks.push(callback);
    },
    'trigger': function (type) {
        var self = this,
            typeCallbacks = self.callbacks[type] || [],
            args = Array.prototype.splice.apply(arguments, [1]);
        for (var i = 0, callback; callback = typeCallbacks[i]; i++) {
            var res = callback.apply(this, args);
            if (res === false) {
                return res;
            }
        }
    }
}, dialogPrototypes.ENTITY, dialogPrototypes.CONTAINER]);

},{"./_dialog-prototypes.js":5,"./_dialog-types.js":7,"./_dialog-utils.js":8}],10:[function(require,module,exports){
/**
 * Created by krimeshu on 2016/5/17.
 */

var _loaded = false,
    _cbs = [];

var DOMLoadState = module.exports = {
    isLoaded: function () {
        return _loaded;
    },
    whenLoad: function (cb) {
        _cbs.push(cb);
    },
    _bindEvent: function () {
        var self = this,
            onLoad = function () {
                self._onLoad();
            };
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', onLoad);
        } else if (window.addEventListener) {
            window.addEventListener('load', onLoad);
        } else if (window.attachEvent) {
            window.attachEvent('onload', onLoad);
        }
    },
    _onLoad: function () {
        _loaded = true;
        _cbs.forEach(function (cb) {
            cb && cb();
        });
    }
};

DOMLoadState._bindEvent();
},{}],11:[function(require,module,exports){
var dialogUtils = require('./_dialog-utils.js'),

    Promise = require('./_dialog-promise.js'),

    Dialog = require('./_dialog.js'),
    DialogChild = require('./_dialog-child.js'),
    DialogPara = require('./_dialog-para.js'),
    DialogButton = require('./_dialog-button.js'),
    DialogRow = require('./_dialog-row.js'),

    DOMLoadState = require('./_dom-load-state.js');

var initializer = module.exports = {
    _initialized: false,
    _creators: [],
    init: function (opts) {
        var self = this,
            initialized = self._initialized,
            transitionTime = opts['transitionTime'] || 300,
            dialogWrapClassName = opts['dialogWrapClassName'] || 'pile-dialog-wrap',
            templateText = opts['templateText'] || '',
            styleText = opts['styleText'] || '';

        if (initialized) {
            return;
        }

        Dialog.setOptions({
            TRANSITION_TIME: transitionTime,
            WRAP_CLASS_NAME: dialogWrapClassName,
            TEMPLATE_TEXT: templateText
        });

        styleText && self._createStyle(styleText);

        if (DOMLoadState.isLoaded()) {
            self._doCreate();
        } else {
            DOMLoadState.whenLoad(function () {
                self._doCreate();
            });
        }
    },
    _createStyle: function (styleText) {
        var style = document.createElement('STYLE');
        style.innerHTML = styleText;
        document.body.appendChild(style);
    },
    expose: function () {
        window.PileDialog = Dialog;
        window.PileDialogChild = DialogChild;
        window.PileDialogPara = DialogPara;
        window.PileDialogButton = DialogButton;
        window.PileDialogRow = DialogRow;

        return Dialog;
    },
    _doCreate: function () {
        var creators = this._creators;
        creators.forEach(function (creator) {
            creator();
        });
    },
    lazyCreate: function (dialogName, funcName, creator) {
        if (Dialog[dialogName]) {
            console.error('PileDialog.%s 已存在。\n(PileDialog.%s already exists.)', dialogName, dialogName);
            return;
        }
        if (Dialog[funcName]) {
            console.error('PileDialog.%s 已存在。\n(PileDialog.%s already exists.)', funcName, funcName);
            return;
        }
        Dialog[funcName] = function () {
            // console.log('Dialog.%s 还没有准备好……', funcName);
            var args = arguments;
            window.setTimeout(function () {
                Dialog[funcName].apply(Dialog[dialogName], args);
            }, 50);
        };
        this._creators.push(creator);
    }
};

initializer.lazyCreate('toastDialog', 'toast', function () {
    Dialog.toastDialog = new Dialog({
        prop: {
            skin: 'toast',
            cover: false,
            closeBtn: false,
            lock: false
        },
        content: [
            ''
        ]
    });
    Dialog.toastDialog.hideTitle();
    Dialog.toast = function (msg, time, callback) {
        var dialog = Dialog.toastDialog;
        dialog.find(0).setText(msg);
        dialog.open();
        if (dialog._closeTimeout) {
            window.clearTimeout(dialog._closeTimeout);
        }
        if (arguments.length === 2 && typeof time === 'function') {
            callback = time;
            time = undefined;
        }
        time = time === undefined ? 2500 : time;
        if (time) {
            dialog._closeTimeout = window.setTimeout(function () {
                dialog.close();
                dialog._closeTimeout = null;
                callback && callback();
            }, time);
        }
    };
});

initializer.lazyCreate('alertDialog', 'alert', function () {
    Dialog.alertDialog = new Dialog({
        prop: {
            skin: 'default',
            cover: true,
            closeBtn: true,
            lock: false
        },
        content: [
            {
                text: '确定',
                click: function () {
                    var dialog = this.dialog();
                    dialog._resolved = true;
                    dialog.close();
                }
            }
        ]
    });
    Dialog.alertDialog.on('close', function (e) {
        var dialog = this,
            promise = dialog._promise,
            resolved = dialog._resolved;
        promise && (resolved ? promise.resolve(e) : promise.reject(e));
    });
    Dialog.alert = function (contents, title, btnText) {
        var dialog = Dialog.alertDialog,
            btnOk = dialog.find(-1),
            promise = new Promise();

        if (!dialogUtils.isArray(contents)) {
            contents = [contents];
        }
        dialog.remove(btnOk);
        dialog.clear();
        contents.forEach(function (content) {
            dialog.append(content);
        });
        dialog.append(btnOk);
        dialog.setTitle(title || '提示');
        btnOk.setText(btnText || '确定');

        dialog._promise = promise;
        dialog._resolved = false;

        dialog.open();
        return promise;
    };
});

initializer.lazyCreate('confirmDialog', 'confirm', function () {
    Dialog.confirmDialog = new Dialog({
        prop: {
            skin: 'default',
            cover: true,
            closeBtn: true,
            lock: true
        },
        content: [
            new PileDialogRow({
                content: [
                    {
                        text: '取消',
                        style: {
                            flex: 1
                        },
                        click: function () {
                            var dialog = this.dialog();
                            dialog._resolved = false;
                            dialog.close();
                        }
                    },
                    {
                        text: '确定',
                        style: {
                            flex: 1,
                            marginLeft: 0
                        },
                        click: function () {
                            var dialog = this.dialog();
                            dialog._resolved = true;
                            dialog.close();
                        }
                    }
                ]
            })
        ]
    });
    Dialog.confirmDialog.on('close', function (e) {
        var dialog = this,
            promise = dialog._promise,
            resolved = dialog._resolved;
        promise && (resolved ? promise.resolve(e) : promise.reject(e));
    });
    Dialog.confirm = function (contents, title, btnTextCancel, btnTextConfirm) {
        var dialog = Dialog.confirmDialog,
            btnRow = dialog.find(-1),
            promise = new Promise(),
            btnText = {
                cancel: btnTextCancel || '取消',
                confirm: btnTextConfirm || '确定'
            };

        if (!dialogUtils.isArray(contents)) {
            contents = [contents];
        }
        dialog.remove(btnRow);
        dialog.clear();
        contents.forEach(function (content) {
            dialog.append(content);
        });
        dialog.append(btnRow);
        dialog.setTitle(title || '提示');

        // 设置取消键和确定键的文本
        btnRow.find(0).setText(btnText.cancel);
        btnRow.find(1).setText(btnText.confirm);

        dialog._promise = promise;
        dialog._resolved = false;

        dialog.open();
        return promise;
    };
});

},{"./_dialog-button.js":1,"./_dialog-child.js":2,"./_dialog-para.js":3,"./_dialog-promise.js":4,"./_dialog-row.js":6,"./_dialog-utils.js":8,"./_dialog.js":9,"./_dom-load-state.js":10}],12:[function(require,module,exports){
/**
 * Pile Dialog
 *
 * Ver 1.1.3
 * Date 2016/5/17
 *
 * Created by krimeshu on 2016/1/13.
 */
(function () {
    var templateText = '<div class=\"dialog-cover\"></div>\r\n<div class=\"dialog-box\">\r\n    <p class=\"dialog-title\"></p>\r\n    <a class=\"dialog-close-btn\"></a>\r\n\r\n    <div class=\"dialog-content\"></div>\r\n</div>\r\n',
        styleText = '/*! Pile Dialog Styles */\n.pile-dialog-wrap{-webkit-tap-highlight-color:transparent}.pile-dialog-wrap.default .dialog-box{border-radius:4px;background-color:#fff;-webkit-box-shadow:0 0 7.5px rgba(0,0,0,.3);box-shadow:0 0 7.5px rgba(0,0,0,.3);margin:0 8px;min-width:40%}.pile-dialog-wrap.default .dialog-box .dialog-title{height:55px;line-height:55px;margin:0;padding-left:21px;padding-right:21px;border-radius:4px 4px 0 0;border-bottom:1px solid #dadada;background-color:#fff;color:#333;font-size:15px}.pile-dialog-wrap.default .dialog-box .dialog-close-btn{width:38px;height:38px;padding:7.5px 8.5px 9.5px 8.5px}.pile-dialog-wrap.default .dialog-box .dialog-close-btn::after{content:\"\";display:block;width:38px;height:38px;border-radius:2px;background:url(\"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAA51BMVEUAAABRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVHw6GZRUVHu5mbo4GXj3GTf2GRtbFVhYVPs5GXJw2FmZVReXVPb1GPX0GOMiVmIhVh4dlZqaVRxb1Xl3mXUzWLRy2K8tl+no1yPjFmFglh/fFd0clZaWlJXV1JSUlGgnFyZllrOx2HCvWC9t1+qpl2VklqRjlmBf1dDolf5AAAAJXRSTlMAKcMmvKscFu7Vt7Kvh08hEAJvDAf69enizMelnUEaYNypejYx4/ITWwAAAgdJREFUSMft1NlS8kAQBeBJlEhYJYAKKK45ypKIBFwAF8Bd3/95/plM/1pWOgbLC284F1SK4atMNXVaLLPM71PIm3mLP7LkUSHObUMmbXBHRhoy27wrYj7xB6gajKti4E/mKLJwF4HrHl9jw4i4DVwfu26A3Rj45koZIL0SuWcgnfsGh4UGZiMlB9j8Ilc2MVBuNIMRN5zelZI32AoluS3cKHfVU8Phk0KvL3/i3WKv+DGyPdx68st+DykWkeyeaWkXydnanXXJ8SnltDwZwrbC/93G8ES7XEl8k0oWp20ta5Z0Ne3ap8hWxLcpZ0jeod5s1nFHLlMWCVlfxXlLyQuYJi6Ua51jdT2BadlRstXB/wfGcVmTL7oMXxS++rIDcy3JkKzrK7bb+sr1BZ0aph6KHlLN+kGjMR9rOJ6j8BOHF5fygsXlDjBRxvfV5wTYWdjdh242C+X9gvKQ3OMUmD6qpwfgMNkdAQ+uzGiKRgPTEcmjJGdU8Uq1bQjRoGq/MiuMWUu6tvtCZl9Vm11h/Frqh7WlaocyiCxcZi1RbT+rzawwmchaotp+rTatMDYlG+9etLYVqrb3DrvEwjyGHtVWO0pZVjuUQ+RZaML/rC1XbR8mC3N4ptoy1e7Iaj8jx0IH3fGTdpx8GnfhCDZZyJhN7qhpQiYrYuKkMgdxZweZlCOWWebv8g9gBmPlYiejIwAAAABJRU5ErkJggg==\") no-repeat center center;background-size:28px 28px}.pile-dialog-wrap.default .dialog-box .dialog-close-btn:active::after{background-color:#dcdcd6}.pile-dialog-wrap.default .dialog-box .dialog-content{padding-bottom:25px;border-radius:4px 4px 0 0;background-color:#fff;color:#333;font-size:14px}.pile-dialog-wrap.default .dialog-box .dialog-content .weak{color:#868686}.pile-dialog-wrap.default .dialog-box .dialog-content .small{font-size:12px}.pile-dialog-wrap.default .dialog-box .dialog-content .del{text-decoration:line-through}.pile-dialog-wrap.default .dialog-box .dialog-content .em{font-style:normal;text-shadow:0 0 4px #fcf988}.pile-dialog-wrap.default .dialog-box .dialog-content .link{display:inline-block;padding:2px 0;color:#e65d52;border-bottom:1px solid #e65d52}.pile-dialog-wrap.default .dialog-box .dialog-para{margin:25px 21px 0 21px;padding:0}.pile-dialog-wrap.default .dialog-box .dialog-btn{margin:25px 21px 0 21px;padding:0 10px;height:40px;line-height:40px;border-radius:3px;border:2px solid #767676;background-color:#fdf986;color:#545253;font-size:15px;text-align:center}.pile-dialog-wrap.default .dialog-box .dialog-btn:active,.pile-dialog-wrap.default .dialog-box .dialog-btn.active{background-color:#827e02}.pile-dialog-wrap.default .dialog-box .dialog-btn[disabled],.pile-dialog-wrap.default .dialog-box .dialog-btn.disabled{background-color:#c5c5c5}.pile-dialog-wrap.light-salmon .dialog-box{border-radius:4px;background-color:#fff;-webkit-box-shadow:0 0 7.5px rgba(0,0,0,.3);box-shadow:0 0 7.5px rgba(0,0,0,.3);margin:0 8px;min-width:40%}.pile-dialog-wrap.light-salmon .dialog-box .dialog-title{height:55px;line-height:55px;margin:0;padding-left:21px;padding-right:21px;border-radius:4px 4px 0 0;border-bottom:1px solid #dadada;background-color:#fff;color:#333;font-size:15px}.pile-dialog-wrap.light-salmon .dialog-box .dialog-close-btn{width:38px;height:38px;padding:7.5px 8.5px 9.5px 8.5px}.pile-dialog-wrap.light-salmon .dialog-box .dialog-close-btn::after{content:\"\";display:block;width:38px;height:38px;border-radius:2px;background:url(\"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAADgAAAA4BAMAAABaqCYtAAAAElBMVEUAAAD/mmr/mmr/mmr/mmr/mmpfN+OxAAAABXRSTlMAnM2GSc5Tm0cAAACTSURBVDjL7dTNDYAgDIZh/wbw4t3EBYwTuAKH7r+KBw1tfRO+BeiJFh6jSBl6fLEc/8p11+Fka54bba/j2Uqe3OyMyZphQYa1nmIpc0IvEHoF0EuEoA5JHYI6JE2Q1CFpgKQBkgZISshJ/Vj9QvwUvQl6+/TG85cRgspjwgNGSCoPNdtBNJJowUbzirZvXBg93ngA5lQopdA864gAAAAASUVORK5CYII=\") no-repeat center center;background-size:28px 28px}.pile-dialog-wrap.light-salmon .dialog-box .dialog-close-btn:active::after{background-color:#dcdcd6}.pile-dialog-wrap.light-salmon .dialog-box .dialog-content{padding-bottom:25px;border-radius:4px 4px 0 0;background-color:#fff;color:#333;font-size:14px}.pile-dialog-wrap.light-salmon .dialog-box .dialog-content .weak{color:#868686}.pile-dialog-wrap.light-salmon .dialog-box .dialog-content .small{font-size:12px}.pile-dialog-wrap.light-salmon .dialog-box .dialog-content .del{text-decoration:line-through}.pile-dialog-wrap.light-salmon .dialog-box .dialog-content .em{font-style:normal;text-shadow:0 0 4px #ff7737}.pile-dialog-wrap.light-salmon .dialog-box .dialog-content .link{display:inline-block;padding:2px 0;color:#eb6056;border-bottom:1px solid #eb6056}.pile-dialog-wrap.light-salmon .dialog-box .dialog-para{margin:25px 21px 0 21px;padding:0}.pile-dialog-wrap.light-salmon .dialog-box .dialog-btn{margin:25px 21px 0 21px;padding:0 10px;height:43px;line-height:43px;border-radius:3px;background-color:#ff9a6a;color:#fff;font-size:15px;text-align:center}.pile-dialog-wrap.light-salmon .dialog-box .dialog-btn:active,.pile-dialog-wrap.light-salmon .dialog-box .dialog-btn.active{background-color:#ff7737}.pile-dialog-wrap.light-salmon .dialog-box .dialog-btn[disabled],.pile-dialog-wrap.light-salmon .dialog-box .dialog-btn.disabled{background-color:#c5c5c5}.pile-dialog-wrap.flat{top:auto;bottom:0;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end}.pile-dialog-wrap.flat .dialog-box{background-color:#fff;width:100%}.pile-dialog-wrap.flat .dialog-box .dialog-title{height:50px;line-height:50px;color:#333;text-align:center;font-size:16px}.pile-dialog-wrap.flat .dialog-box .dialog-close-btn{display:none}.pile-dialog-wrap.flat .dialog-box .dialog-content{color:#535252;font-size:14px}.pile-dialog-wrap.flat .dialog-box .dialog-content .weak{color:#969696}.pile-dialog-wrap.flat .dialog-box .dialog-content .small{font-size:12px}.pile-dialog-wrap.flat .dialog-box .dialog-content .del{text-decoration:line-through}.pile-dialog-wrap.flat .dialog-box .dialog-content .em{font-style:normal;text-shadow:0 0 4px #e86a3e}.pile-dialog-wrap.flat .dialog-box .dialog-para{margin:25px 35px 0 35px;padding:0}.pile-dialog-wrap.flat .dialog-box .dialog-btn{margin:25px 0 0 0;padding:0;height:60px;line-height:60px;border-top:1px solid #c5c5c5;background-color:#f5f5ee;color:#535252;font-size:16px;text-align:center}.pile-dialog-wrap.toast{top:auto;bottom:75px;height:auto}.pile-dialog-wrap.toast .dialog-box{display:inline-block;background-color:rgba(40,40,40,.95);border-radius:50px;margin:0 auto}.pile-dialog-wrap.toast .dialog-box .dialog-title{height:50px;line-height:50px;color:#333;text-align:center;font-size:16px}.pile-dialog-wrap.toast .dialog-box .dialog-close-btn{display:none}.pile-dialog-wrap.toast .dialog-box .dialog-content{color:#c5c5c5;font-size:13px}.pile-dialog-wrap.toast .dialog-box .dialog-content .weak{color:#969696}.pile-dialog-wrap.toast .dialog-box .dialog-content .small{font-size:12px}.pile-dialog-wrap.toast .dialog-box .dialog-content .del{text-decoration:line-through}.pile-dialog-wrap.toast .dialog-box .dialog-content .em{font-style:normal;text-shadow:0 0 4px #e86a3e}.pile-dialog-wrap.toast .dialog-box .dialog-para{height:50px;line-height:50px;padding:0 35px}.pile-dialog-wrap{display:none;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:fixed;top:0;left:0;z-index:1000000;width:100%;height:100%;text-align:center;pointer-events:none}.pile-dialog-wrap.open{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.pile-dialog-wrap .dialog-box,.pile-dialog-wrap .dialog-cover{pointer-events:auto}.dialog-cover{position:fixed;z-index:1000001;top:0;left:0;width:100%;height:100%;background-color:#000;-webkit-transition:opacity 300ms ease;transition:opacity 300ms ease;opacity:0}.dialog-cover.show{opacity:.25}.dialog-box{position:relative;z-index:1000002;overflow:hidden;-webkit-transition:opacity 300ms ease,-webkit-transform 300ms ease;transition:opacity 300ms ease,-webkit-transform 300ms ease;transition:transform 300ms ease,opacity 300ms ease;transition:transform 300ms ease,opacity 300ms ease,-webkit-transform 300ms ease;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0;text-align:left}.dialog-box.show{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.dialog-box .dialog-title{-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.dialog-box .dialog-close-btn{display:block;position:absolute;top:0;right:0;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);cursor:pointer}.dialog-box .dialog-content{position:relative;overflow:hidden;text-overflow:ellipsis}.dialog-box .dialog-para{display:block;line-height:1.4}.dialog-box .dialog-btn{display:block;text-align:center;cursor:pointer}.dialog-box .dialog-row{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}',

        initializer = require('./js/_initializer.js');

    /****************************************/

    initializer.init({
        templateText: templateText,
        styleText: styleText
    });

    module.exports = initializer.expose();

})();
},{"./js/_initializer.js":11}]},{},[12]);
