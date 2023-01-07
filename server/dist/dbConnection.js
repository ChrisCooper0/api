"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mysql2_1 = require("mysql2");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.db = (0, mysql2_1.createConnection)({
    host: process.env.DB_HOST,
    user: "root",
    password: "P05t1tn0t3",
    database: process.env.DB_NAME,
});
