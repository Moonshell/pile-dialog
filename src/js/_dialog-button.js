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

