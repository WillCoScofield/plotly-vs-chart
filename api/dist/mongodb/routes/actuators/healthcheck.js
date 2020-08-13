"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../../database"));
const router = express_1.default.Router({});
router.get('/health', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    if (database_1.default.connection.readyState == 1) {
        try {
            res.send({
                status: "UP"
            });
        }
        catch (e) {
            res.status(503).send();
        }
    }
    else {
        res.status(503).send();
    }
}));
exports.default = router;
//# sourceMappingURL=healthcheck.js.map