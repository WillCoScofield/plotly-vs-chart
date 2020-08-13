"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use_mongodb_for_facilities = exports.configs = void 0;
let configJson = null;
function configs() {
    if (configJson) {
        return configJson;
    }
    configJson = require('../config/config.json');
    return configJson;
}
exports.configs = configs;
function use_mongodb_for_facilities() {
    var use_mongodb = false;
    if ('use-mongodb' in configs().facilities.data) {
        use_mongodb = configs().facilities.data['use-mongodb'];
    }
    return use_mongodb;
}
exports.use_mongodb_for_facilities = use_mongodb_for_facilities;
exports.default = configs;
//# sourceMappingURL=config.js.map