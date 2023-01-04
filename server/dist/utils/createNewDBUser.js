"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewDBUser = void 0;
var generateApiKey_1 = require("./generateApiKey");
var createNewDBUser = function (res, db, newEmail, hashedPassword) {
    var apiKey = (0, generateApiKey_1.generateApiKey)();
    var q = "INSERT INTO user (`email`, `password`, `apiKey`) VALUES (?)";
    var values = [newEmail, hashedPassword, apiKey];
    db.query(q, [values], function (err, _data) {
        if (err)
            return res.status(400).json(err);
        return res.status(200).send({
            data: "Successfully registered ".concat(newEmail),
            apiKey: apiKey,
        });
    });
};
exports.createNewDBUser = createNewDBUser;
