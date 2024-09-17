var capacitorPrivacyScreen = (function (exports, core) {
    'use strict';

    const PrivacyScreen = core.registerPlugin('PrivacyScreen', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.PrivacyScreenWeb()),
    });

    class PrivacyScreenWeb extends core.WebPlugin {
        async enable() {
            throw this.unimplemented('Not implemented on web.');
        }
        async disable() {
            throw this.unimplemented('Not implemented on web.');
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        PrivacyScreenWeb: PrivacyScreenWeb
    });

    exports.PrivacyScreen = PrivacyScreen;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
