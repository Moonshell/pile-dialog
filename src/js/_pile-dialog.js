var TRANSITION_TIME = 300;

var style = document.createElement('STYLE');
style.innerHTML = styleText;
document.body.appendChild(style);

//#include('_dialog-utils.js');

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
//#include('_dialog-prototypes.js');

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

//#include('_dialog-para.js');
//#include('_dialog-button.js');
//#include('_dialog-child.js');
//#include('_dialog-row.js');


//#include('_dialog-promise.js');

//#include('_default-dialogs.js');

window.PileDialog = PileDialog;