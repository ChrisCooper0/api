"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dbConnection_1 = require("../dbConnection");
var validateKey = function (req, res, next) {
    var apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        res.status(403).send({ data: "Please provide an API Key" });
    }
    else {
        dbConnection_1.db.query("SELECT apiKey FROM user WHERE apiKey= ?", [apiKey], function (err, row) {
            if (err)
                return res.status(400).json(err);
            if (!row) {
                res.status(401).send({
                    data: "Invalid API Key",
                });
            }
            else {
                next();
            }
        });
    }
};
exports.default = validateKey;
