module.exports = DialogPromise;

function DialogPromise() {
    var self = this;
    self.callbacks = [];
}

DialogPromise.prototype = {
    'construct': DialogPromise,
    'resolve': function (result) {
        this.complete("resolve", result);
    },
    'reject': function (result) {
        this.complete("reject", result);
    },
    'complete': function (type, result) {
        while (this.callbacks[0]) {
            var callback = this.callbacks.shift()[type];
            typeof(callback) === 'function' && callback(result);
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
