"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mysql2_1 = require("mysql2");
exports.db = (0, mysql2_1.createConnection)({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "api",
    port: 3306,
});
