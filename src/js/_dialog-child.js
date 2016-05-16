var dialogTypes = require('./_dialog-types.js'),
    dialogPrototypes = require('./_dialog-prototypes.js');

module.exports = DialogChild;

function DialogChild(opt) {
    var self = this;
    if (!self instanceof DialogChild) {
        return new DialogChild(opt);
    }

    self.dom = opt.dom;
}

dialogTypes.register('CHILD', DialogChild,
    [dialogPrototypes.ENTITY, dialogPrototypes.IN_CONTAINER],
    function parser(thing) {
        if (thing instanceof HTMLElement) {
            return new DialogChild({
                dom: thing
            });
        } else {
            return null;
        }
    },
    function comparator(instance, thing) {
        return instance === thing || instance.opt === thing ||
            (instance.dom === thing);
    }
);
