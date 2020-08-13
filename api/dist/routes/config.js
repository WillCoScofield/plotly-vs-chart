"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
let configJson = null;
function configs() {
    if (configJson) {
        return configJson;
    }
    configJson = require('../config/config.json');
    return configJson;
}
exports.configs = configs;
exports.default = configs;
//# sourceMappingURL=config.js.map