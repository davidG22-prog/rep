'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

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
//# sourceMappingURL=plugin.cjs.js.map
