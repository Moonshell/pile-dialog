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
