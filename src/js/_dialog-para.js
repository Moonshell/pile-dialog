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