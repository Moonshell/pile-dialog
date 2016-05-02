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
