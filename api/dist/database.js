"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_CONNECTION_URL } = process.env;
console.log("Connecting to Database using DB Connection String: " + `${DB_CONNECTION_URL}`);
mongoose_1.default.connect(`${DB_CONNECTION_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose_1.default.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});
exports.default = mongoose_1.default;
//# sourceMappingURL=database.js.map