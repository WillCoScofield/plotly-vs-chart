"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const facilities_1 = __importDefault(require("./routes/facilities/facilities"));
const facilitiesV2_1 = __importDefault(require("./routes/facilities/facilitiesV2"));
const healthcheck_1 = __importDefault(require("./routes/actuators/healthcheck"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
const port = Number(process.env.PORT) || 8080;
app.use('/actuator', healthcheck_1.default);
app.use('/facilities', facilities_1.default);
app.use('/v2/facilities', facilitiesV2_1.default);
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map