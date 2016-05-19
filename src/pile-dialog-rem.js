/**
 * Pile Dialog
 *
 * Ver {VERSION}
 * Date 2016/5/17
 *
 * Created by krimeshu on 2016/1/13.
 */
(function () {
    'browserify entry';

    var templateText = '#include("inc/_template.html", {"_inlineString": true})',
        styleText = '#include("css/dialog-rem.css", {"_inlineString": true})',

        initializer = require('./js/_initializer.js');

    /****************************************/

    initializer.init({
        templateText: templateText,
        styleText: styleText
    });

    module.exports = initializer.expose();

})();