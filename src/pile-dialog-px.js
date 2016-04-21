/**
 * Pile Dialog
 *
 * Ver {VERSION}
 * Date 2016/4/21
 *
 * Created by krimeshu on 2016/1/13.
 */
(function () {
    var TRANSITION_TIME = 300,
        TYPE = {
            DIALOG: 'DIALOG',
            PARA: 'PARAGRAPH',
            BUTTON: 'BUTTON',
            CHILD: 'CHILD',
            OTHER: 'OTHER'
        };

    var templateText = '#include("inc/_template.html", {"_inlineString": true})',
        styleText = '#include("css/dialog-px.css", {"_inlineString": true, "_fragName": "without-set-rem"})';

    var style = document.createElement('STYLE');
    style.innerHTML = styleText;
    document.body.appendChild(style);

    /****************************************/

    //#include(_pile-dialog.js);
})();