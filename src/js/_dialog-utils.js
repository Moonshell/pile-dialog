var dialogUtils = {
    NODE_TYPES: {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    },
    extend: function (extPrototype, basePrototype) {
        var undefined = void(0),
            basePrototypes = Array.prototype.slice.call(arguments, 1);
        while (basePrototype = basePrototypes.shift()) {
            for (var p in basePrototype) {
                if (basePrototype.hasOwnProperty(p) && extPrototype[p] === undefined) {
                    extPrototype[p] = basePrototype[p];
                }
            }
        }
        return extPrototype;
    },
    isArray: function (tar) {
        return Object.prototype.toString.call(tar) === '[object Array]'
    },
    getChildElem: function (dom, index) {
        var childNodes = dom.childNodes,
            TYPES = this.NODE_TYPES,
            _pos = 0, _index = 0, node;
        while (node = childNodes[_pos++]) {
            if (node.nodeType === TYPES.ELEMENT_NODE) {
                if (index !== _index) {
                    _index++;
                    continue;
                }
                break;
            }
        }
        return node;
    },
    getPrevElem: function (dom) {
        do {
            dom = dom.previousSibling;
        }
        while (dom && dom.nodeType !== 1);
        return dom;
    },
    getNextElem: function (dom) {
        do {
            dom = dom.nextSibling;
        }
        while (dom && dom.nodeType !== 1);
        return dom;
    }
};

module.exports = dialogUtils;