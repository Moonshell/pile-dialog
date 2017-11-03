/**
 * {PROJECT_NAME}
 *
 * Ver {VERSION}
 * Date {TODAY}
 *
 * Created by krimeshu on 2016/1/13.
 */
(function () {
    var templateText = '#include("inc/_template.html", {"_inlineString": true})',
        styleText = '#include("css/dialog-px.css", {"_inlineString": true})',

        initializer = require('./js/_initializer.js');

    /****************************************/

    initializer.init({
        templateText: templateText,
        styleText: styleText
    });

    module.exports = initializer.expose();

})();