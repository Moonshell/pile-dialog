/**
 * Pile Dialog
 *
 * Ver 0.10.1
 * Date 2016/3/3
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

    var templateText = '<div class=\"dialog-cover\"></div>\r\n<div class=\"dialog-box\">\r\n    <p class=\"dialog-title\"></p>\r\n    <a class=\"dialog-close-btn\"></a>\r\n\r\n    <div class=\"dialog-content\"></div>\r\n</div>\r\n',
        styleText = 'html {\n  font-size: 20px; }\n\nhtml {\n  font-size: 10px;\n  overflow-x: hidden; }\n  @media screen and (min-width: 320px) {\n    html {\n      font-size: 17px; } }\n  @media screen and (min-width: 360px) {\n    html {\n      font-size: 19px; } }\n  @media screen and (min-width: 375px) {\n    html {\n      font-size: 20px; } }\n  @media screen and (min-width: 414px) {\n    html {\n      font-size: 22px; } }\n\nbody {\n  font-size: 14px; }\n\n.dialog-wrap.default {\n  left: 0;\n  bottom: 0; }\n  .dialog-wrap.default .dialog-box {\n    border-radius: 0.2rem 0.2rem 0rem 0rem;\n    background-color: #FFFFFF;\n    box-shadow: 0 0 0.375rem rgba(0, 0, 0, 0.3);\n    margin: 0rem 0.4rem; }\n    .dialog-wrap.default .dialog-box .dialog-title {\n      height: 2.75rem;\n      line-height: 2.75rem;\n      margin: 0;\n      padding-left: 1.05rem;\n      padding-right: 1.05rem;\n      border-radius: 0.2rem 0.2rem 0rem 0rem;\n      position: relative;\n      background-color: #FFFFFF;\n      color: #333333;\n      font-size: 0.75rem; }\n      .dialog-wrap.default .dialog-box .dialog-title::after {\n        content: \"\";\n        display: block;\n        position: absolute;\n        -webkit-transform-origin: center bottom;\n        transform-origin: center bottom;\n        width: 100%;\n        bottom: 0;\n        width: 200%;\n        left: -50%;\n        -webkit-transform: scale(0.5);\n        transform: scale(0.5);\n        border-bottom: 1px solid #DADADA; }\n    .dialog-wrap.default .dialog-box .dialog-close-btn {\n      width: 1.4rem;\n      height: 1.4rem;\n      padding: 0.625rem 0.675rem 0.725rem 0.675rem; }\n      .dialog-wrap.default .dialog-box .dialog-close-btn::after {\n        content: \"\";\n        display: block;\n        width: 1.4rem;\n        height: 1.4rem;\n        background: transparent url(\"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozQzVBN0I0MTBEQjVFNTExOTg4N0JDNjUxNDI5NkNDQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMEExQUI0QkI5QkIxMUU1ODEyN0MyOUFFOEE2MkIzMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMEExQUI0QUI5QkIxMUU1ODEyN0MyOUFFOEE2MkIzMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDRiNGU5M2ItODQ0OS1kMTQ2LWFhN2EtNDhlZGI5ZDllOWZjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNDNUE3QjQxMERCNUU1MTE5ODg3QkM2NTE0Mjk2Q0NCIi8+IDwvcmRmOkRlc2Ny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\") no-repeat scroll 0 0;\n        background-size: 1.4rem 1.4rem; }\n    .dialog-wrap.default .dialog-box .dialog-content {\n      padding-bottom: 1.25rem;\n      border-radius: 0.2rem 0.2rem 0rem 0rem;\n      background-color: #FFFFFF;\n      color: #333333;\n      font-size: 0.7rem; }\n      .dialog-wrap.default .dialog-box .dialog-content .weak {\n        color: #868686; }\n      .dialog-wrap.default .dialog-box .dialog-content .small {\n        font-size: 0.6rem; }\n      .dialog-wrap.default .dialog-box .dialog-content .del {\n        text-decoration: line-through; }\n      .dialog-wrap.default .dialog-box .dialog-content .em {\n        font-style: normal;\n        text-shadow: 0 0 4px #FCF988; }\n      .dialog-wrap.default .dialog-box .dialog-content .link {\n        display: inline-block;\n        padding: 0.1rem 0rem;\n        color: #E65D52;\n        border-bottom: 1px solid #E65D52; }\n    .dialog-wrap.default .dialog-box .dialog-para {\n      margin: 1.25rem 1.05rem 0rem 1.05rem;\n      padding: 0; }\n    .dialog-wrap.default .dialog-box .dialog-btn {\n      margin: 1.25rem 1.05rem 0rem 1.05rem;\n      padding: 0;\n      height: 2rem;\n      line-height: 2rem;\n      border-radius: 0.15rem;\n      border: 2px solid #767676;\n      background-color: #FDF986;\n      color: #545253;\n      font-size: 0.75rem;\n      text-align: center; }\n\n.dialog-wrap.flat {\n  left: 0;\n  bottom: 0; }\n  .dialog-wrap.flat .dialog-box {\n    background-color: #FFFFFF; }\n    .dialog-wrap.flat .dialog-box .dialog-title {\n      height: 2.5rem;\n      line-height: 2.5rem;\n      color: #333333;\n      text-align: center;\n      font-size: 0.8rem; }\n    .dialog-wrap.flat .dialog-box .dialog-close-btn {\n      display: none; }\n    .dialog-wrap.flat .dialog-box .dialog-content {\n      color: #535252;\n      font-size: 0.6rem; }\n      .dialog-wrap.flat .dialog-box .dialog-content .weak {\n        color: #969696; }\n      .dialog-wrap.flat .dialog-box .dialog-content .small {\n        font-size: 0.6rem; }\n      .dialog-wrap.flat .dialog-box .dialog-content .del {\n        text-decoration: line-through; }\n      .dialog-wrap.flat .dialog-box .dialog-content .em {\n        font-style: normal;\n        text-shadow: 0 0 4px #E86A3E; }\n    .dialog-wrap.flat .dialog-box .dialog-para {\n      margin: 1.25rem 1.75rem 0rem 1.75rem;\n      padding: 0; }\n    .dialog-wrap.flat .dialog-box .dialog-btn {\n      margin: 1.25rem 0rem 0rem 0rem;\n      padding: 0;\n      height: 3rem;\n      line-height: 3rem;\n      position: relative;\n      background-color: #F5F5EE;\n      color: #535252;\n      font-size: 0.8rem;\n      text-align: center; }\n      .dialog-wrap.flat .dialog-box .dialog-btn::before {\n        content: \"\";\n        display: block;\n        position: absolute;\n        -webkit-transform-origin: center top;\n        transform-origin: center top;\n        width: 100%;\n        top: 0;\n        width: 200%;\n        left: -50%;\n        -webkit-transform: scale(0.5);\n        transform: scale(0.5);\n        border-top: 1px solid #C5C5C5; }\n\n.dialog-wrap.toast {\n  left: 0;\n  bottom: 3.75rem; }\n  .dialog-wrap.toast .dialog-box {\n    display: inline-block;\n    background-color: rgba(40, 40, 40, 0.95);\n    border-radius: 2.5rem;\n    margin: 0 auto; }\n    .dialog-wrap.toast .dialog-box .dialog-title {\n      height: 2.5rem;\n      line-height: 2.5rem;\n      color: #333333;\n      text-align: center;\n      font-size: 0.8rem; }\n    .dialog-wrap.toast .dialog-box .dialog-close-btn {\n      display: none; }\n    .dialog-wrap.toast .dialog-box .dialog-content {\n      color: #C5C5C5;\n      font-size: 0.65rem; }\n      .dialog-wrap.toast .dialog-box .dialog-content .weak {\n        color: #969696; }\n      .dialog-wrap.toast .dialog-box .dialog-content .small {\n        font-size: 0.6rem; }\n      .dialog-wrap.toast .dialog-box .dialog-content .del {\n        text-decoration: line-through; }\n      .dialog-wrap.toast .dialog-box .dialog-content .em {\n        font-style: normal;\n        text-shadow: 0 0 4px #E86A3E; }\n    .dialog-wrap.toast .dialog-box .dialog-para {\n      height: 2.5rem;\n      line-height: 2.5rem;\n      padding: 0rem 1.75rem; }\n\n.dialog-wrap {\n  display: none;\n  position: fixed;\n  z-index: 1000000;\n  width: 100%;\n  height: auto;\n  text-align: center;\n  pointer-events: none; }\n  .dialog-wrap.open {\n    display: block; }\n\n.dialog-cover {\n  position: fixed;\n  z-index: 1000001;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  transition: opacity 300ms ease;\n  opacity: 0; }\n  .dialog-cover.show {\n    opacity: .25; }\n\n.dialog-box {\n  position: relative;\n  z-index: 1000002;\n  overflow: hidden;\n  transition: transform 300ms ease, opacity 300ms ease;\n  transform: translate3d(0, 100%, 0);\n  opacity: 0;\n  text-align: left; }\n  .dialog-box.show {\n    transform: translate3d(0, 0, 0);\n    opacity: 1; }\n  .dialog-box .dialog-title {\n    box-sizing: border-box;\n    overflow: hidden; }\n  .dialog-box .dialog-close-btn {\n    display: block;\n    position: absolute;\n    top: 0;\n    right: 0;\n    transform: translate3d(0, 0, 0); }\n  .dialog-box .dialog-content {\n    position: relative;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dialog-box .dialog-para {\n    display: block; }\n  .dialog-box .dialog-btn {\n    display: block;\n    text-align: center; }\n';

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
            var dialog = self.dialog || null;
            self.click.apply(dialog, [e]);
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
                        this._resolved = true;
                        this.close();
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