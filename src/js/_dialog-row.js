var dialogTypes = require('./_dialog-types.js'),
    dialogPrototypes = require('./_dialog-prototypes.js');

module.exports = DialogRow;

function DialogRow(opt) {
    var self = this;
    if (!(self instanceof DialogRow)) {
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