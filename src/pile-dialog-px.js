/**
 * Pile Dialog
 *
 * Ver {VERSION}
 * Date 2016/4/21
 *
 * Created by krimeshu on 2016/1/13.
 */
(function () {
    'browserify entry';

    var templateText = '#include("inc/_template.html", {"_inlineString": true})',
        styleText = '#include("css/dialog-px.css", {"_inlineString": true})',

        PileDialog = require('./js/_pile-dialog.js'),
        DialogChild = require('./js/_dialog-child.js'),
        DialogPara = require('./js/_dialog-para.js'),
        DialogButton = require('./js/_dialog-button.js'),
        DialogRow = require('./js/_dialog-row.js'),

        DefaultDialogs = require('./js/_default-dialogs.js');

    module.exports = PileDialog;

    /****************************************/

    PileDialog.setOptions({
        TEMPLATE_TEXT: templateText,
        STYLE_TEXT: styleText
    });

    PileDialog.Child = DialogChild;
    PileDialog.Para = DialogPara;
    PileDialog.Button = DialogButton;
    PileDialog.Row = DialogRow;

    window.PileDialog = PileDialog;

    DefaultDialogs.startCreate();
})();