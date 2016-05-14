/**
 * Pile Dialog
 *
 * Ver 0.5.8
 * Date 2016/4/21
 *
 * Created by krimeshu on 2016/1/13.
 */
(function () {
    var templateText = '<div class=\"dialog-cover\"></div>\r\n<div class=\"dialog-box\">\r\n    <p class=\"dialog-title\"></p>\r\n    <a class=\"dialog-close-btn\"></a>\r\n\r\n    <div class=\"dialog-content\"></div>\r\n</div>\r\n',
        styleText = '.pile-dialog-wrap.default .dialog-box{border-radius:4px;background-color:#fff;-webkit-box-shadow:0 0 7.5px rgba(0,0,0,.3);box-shadow:0 0 7.5px rgba(0,0,0,.3);margin:0 8px;min-width:40%}.pile-dialog-wrap.default .dialog-box .dialog-title{height:55px;line-height:55px;margin:0;padding-left:21px;padding-right:21px;border-radius:4px 4px 0 0;border-bottom:1px solid #dadada;background-color:#fff;color:#333;font-size:15px}.pile-dialog-wrap.default .dialog-box .dialog-close-btn{width:28px;height:28px;padding:12.5px 13.5px 14.5px 13.5px}.pile-dialog-wrap.default .dialog-box .dialog-close-btn::after{content:\"\";display:block;width:28px;height:28px;background:url(\"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozQzVBN0I0MTBEQjVFNTExOTg4N0JDNjUxNDI5NkNDQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMEExQUI0QkI5QkIxMUU1ODEyN0MyOUFFOEE2MkIzMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMEExQUI0QUI5QkIxMUU1ODEyN0MyOUFFOEE2MkIzMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDRiNGU5M2ItODQ0OS1kMTQ2LWFhN2EtNDhlZGI5ZDllOWZjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNDNUE3QjQxMERCNUU1MTE5ODg3QkM2NTE0Mjk2Q0NCIi8+IDwvcmRmOkRlc2Ny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\") no-repeat 0 0;background-size:28px 28px}.pile-dialog-wrap.default .dialog-box .dialog-content{padding-bottom:25px;border-radius:4px 4px 0 0;background-color:#fff;color:#333;font-size:14px}.pile-dialog-wrap.default .dialog-box .dialog-content .weak{color:#868686}.pile-dialog-wrap.default .dialog-box .dialog-content .small{font-size:12px}.pile-dialog-wrap.default .dialog-box .dialog-content .del{text-decoration:line-through}.pile-dialog-wrap.default .dialog-box .dialog-content .em{font-style:normal;text-shadow:0 0 4px #fcf988}.pile-dialog-wrap.default .dialog-box .dialog-content .link{display:inline-block;padding:2px 0;color:#e65d52;border-bottom:1px solid #e65d52}.pile-dialog-wrap.default .dialog-box .dialog-para{margin:25px 21px 0 21px;padding:0}.pile-dialog-wrap.default .dialog-box .dialog-btn{margin:25px 21px 0 21px;padding:0 10px;height:40px;line-height:40px;border-radius:3px;border:2px solid #767676;background-color:#fdf986;color:#545253;font-size:15px;text-align:center}.pile-dialog-wrap.default .dialog-box .dialog-btn:active{background-color:#827e02}.pile-dialog-wrap.default .dialog-box .dialog-btn[disabled]{background-color:#c5c5c5}.pile-dialog-wrap.flat{top:auto;bottom:0;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;-ms-grid-row-align:flex-end;align-items:flex-end}.pile-dialog-wrap.flat .dialog-box{background-color:#fff;width:100%}.pile-dialog-wrap.flat .dialog-box .dialog-title{height:50px;line-height:50px;color:#333;text-align:center;font-size:16px}.pile-dialog-wrap.flat .dialog-box .dialog-close-btn{display:none}.pile-dialog-wrap.flat .dialog-box .dialog-content{color:#535252;font-size:14px}.pile-dialog-wrap.flat .dialog-box .dialog-content .weak{color:#969696}.pile-dialog-wrap.flat .dialog-box .dialog-content .small{font-size:12px}.pile-dialog-wrap.flat .dialog-box .dialog-content .del{text-decoration:line-through}.pile-dialog-wrap.flat .dialog-box .dialog-content .em{font-style:normal;text-shadow:0 0 4px #e86a3e}.pile-dialog-wrap.flat .dialog-box .dialog-para{margin:25px 35px 0 35px;padding:0}.pile-dialog-wrap.flat .dialog-box .dialog-btn{margin:25px 0 0 0;padding:0;height:60px;line-height:60px;border-top:1px solid #c5c5c5;background-color:#f5f5ee;color:#535252;font-size:16px;text-align:center}.pile-dialog-wrap.toast{top:auto;bottom:75px;height:auto}.pile-dialog-wrap.toast .dialog-box{display:inline-block;background-color:rgba(40,40,40,.95);border-radius:50px;margin:0 auto}.pile-dialog-wrap.toast .dialog-box .dialog-title{height:50px;line-height:50px;color:#333;text-align:center;font-size:16px}.pile-dialog-wrap.toast .dialog-box .dialog-close-btn{display:none}.pile-dialog-wrap.toast .dialog-box .dialog-content{color:#c5c5c5;font-size:13px}.pile-dialog-wrap.toast .dialog-box .dialog-content .weak{color:#969696}.pile-dialog-wrap.toast .dialog-box .dialog-content .small{font-size:12px}.pile-dialog-wrap.toast .dialog-box .dialog-content .del{text-decoration:line-through}.pile-dialog-wrap.toast .dialog-box .dialog-content .em{font-style:normal;text-shadow:0 0 4px #e86a3e}.pile-dialog-wrap.toast .dialog-box .dialog-para{height:50px;line-height:50px;padding:0 35px}.pile-dialog-wrap{display:none;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:fixed;top:0;left:0;z-index:1000000;width:100%;height:100%;text-align:center;pointer-events:none}.pile-dialog-wrap.open{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.pile-dialog-wrap .dialog-box,.pile-dialog-wrap .dialog-cover{pointer-events:auto}.dialog-cover{position:fixed;z-index:1000001;top:0;left:0;width:100%;height:100%;background-color:#000;-webkit-transition:opacity 300ms ease;transition:opacity 300ms ease;opacity:0}.dialog-cover.show{opacity:.25}.dialog-box{position:relative;z-index:1000002;overflow:hidden;-webkit-transition:opacity 300ms ease,-webkit-transform 300ms ease;transition:opacity 300ms ease,-webkit-transform 300ms ease;transition:transform 300ms ease,opacity 300ms ease;transition:transform 300ms ease,opacity 300ms ease,-webkit-transform 300ms ease;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0;text-align:left}.dialog-box.show{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.dialog-box .dialog-title{-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.dialog-box .dialog-close-btn{display:block;position:absolute;top:0;right:0;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);cursor:pointer}.dialog-box .dialog-content{position:relative;overflow:hidden;text-overflow:ellipsis}.dialog-box .dialog-para{display:block;line-height:1.4}.dialog-box .dialog-btn{display:block;text-align:center;cursor:pointer}.dialog-box .dialog-row{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}';

    /****************************************/

    var TRANSITION_TIME = 300;

var style = document.createElement('STYLE');
style.innerHTML = styleText;
document.body.appendChild(style);

var utils = {
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
;

var PileDialog = function (opt) {
    var self = this;
    if (!self instanceof PileDialog) {
        return new PileDialog(opt);
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
    wrap.className = 'pile-dialog-wrap';
    wrap.innerHTML = templateText;

    self.doms.cover = wrap.getElementsByClassName('dialog-cover')[0];
    self.doms.box = wrap.getElementsByClassName('dialog-box')[0];
    self.doms.title = wrap.getElementsByClassName('dialog-title')[0];
    self.doms.closeBtn = wrap.getElementsByClassName('dialog-close-btn')[0];
    self.doms.content = wrap.getElementsByClassName('dialog-content')[0];

    self.doms.wrap.addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
    self.doms.cover.addEventListener('click', function () {
        if (!self.isLocked) {
            self.close();
        }
    });
    self.doms.closeBtn.addEventListener('click', function () {
        self.close();
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
};


/****************************************/

PileDialog.topZIndex = 1000000;
var TYPES = PileDialog.TYPES = {
    DIALOG: 'DIALOG',
    PARA: 'PARAGRAPH',
    BUTTON: 'BUTTON',
    CHILD: 'CHILD',
    ROW: 'ROW',
    OTHER: 'OTHER'
};
var PROTOTYPES = PileDialog.PROTOTYPES = {
    ENTITY: {
        'dialogType': TYPES.CHILD,
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
                child = self._recognize(thing);
            self._append(child);
        },
        '_recognize': function (thing) {
            var type = Object.prototype.toString.apply(thing),
                child = null;
            if (thing.dialogType) {
                // 追加 Dialog.Child 对象
                child = thing;
            } else if (type === '[object String]') {
                // 追加 字符串（自动转为 Dialog.Para 对象）
                child = new PileDialog.Para({
                    text: thing
                });
            } else if (type === '[object Object]' &&
                typeof thing.text === 'string' &&
                typeof thing.click === 'function') {
                // 追加 按键（自动转为 Dialog.Button 对象）
                child = new PileDialog.Button(thing);
            } else if (/\[object HTML.*?Element]/i.test(type)) {
                // 追加 DOM（自动转为 Dialog.Child 对象）
                child = new PileDialog.Child({
                    dom: thing
                });
            }
            if (!child) {
                // 无法识别，放弃
                return null;
            }
            return child;
        },
        '_prepend': function (child, _index) {
            var self = this,
                index = _index | 0,
                children = self.children
            // 添加前，先从原有 parent 和 Dialog 中移除
            if (child._parent) {
                child._parent.remove(child);
            }
            child._parent = self;
            children.splice(index, 0, child);
            var nextNode = utils.getChildElem(self.dom, index);
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
                type = Object.prototype.toString.apply(thing),
                child = null;
            if (thing.dialogType && children.indexOf(thing) >= 0) {
                // 寻找的是 Dialog.Child 对象
                child = thing;
            } else if (type === '[object Number]') {
                // 寻找的是 Dialog.Child 对象序号
                if (thing < 0) {
                    thing = children.length + thing;
                }
                child = children[thing];
            } else if (type === '[object String]') {
                // 寻找的是 字符串（尝试识别为 Dialog.Para 对象）
                children.forEach(function (_child) {
                    var match = (_child.text === thing);
                    if (_child.dialogType === TYPES.PARA && match) {
                        child = _child;
                    }
                });
            } else if (type === '[object Object]' &&
                typeof thing.text === 'string' &&
                typeof thing.click === 'function') {
                // 寻找的是 按键（尝试识别为 Dialog.Button 对象）
                children.forEach(function (_child) {
                    var match = (_child.opt === thing || (_child.text === thing.text && _child.click === thing.click));
                    if (_child.dialogType === TYPES.BUTTON && match) {
                        child = _child;
                    }
                });
            } else if (/\[object HTML.*?Element]/i.test(type)) {
                // 寻找的是 DOM（尝试识别为 Dialog.Child 对象）
                children.forEach(function (_child) {
                    var match = (_child.dom === thing);
                    if (_child.dialogType === TYPES.CHILD && match) {
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
;

PileDialog.prototype = utils.extend({
    dialogType: TYPES.DIALOG,
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
                self.doms.wrap.className = 'pile-dialog-wrap ' + value;
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

        var z = PileDialog.topZIndex += 10;
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
        if (!utils.isArray(typeCallbacks)) {
            this.callbacks[type] = typeCallbacks = [];
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
}, PROTOTYPES.ENTITY, PROTOTYPES.CONTAINER);

PileDialog.Para = function (opt) {
    var self = this;
    if (!self instanceof PileDialog.Child) {
        return new PileDialog.Child(opt);
    }

    var text = opt.text || '',
        style = opt.style || {},
        className = opt.className || 'dialog-para';

    self.text = opt.text;

    self.dom = document.createElement('P');
    self.dom.className = className;
    self.dom.innerHTML = text;

    self.setStyle(style);
};


PileDialog.Para.prototype = utils.extend({
    dialogType: TYPES.PARA
}, PROTOTYPES.ENTITY, PROTOTYPES.IN_CONTAINER);
;
PileDialog.Button = function (opt) {
    var self = this;
    if (!self instanceof PileDialog.Child) {
        return new PileDialog.Child(opt);
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
};

PileDialog.Button.prototype = utils.extend({
    dialogType: TYPES.BUTTON
}, PROTOTYPES.ENTITY, PROTOTYPES.IN_CONTAINER);
;
PileDialog.Child = function (opt) {
    var self = this;
    if (!self instanceof PileDialog.Child) {
        return new PileDialog.Child(opt);
    }

    self.dom = opt.dom;
};

PileDialog.Child.prototype = utils.extend({
    dialogType: TYPES.CHILD
}, PROTOTYPES.ENTITY, PROTOTYPES.IN_CONTAINER);
;
PileDialog.Row = function (opt) {
    var self = this;
    if (!self instanceof PileDialog.Row) {
        return new PileDialog.Row(opt);
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
};

PileDialog.Row.prototype = utils.extend({
    dialogType: TYPES.ROW
}, PROTOTYPES.ENTITY, PROTOTYPES.CONTAINER, PROTOTYPES.IN_CONTAINER);
;


var Promise = PileDialog.Promise = function () {
    this.callbacks = [];
};

Promise.prototype = {
    'construct': Promise,
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
;

PileDialog.createDefaultDialogs = function () {
    PileDialog.toastDialog = new PileDialog({
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
    PileDialog.toastDialog.hideTitle();
    PileDialog.toast = function (msg, time, callback) {
        var dialog = PileDialog.toastDialog;
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
    // ----------
    PileDialog.alertDialog = new PileDialog({
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
    PileDialog.alertDialog.on('close', function (e) {
        var dialog = this,
            promise = dialog._promise,
            resolved = dialog._resolved;
        promise && (resolved ? promise.resolve(e) : promise.reject(e));
    });
    PileDialog.alert = function (contents, title) {
        var dialog = PileDialog.alertDialog,
            btnOk = dialog.find(-1),
            promise = new Promise();

        if (!utils.isArray(contents)) {
            contents = [contents];
        }
        dialog.remove(btnOk);
        dialog.clear();
        contents.forEach(function (content) {
            dialog.append(content);
        });
        dialog.append(btnOk);
        dialog.setTitle(title || '提示');

        dialog._promise = promise;
        dialog._resolved = false;

        dialog.open();
        return promise;
    };
    // ----------
    PileDialog.confirmDialog = new PileDialog({
        prop: {
            skin: 'default',
            cover: true,
            closeBtn: true,
            lock: true
        },
        content: [
            new PileDialog.Row({
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
    PileDialog.confirmDialog.on('close', function (e) {
        var dialog = this,
            promise = dialog._promise,
            resolved = dialog._resolved;
        promise && (resolved ? promise.resolve(e) : promise.reject(e));
    });
    PileDialog.confirm = function (contents, title, btnTextCancel, btnTextConfirm) {
        var dialog = PileDialog.confirmDialog,
            btnRow = dialog.find(-1),
            promise = new Promise(),
            btnText = {
                cancel: btnTextCancel || '取消',
                confirm: btnTextConfirm || '确定'
            };

        if (!utils.isArray(contents)) {
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
};

PileDialog.waitDefaultDialog = function (dialogName, funcName) {
    if (PileDialog[dialogName]) {
        console.error('PileDialog.%s 已存在。\n(PileDialog.%s already exists.)', dialogName, dialogName);
        return;
    }
    if (PileDialog[funcName]) {
        console.error('PileDialog.%s 已存在。\n(PileDialog.%s already exists.)', funcName, funcName);
        return;
    }
    PileDialog[funcName] = function () {
        // console.log('Dialog.%s 还没有准备好……', funcName);
        var args = arguments;
        window.setTimeout(function () {
            PileDialog[funcName].apply(PileDialog[dialogName], args);
        }, 50);
    };
};

PileDialog.waitDefaultDialog('toastDialog', 'toast');
PileDialog.waitDefaultDialog('alertDialog', 'alert');
PileDialog.waitDefaultDialog('confirmDialog', 'confirm');

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', PileDialog.createDefaultDialogs);
} else if (window.addEventListener) {
    window.addEventListener('load', PileDialog.createDefaultDialogs);
} else if (window.attachEvent) {
    window.attachEvent('onload', PileDialog.createDefaultDialogs);
};

window.PileDialog = PileDialog;;
})();