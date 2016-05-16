var dialogUtils = require('./_dialog-utils.js');

var types = {},
    parsers = {},
    comparators = {};

/**
 * 对话框相关类管理器
 */
module.exports = {
    register: function (name, constructor, prototypes, parser, comparator) {
        types[name] = constructor;
        parsers[name] = parser || null;
        comparators[name] = comparator || null;

        prototypes = prototypes || [];
        prototypes.splice(0, 0, {dialogType: name});
        constructor.prototype = dialogUtils.extend(prototypes);
    },
    getType: function (name) {
        return types[name];
    },
    // 尝试将参数转换成某种 对话框相关类
    tryParse: function (thing) {
        var typeObject;
        for (var name in types) {
            if (!types.hasOwnProperty(name)) {
                continue;
            }
            var parser = parsers[name];
            typeObject = parser && parser(thing);
            if (typeObject) {
                break;
            }
        }
        return typeObject || null;
    },
    compare: function (instance, thing) {
        var name = instance.dialogType,
            comparator = comparators[name];
        return comparator && comparator(instance, thing);
    }
};