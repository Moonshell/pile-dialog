/**
 * Pile Dialog
 *
 * Ver 0.5.5
 * Date 2016/4/21
 *
 * Created by krimeshu on 2016/1/13.
 */
(function () {
    var templateText = '<div class=\"dialog-cover\"></div>\r\n<div class=\"dialog-box\">\r\n    <p class=\"dialog-title\"></p>\r\n    <a class=\"dialog-close-btn\"></a>\r\n\r\n    <div class=\"dialog-content\"></div>\r\n</div>\r\n',
        styleText = '@charset \"UTF-8\";\n/*Test: 20160402*/\nhtml {\n  font-size: 20px; }\n\nhtml {\n  font-size: 10px;\n  /* For iPhone6 (设计图原尺寸：750)*/ }\n  @media screen and (min-width: 320px) {\n    html {\n      font-size: 17px; } }\n  @media screen and (min-width: 360px) {\n    html {\n      font-size: 19.2px; } }\n  @media screen and (min-width: 375px) {\n    html {\n      font-size: 20px; } }\n  @media screen and (min-width: 414px) {\n    html {\n      font-size: 22px; } }\n\nbody {\n  font-size: 14px; }\n\n/* fragBegin: without-set-rem */\n.pile-dialog-wrap.default .dialog-box {\n  border-radius: 0.2rem;\n  background-color: #FFFFFF;\n  -webkit-box-shadow: 0 0 0.375rem rgba(0, 0, 0, 0.3);\n          box-shadow: 0 0 0.375rem rgba(0, 0, 0, 0.3);\n  margin: 0rem 0.4rem;\n  min-width: 40%; }\n  .pile-dialog-wrap.default .dialog-box .dialog-title {\n    height: 2.75rem;\n    line-height: 2.75rem;\n    margin: 0;\n    padding-left: 1.05rem;\n    padding-right: 1.05rem;\n    border-radius: 0.2rem 0.2rem 0rem 0rem;\n    position: relative;\n    background-color: #FFFFFF;\n    color: #333333;\n    font-size: 0.75rem; }\n    .pile-dialog-wrap.default .dialog-box .dialog-title::after {\n      content: \"\";\n      display: block;\n      position: absolute;\n      -webkit-transform-origin: center bottom;\n      transform-origin: center bottom;\n      width: 100%;\n      bottom: 0;\n      width: 200%;\n      left: -50%;\n      -webkit-transform: scale(0.5);\n      transform: scale(0.5);\n      border-bottom: 1px solid #DADADA; }\n  .pile-dialog-wrap.default .dialog-box .dialog-close-btn {\n    width: 1.4rem;\n    height: 1.4rem;\n    padding: 0.625rem 0.675rem 0.725rem 0.675rem; }\n    .pile-dialog-wrap.default .dialog-box .dialog-close-btn::after {\n      content: \"\";\n      display: block;\n      width: 1.4rem;\n      height: 1.4rem;\n      background: transparent url(\"data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozQzVBN0I0MTBEQjVFNTExOTg4N0JDNjUxNDI5NkNDQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEMEExQUI0QkI5QkIxMUU1ODEyN0MyOUFFOEE2MkIzMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEMEExQUI0QUI5QkIxMUU1ODEyN0MyOUFFOEE2MkIzMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDRiNGU5M2ItODQ0OS1kMTQ2LWFhN2EtNDhlZGI5ZDllOWZjIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNDNUE3QjQxMERCNUU1MTE5ODg3QkM2NTE0Mjk2Q0NCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+LzthDgAABstJREFUeNrsmmtsFFUUx8+W7WO7bbfEAD54WLQ8BASkAoaHwRREKRRqSxE0UhILBIlofMWPfDC826JijB/UD5oIpSmWgEkVsQgGaKKRAIkPyqstpcDutpSm27Lr+d89uzuzVMJ2Z2nFuclhpjP3nv/9zdy599yzWHw+H93LJY7u8WICmoAmoAloApqA/2dAa6QN8vLycvkwg20y2yG2HRUVFfW4525aGVVnHIM+DdcazIfVoncMeqy1JxKflkhCNRZED4rDLl9jm8nCJ40EZK0x8gD7h1X7jLWKDQdkwQw+nInjQV2w0E4ZD8fTgZp2OlbbgdsetgmffzLgtBGArDWaD7+xJUzJSqRZM21Ud7aTdlW2kderqgxnyDqjv8Hp+Gfqk0k0d3YyjcyMp1Ur0mjmtCRcTmA7XrS6eXS034zAHYdP+F7JGtCCJrS1fTEa0KZI4jWv30L0ytJUmjZVCdsxpBhyZBRwo2RY2uETvqERKAkJwVN7LAB/xj9HjnbQuQtdIQfsYcXLqTR5UiL+vI/tJ4YcESmctDkIH/AFn3Ga3kET2lIOGQ7IY/4UH77wdPpo63Y3XazXQxYXpdGkiQpyEFs1dzgzAjjUrUZb+MCw1MJBC5oej5ovvsSEFpN1kB0X8aG89bqXNpW6qeHSzeC9fv1IfZPjx6pxNJRtP3d8+B3Aoc5+tEHbVWFwjayxucxN0IQ292F5TBd6FigIQG4uddHl5hCklVfV11am0djRCvIRtr23g5R7e1EXbdDWqlmZ4XsTa7S0Krjdon1XIpklbHtcbi9tKHFR8xUtpIXWrkqjUSPUbIQZsZJBhnQDh2uVqIO6aIO2gQKf8A0NaInm3QnV+EneFMEqp9OrhtA1p1cz21nojTUOynxUQY4Lh9TAjUMd1EWbYOQgPp1+n1XQYs2unvTVEk3Siad1TNflbHMHDuhH772ZTv3TQ8+svd1HWz5005m6Tvx5lG0Rm0/gpgzPiKe31jrIZgvBOV08KrYFh/53bPkM19bTPlqizaoxpIMPu9hmP3C/HzItVQ+5kb+jc+fVCzgsl6cNG2qld9el6+DwrQGu0T95YVYtYDh3NP2zGJE2ZEjEi7vZZg1+yErvrHNQakoI8nobz7olbrogS8sQqZOiqROYmWX5+ZHtBYZzRts3i1F5UYYcKJDThw2x0tv8duzJFh0A3g4K3rL2AbTd8PEDcNH5i12BgAJwl43ol8XIxC9DDpLva2rGMIZ8XT8EZUakdId+CG8uc1HdOQX3C75Thmvqkxte3k2gY/lstejwto/c1NEReoAA08LhHuoIXK18c01G9snwHT1DYvO7Aed/8+x54pTnX+ueOOlRdaRsCGyc+zQgr3E5snTQkvwUyvLHp92WrCcSVR0p5TzEc/o0IMNly8JMBYvsNOcZm+7+6T86lWkL6qCulCqGzO6TgNyxp2XtooU5dnp+TrLu/p9/dVLpx25lONcW1EUbKdXsa0afAuQOTZa9HM1/Lply5+nhEMmU7PBvd2A413x7qqDNvLnBdjXis/cBuSMTJQyjZ7NtlLdAv9lGBINwDcsBl69hON/K186e14eX+bl25UPKUfHde4CS+VJw2bNsVJiXoruPyGXL9hAcz7DLYEHI7aHoJlDgA740kI/1CqAmORSP5NDSghRd/qShkTeqHHohTOOyU8ACSwnOd+Ie6qCuNs8DX5LMwnbkuGjdPUARROBsm/5UEi1fpk8ONV2+qaKTwC6cgQq7WS8LgxtnrnupSQ8Jn5LMwod5uKeQcT2ACySH+iNnWfSSHg4bVeweJCxD2FZ4G3e4V4m6m8r02QH4ROIJGpL8PSjasQMUgR/YBmIBR6JJmz+5es1LG0v0G1V+U97bRD1egVQbZ+wm4CM8mSXBAoL57yOFjIsADnUr2AZPeDzhlsyXv4Mu7qB6C/sEruMOQjuPQO5DW/hwOvWQ0Bo/TuV5VCaA+2KNxRtczzYGWeY1rzp0yaGWFt0Qw2L/Inf8RgTxazvaoK1KNLEvd4tXn8wqdmjzPOtjAaiii0Xz7To4tVEtcwcmiQNsi7nDLT0I0tFmMXzAF2ZXmaSCkNDW9sVowKtqd64RbWvzqeRQfUNXINuMYenq6ZTOuwmXDNea+sYu5RsawYfZGtRujgWgSpd/tes61f7aQb/zVgdpvQv+XfgRxNcM10xRFoa8Im/yCHxDA1rQhHakqftIfx/8FuFm2GWkGAq5Yw0G/z74IB++oVt/SapirQUxS1mw8Dr5BrAA4xfXDzT3on173em9L3o3RK+013IyfbGY/8vCBDQBTUAT0AQ0AU3A/275R4ABAE3qKMAyYJjGAAAAAElFTkSuQmCC\") no-repeat scroll 0 0;\n      background-size: 1.4rem 1.4rem; }\n  .pile-dialog-wrap.default .dialog-box .dialog-content {\n    padding-bottom: 1.25rem;\n    border-radius: 0.2rem 0.2rem 0rem 0rem;\n    background-color: #FFFFFF;\n    color: #333333;\n    font-size: 0.7rem; }\n    .pile-dialog-wrap.default .dialog-box .dialog-content .weak {\n      color: #868686; }\n    .pile-dialog-wrap.default .dialog-box .dialog-content .small {\n      font-size: 0.6rem; }\n    .pile-dialog-wrap.default .dialog-box .dialog-content .del {\n      text-decoration: line-through; }\n    .pile-dialog-wrap.default .dialog-box .dialog-content .em {\n      font-style: normal;\n      text-shadow: 0 0 4px #FCF988; }\n    .pile-dialog-wrap.default .dialog-box .dialog-content .link {\n      display: inline-block;\n      padding: 0.1rem 0rem;\n      color: #E65D52;\n      border-bottom: 1px solid #E65D52; }\n  .pile-dialog-wrap.default .dialog-box .dialog-para {\n    margin: 1.25rem 1.05rem 0rem 1.05rem;\n    padding: 0; }\n  .pile-dialog-wrap.default .dialog-box .dialog-btn {\n    margin: 1.25rem 1.05rem 0rem 1.05rem;\n    padding: 0rem 0.5rem;\n    height: 2rem;\n    line-height: 2rem;\n    border-radius: 0.15rem;\n    border: 2px solid #767676;\n    background-color: #FDF986;\n    color: #545253;\n    font-size: 0.75rem;\n    text-align: center; }\n    .pile-dialog-wrap.default .dialog-box .dialog-btn:active {\n      background-color: #827e02; }\n    .pile-dialog-wrap.default .dialog-box .dialog-btn[disabled] {\n      background-color: #C5C5C5; }\n\n.pile-dialog-wrap.flat {\n  top: auto;\n  bottom: 0;\n  -webkit-box-align: end;\n  -webkit-align-items: flex-end;\n          align-items: flex-end; }\n  .pile-dialog-wrap.flat .dialog-box {\n    background-color: #FFFFFF;\n    width: 100%; }\n    .pile-dialog-wrap.flat .dialog-box .dialog-title {\n      height: 2.5rem;\n      line-height: 2.5rem;\n      color: #333333;\n      text-align: center;\n      font-size: 0.8rem; }\n    .pile-dialog-wrap.flat .dialog-box .dialog-close-btn {\n      display: none; }\n    .pile-dialog-wrap.flat .dialog-box .dialog-content {\n      color: #535252;\n      font-size: 0.7rem; }\n      .pile-dialog-wrap.flat .dialog-box .dialog-content .weak {\n        color: #969696; }\n      .pile-dialog-wrap.flat .dialog-box .dialog-content .small {\n        font-size: 0.6rem; }\n      .pile-dialog-wrap.flat .dialog-box .dialog-content .del {\n        text-decoration: line-through; }\n      .pile-dialog-wrap.flat .dialog-box .dialog-content .em {\n        font-style: normal;\n        text-shadow: 0 0 4px #E86A3E; }\n    .pile-dialog-wrap.flat .dialog-box .dialog-para {\n      margin: 1.25rem 1.75rem 0rem 1.75rem;\n      padding: 0; }\n    .pile-dialog-wrap.flat .dialog-box .dialog-btn {\n      margin: 1.25rem 0rem 0rem 0rem;\n      padding: 0;\n      height: 3rem;\n      line-height: 3rem;\n      position: relative;\n      background-color: #F5F5EE;\n      color: #535252;\n      font-size: 0.8rem;\n      text-align: center; }\n      .pile-dialog-wrap.flat .dialog-box .dialog-btn::before {\n        content: \"\";\n        display: block;\n        position: absolute;\n        -webkit-transform-origin: center top;\n        transform-origin: center top;\n        width: 100%;\n        top: 0;\n        width: 200%;\n        left: -50%;\n        -webkit-transform: scale(0.5);\n        transform: scale(0.5);\n        border-top: 1px solid #C5C5C5; }\n\n.pile-dialog-wrap.toast {\n  top: auto;\n  bottom: 3.75rem;\n  height: auto; }\n  .pile-dialog-wrap.toast .dialog-box {\n    display: inline-block;\n    background-color: rgba(40, 40, 40, 0.95);\n    border-radius: 2.5rem;\n    margin: 0 auto; }\n    .pile-dialog-wrap.toast .dialog-box .dialog-title {\n      height: 2.5rem;\n      line-height: 2.5rem;\n      color: #333333;\n      text-align: center;\n      font-size: 0.8rem; }\n    .pile-dialog-wrap.toast .dialog-box .dialog-close-btn {\n      display: none; }\n    .pile-dialog-wrap.toast .dialog-box .dialog-content {\n      color: #C5C5C5;\n      font-size: 0.65rem; }\n      .pile-dialog-wrap.toast .dialog-box .dialog-content .weak {\n        color: #969696; }\n      .pile-dialog-wrap.toast .dialog-box .dialog-content .small {\n        font-size: 0.6rem; }\n      .pile-dialog-wrap.toast .dialog-box .dialog-content .del {\n        text-decoration: line-through; }\n      .pile-dialog-wrap.toast .dialog-box .dialog-content .em {\n        font-style: normal;\n        text-shadow: 0 0 4px #E86A3E; }\n    .pile-dialog-wrap.toast .dialog-box .dialog-para {\n      height: 2.5rem;\n      line-height: 2.5rem;\n      padding: 0rem 1.75rem; }\n\n.pile-dialog-wrap {\n  display: none;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1000000;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  pointer-events: none; }\n  .pile-dialog-wrap.open {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex; }\n  .pile-dialog-wrap .dialog-box, .pile-dialog-wrap .dialog-cover {\n    pointer-events: auto; }\n\n.dialog-cover {\n  position: fixed;\n  z-index: 1000001;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  -webkit-transition: opacity 300ms ease;\n  transition: opacity 300ms ease;\n  opacity: 0; }\n  .dialog-cover.show {\n    opacity: .25; }\n\n.dialog-box {\n  position: relative;\n  z-index: 1000002;\n  overflow: hidden;\n  -webkit-transition: opacity 300ms ease, -webkit-transform 300ms ease;\n  transition: opacity 300ms ease, -webkit-transform 300ms ease;\n  transition: transform 300ms ease, opacity 300ms ease;\n  transition: transform 300ms ease, opacity 300ms ease, -webkit-transform 300ms ease;\n  -webkit-transform: translate3d(0, 100%, 0);\n          transform: translate3d(0, 100%, 0);\n  opacity: 0;\n  text-align: left; }\n  .dialog-box.show {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    opacity: 1; }\n  .dialog-box .dialog-title {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    overflow: hidden; }\n  .dialog-box .dialog-close-btn {\n    display: block;\n    position: absolute;\n    top: 0;\n    right: 0;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n    cursor: pointer; }\n  .dialog-box .dialog-content {\n    position: relative;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dialog-box .dialog-para {\n    display: block; }\n  .dialog-box .dialog-btn {\n    display: block;\n    text-align: center;\n    cursor: pointer; }\n  .dialog-box .dialog-row {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex; }\n\n/* fragEnd: without-set-rem */\n';

    /****************************************/

    var TRANSITION_TIME = 300;

var style = document.createElement('STYLE');
style.innerHTML = styleText;
document.body.appendChild(style);

var utils = {
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
;

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
var PROTOTYPES = PileDialog.PROTOTYPES = {
    ENTITY: {
        'dialogType': TYPES.CHILD,
        'setAttr': function (attr, value) {
            var self = this;
            self.dom.setAttribute(attr, value);
        },
        'removeAttr': function (attr) {
            var self = this;
            self.dom.removeAttribute(attr);
        },
        'setText': function (text) {
            var self = this;
            self.dom.innerHTML = text;
        },
        'setStyle': function (style) {
            var self = this,
                dom = self.dom;
            for (var name in style) {
                if (!style.hasOwnProperty(name)) {
                    continue;
                }
                dom.style[name] = style[name];
            }
        },
        'show': function () {
            var self = this;
            self.dom.style.display = 'block';
        },
        'hide': function () {
            var self = this;
            self.dom.style.display = 'none';
        }
    },
    CONTAINER: {
        'prepend': function (thing, _index) {
            var self = this,
                child = self._recognize(thing);
            self._prepend(child, _index);
        },
        'append': function (thing) {
            var self = this,
                child = self._recognize(thing);
            self._append(child);
        },
        '_recognize': function (thing) {
            var type = Object.prototype.toString.apply(thing),
                child = null;
            if (thing.dialogType) {
                // 追加 Dialog.Child 对象
                child = thing;
            } else if (type === '[object String]') {
                // 追加 字符串（自动转为 Dialog.Para 对象）
                child = new PileDialog.Para({
                    text: thing
                });
            } else if (type === '[object Object]' &&
                typeof thing.text === 'string' &&
                typeof thing.click === 'function') {
                // 追加 按键（自动转为 Dialog.Button 对象）
                child = new PileDialog.Button(thing);
            } else if (/\[object HTML.*?Element]/i.test(type)) {
                // 追加 DOM（自动转为 Dialog.Child 对象）
                child = new PileDialog.Child({
                    dom: thing
                });
            }
            if (!child) {
                // 无法识别，放弃
                return null;
            }
            return child;
        },
        '_prepend': function (child, _index) {
            var self = this,
                index = _index | 0,
                children = self.children
            // 添加前，先从原有 parent 和 Dialog 中移除
            if (child._parent) {
                child._parent.remove(child);
            }
            child._parent = self;
            children.splice(index, 0, child);
            var nextNode = utils.getChildElem(self.dom, index);
            if (nextNode) {
                self.dom.insertBefore(child.dom, nextNode);
            } else {
                self.dom.appendChild(child.dom);
            }
        },
        '_append': function (child) {
            var self = this,
                children = self.children;
            // 添加前，先从原有 parent 和 Dialog 中移除
            if (child._parent) {
                child._parent.remove(child);
            }
            child._parent = self;
            children.push(child);
            self.dom.appendChild(child.dom);
        },
        'find': function (thing) {
            var self = this,
                children = self.children,
                type = Object.prototype.toString.apply(thing),
                child = null;
            if (thing.dialogType && children.indexOf(thing) >= 0) {
                // 寻找的是 Dialog.Child 对象
                child = thing;
            } else if (type === '[object Number]') {
                // 寻找的是 Dialog.Child 对象序号
                if (thing < 0) {
                    thing = children.length + thing;
                }
                child = children[thing];
            } else if (type === '[object String]') {
                // 寻找的是 字符串（尝试识别为 Dialog.Para 对象）
                children.forEach(function (_child) {
                    var match = (_child.text === thing);
                    if (_child.dialogType === TYPES.PARA && match) {
                        child = _child;
                    }
                });
            } else if (type === '[object Object]' &&
                typeof thing.text === 'string' &&
                typeof thing.click === 'function') {
                // 寻找的是 按键（尝试识别为 Dialog.Button 对象）
                children.forEach(function (_child) {
                    var match = (_child.opt === thing || (_child.text === thing.text && _child.click === thing.click));
                    if (_child.dialogType === TYPES.BUTTON && match) {
                        child = _child;
                    }
                });
            } else if (/\[object HTML.*?Element]/i.test(type)) {
                // 寻找的是 DOM（尝试识别为 Dialog.Child 对象）
                children.forEach(function (_child) {
                    var match = (_child.dom === thing);
                    if (_child.dialogType === TYPES.CHILD && match) {
                        child = _child;
                    }
                });
            }
            return child;
        },
        'remove': function (thing) {
            var self = this,
                child = self.find(thing);
            if (!child) {
                // 无法识别，放弃
                return;
            }
            this._remove(child);
        },
        '_remove': function (child) {
            var self = this,
                children = self.children;
            delete child._parent;
            children.splice(children.indexOf(child), 1);
            self.dom.removeChild(child.dom);
        },
        'clear': function () {
            var self = this,
                children = self.children,
                len = children.length;
            for (var i = 0, child; (i < len) && (child = children[i]); i++) {
                delete child._parent;
            }
            self.children = [];
            self.dom.innerHTML = '';
        },
        'setContent': function (content) {
            var self = this,
                arr = content.length === undefined ? [content] : content;

            self.clear();
            for (var i = 0, len = arr.length; i < len; i++) {
                self.append(content[i]);
            }
        }
    },
    IN_CONTAINER: {
        'prev': function () {
            var self = this,
                parent = self && self._parent,
                children = parent && parent.children,
                pos = children && children.indexOf(self);
            return pos >= 0 && parent && parent.find && parent.find(pos - 1);
        },
        'next': function () {
            var self = this,
                parent = self && self._parent,
                children = parent && parent.children,
                pos = children && children.indexOf(self);
            return pos >= 0 && parent && parent.find && parent.find(pos + 1);
        },
        'parent': function () {
            var self = this;
            return self._parent;
        },
        'dialog': function () {
            var self = this;
            while (self && !(self instanceof PileDialog)) {
                self = self._parent;
            }
            return self;
        }
    }
};
;

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

PileDialog.Para = function (opt) {
    var self = this;
    if (!self instanceof PileDialog.Child) {
        return new PileDialog.Child(opt);
    }

    var text = opt.text || '',
        style = opt.style || {},
        className = opt.className || 'dialog-para';

    self.text = opt.text;

    self.dom = document.createElement('P');
    self.dom.className = className;
    self.dom.innerHTML = text;

    self.setStyle(style);
};


PileDialog.Para.prototype = utils.extend({
    dialogType: TYPES.PARA
}, PROTOTYPES.ENTITY, PROTOTYPES.IN_CONTAINER);
;
PileDialog.Button = function (opt) {
    var self = this;
    if (!self instanceof PileDialog.Child) {
        return new PileDialog.Child(opt);
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
};

PileDialog.Button.prototype = utils.extend({
    dialogType: TYPES.BUTTON
}, PROTOTYPES.ENTITY, PROTOTYPES.IN_CONTAINER);
;
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
;
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
;


var Promise = PileDialog.Promise = function () {
    this.callbacks = [];
};

Promise.prototype = {
    'construct': Promise,
    'resolve': function (result) {
        this.complete("resolve", result);
    },
    'reject': function (result) {
        this.complete("reject", result);
    },
    'complete': function (type, result) {
        while (this.callbacks[0]) {
            this.callbacks.shift()[type](result);
        }
    },
    'then': function (successHandler, failedHandler) {
        this.callbacks.push({
            resolve: successHandler,
            reject: failedHandler
        });
        return this;
    }
};
;

PileDialog.createDefaultDialogs = function () {
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

        if (!utils.isArray(contents)) {
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

        if (!utils.isArray(contents)) {
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

PileDialog.waitDefaultDialog('toastDialog', 'toast');
PileDialog.waitDefaultDialog('alertDialog', 'alert');
PileDialog.waitDefaultDialog('confirmDialog', 'confirm');

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', PileDialog.createDefaultDialogs);
} else if (window.addEventListener) {
    window.addEventListener('load', PileDialog.createDefaultDialogs);
} else if (window.attachEvent) {
    window.attachEvent('onload', PileDialog.createDefaultDialogs);
};

window.PileDialog = PileDialog;;
})();