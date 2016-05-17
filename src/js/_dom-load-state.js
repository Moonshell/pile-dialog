/**
 * Created by krimeshu on 2016/5/17.
 */

var _loaded = false,
    _cbs = [];

var DOMLoadState = module.exports = {
    isLoaded: function () {
        return _loaded;
    },
    whenLoad: function (cb) {
        _cbs.push(cb);
    },
    _bindEvent: function () {
        var self = this,
            onLoad = function () {
                self._onLoad();
            };
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', onLoad);
        } else if (window.addEventListener) {
            window.addEventListener('load', onLoad);
        } else if (window.attachEvent) {
            window.attachEvent('onload', onLoad);
        }
    },
    _onLoad: function () {
        _loaded = true;
        _cbs.forEach(function (cb) {
            cb && cb();
        });
    }
};

DOMLoadState._bindEvent();