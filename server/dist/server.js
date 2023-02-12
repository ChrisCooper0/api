"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var routes_1 = __importDefault(require("./routes/routes"));
var limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Stop sending requests please!",
});
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(limiter);
app.use("/api", routes_1.default);
app.listen(process.env.PORT, function () {
    console.log("\uD83D\uDE80 Server started on port ".concat(process.env.PORT));
});
