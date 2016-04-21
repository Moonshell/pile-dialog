/**
 * Pile Dialog
 *
 * Ver {VERSION}
 * Date 2016/4/3
 *
 * Created by krimeshu on 2016/1/13.
 */
(function () {
    var TRANSITION_TIME = 300,
        TYPE = {
            DIALOG: 'DIALOG',
            PARA: 'PARAGRAPH',
            BUTTON: 'BUTTON',
            CHILD: 'CHILD',
            OTHER: 'OTHER'
        };

    var templateText = '#include("inc/_template.html", {"_inlineString": true})',
        styleText = '#include("css/dialog-rem.css", {"_inlineString": true})';

    var style = document.createElement('STYLE');
    style.innerHTML = styleText;
    document.body.appendChild(style);

    /****************************************/

    var PileDialog = function (opt) {
        var self = this;

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

        self.prop = {};
        self.doms = {};
        self.children = [];
        self.callbacks = {};

        var wrap = self.doms.wrap = document.createElement('DIV');
        wrap.className = 'dialog-wrap';
        wrap.innerHTML = templateText;

        self.doms.cover = wrap.getElementsByClassName('dialog-cover')[0];
        self.doms.box = wrap.getElementsByClassName('dialog-box')[0];
        self.doms.title = wrap.getElementsByClassName('dialog-title')[0];
        self.doms.closeBtn = wrap.getElementsByClassName('dialog-close-btn')[0];
        self.doms.content = wrap.getElementsByClassName('dialog-content')[0];

        wrap.addEventListener('touchmove', function (e) {
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

    PileDialog.topZIndex = 1000000;

    PileDialog.prototype = {
        dialogType: TYPE.DIALOG,
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
                    self.doms.wrap.className = 'dialog-wrap ' + value;
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
            if (thing.dialogType && !thing.dialog) {
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
                child = new PileDialog.Button({
                    text: thing.text,
                    click: thing.click
                });
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
                children = self.children;
            child.dialog = self;
            children.splice(index, 0, child);
            var nextNode = self.doms.content.childNodes[index];
            if (nextNode) {
                self.doms.content.insertBefore(child.dom, nextNode);
            } else {
                self.doms.content.appendChild(child.dom);
            }
        },
        '_append': function (child) {
            var self = this,
                children = self.children;
            child.dialog = self;
            children.push(child);
            self.doms.content.appendChild(child.dom);
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
                    if (_child.dialogType === TYPE.PARA && match) {
                        child = _child;
                    }
                });
            } else if (type === '[object Object]' &&
                typeof thing.text === 'string' &&
                typeof thing.click === 'function') {
                // 寻找的是 按键（尝试识别为 Dialog.Button 对象）
                children.forEach(function (_child) {
                    var match = (_child.opt === thing || (_child.text === thing.text && _child.click === thing.click));
                    if (_child.dialogType === TYPE.PARA && match) {
                        child = _child;
                    }
                });
            } else if (/\[object HTML.*?Element]/i.test(type)) {
                // 寻找的是 DOM（尝试识别为 Dialog.Child 对象）
                children.forEach(function (_child) {
                    var match = (_child.dom === thing);
                    if (_child.dialogType === TYPE.PARA && match) {
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
            delete child.dialog;
            children.splice(children.indexOf(child), 1);
            self.doms.content.removeChild(child.dom);
        },
        'clear': function () {
            var self = this,
                children = self.children;
            for (var i = 0, len = children.length; i < len; i++) {
                delete children[i].dialog;
            }
            self.children = [];
            self.doms.content.innerHTML = '';
        },
        'setContent': function (content) {
            var self = this,
                arr = content.length === undefined ? [content] : content;

            self.clear();
            for (var i = 0, len = arr.length; i < len; i++) {
                self.append(content[i]);
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
            if (Object.prototype.toString.call(typeCallbacks) != '[object Array]') {
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
    };

    /****************************************/

    PileDialog.TYPE = TYPE;

    PileDialog.CHILD_PROTO = {
        'dialogType': TYPE.CHILD,
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
    };

    /****************************************/

    PileDialog.Child = function (opt) {
        var self = this;

        self.dom = opt.dom;
    };

    PileDialog.Child.prototype = PileDialog.CHILD_PROTO;

    /****************************************/

    PileDialog.Para = function (opt) {
        var self = this;

        var text = opt.text || '',
            style = opt.style || {};

        self.text = opt.text;

        self.dom = document.createElement('P');
        self.dom.className = 'dialog-para';
        self.dom.innerHTML = text;

        self.setStyle(style);

        self.dialogType = TYPE.PARA;
    };

    PileDialog.Para.prototype = PileDialog.CHILD_PROTO;

    /****************************************/

    PileDialog.Button = function (opt) {
        var self = this;

        var text = opt.text || '',
            style = opt.style || {};

        self.opt = opt;
        self.text = opt.text;
        self.click = opt.click;

        self.dom = document.createElement('A');
        self.dom.className = 'dialog-btn';
        self.dom.innerHTML = text;
        self.dom.addEventListener('click', function (e) {
            if (!self.dom.hasAttribute('disabled')) {
                self.click(e);
            }
        });

        self.setStyle(style);

        self.dialogType = TYPE.PARA;
    };

    PileDialog.Button.prototype = PileDialog.CHILD_PROTO;

    /****************************************/

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
                this.callbacks.shift()[type](result);
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

    /****************************************/

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
                        var dialog = this.dialog;
                        dialog._resolved = true;
                        dialog.close();
                    }
                }
            ]
        });
        PileDialog.alertDialog.on('close', function (e) {
            var promise = this._promise,
                resolved = this._resolved;
            promise && (resolved ? promise.resolve(e) : promise.reject(e));
        });
        PileDialog.alert = function (content, title) {
            var dialog = PileDialog.alertDialog,
                btnOk = dialog.find(-1),
                promise = new Promise();
            dialog.remove(btnOk);
            dialog.clear();
            dialog.append(content);
            dialog.append(btnOk);
            dialog.setTitle(title || '提示');

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

    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', PileDialog.createDefaultDialogs);
    } else if (window.addEventListener) {
        window.addEventListener('load', PileDialog.createDefaultDialogs);
    } else if (window.attachEvent) {
        window.attachEvent('onload', PileDialog.createDefaultDialogs);
    }

    window.PileDialog = PileDialog;
})();