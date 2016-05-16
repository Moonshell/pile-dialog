var dialogUtils = require('./_dialog-utils.js'),

    Promise = require('./_dialog-promise.js'),

    Dialog = require('./_dialog.js'),
    DialogChild = require('./_dialog-child.js'),
    DialogPara = require('./_dialog-para.js'),
    DialogButton = require('./_dialog-button.js'),
    DialogRow = require('./_dialog-row.js');

window.PileDialog = Dialog;
window.PileDialogChild = DialogChild;
window.PileDialogPara = DialogPara;
window.PileDialogButton = DialogButton;
window.PileDialogRow = DialogRow;

var initializer = module.exports = {
    _initialized: false,
    _pageLoaded: false,
    _creators: [],
    init: function (opts) {
        var self = this,
            initialized = self._initialized,
            pageLoaded = self._pageLoaded,
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

        // Todo: 此处逻辑有误，请检查
        if (pageLoaded) {
            self.doCreate();
        } else {
            self._bindLoadEvent(function () {
                self.doCreate();
            });
        }
    },
    _createStyle: function (styleText) {
        var style = document.createElement('STYLE');
        style.innerHTML = styleText;
        document.body.appendChild(style);
    },
    _bindLoadEvent: function (cb) {
        var self = this,
            onLoad = function () {
                self._pageLoaded = true;
                cb && cb();
            };
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', onLoad);
        } else if (window.addEventListener) {
            window.addEventListener('load', onLoad);
        } else if (window.attachEvent) {
            window.attachEvent('onload', onLoad);
        }
    },
    doCreate: function () {
        this._pageLoaded = true;

        var creators = this._creators;
        creators.forEach(function (creator) {
            creator();
        });
    },
    lazyCreate: function (dialogName, funcName, creator) {
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
        this._creators.push(creator);
    }
};

initializer.lazyCreate('toastDialog', 'toast', function () {
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
});

initializer.lazyCreate('alertDialog', 'alert', function () {
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

        dialog._promise = promise;
        dialog._resolved = false;

        dialog.open();
        return promise;
    };
});

initializer.lazyCreate('confirmDialog', 'confirm', function () {
    PileDialog.confirmDialog = new PileDialog({
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
