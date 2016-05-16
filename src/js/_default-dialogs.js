var dialogUtils = require('./_dialog-utils.js');

var defaultDialogs = module.exports = {
    _pileDialog: null,
    _pageLoaded: false,
    _creators: {},
    createFor: function (pileDialog) {
        var self = this;
        self._pileDialog = pileDialog;

        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', function () {
                self._onLoad();
            });
        } else if (window.addEventListener) {
            window.addEventListener('load', function () {
                self._onLoad();
            });
        } else if (window.attachEvent) {
            window.attachEvent('onload', function () {
                self._onLoad();
            });
        }
    },
    define: function (opts) {
        for (var name in opts) {
            if (!opts.hasOwnProperty(name)) {
                continue;
            }
            this._creators[name] = opts[name];
        }
    },
    doCreate: function (name, creator) {
        this._pileDialog[name] = creator();
    },
    _onLoad: function () {
        this._pageLoaded = true;

    }
};

var onLoad = function () {
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

PileDialog.waitDefaultDialog('toastDialog', 'toast', function () {

});
PileDialog.waitDefaultDialog('alertDialog', 'alert', function () {

});
PileDialog.waitDefaultDialog('confirmDialog', 'confirm', function () {

});
