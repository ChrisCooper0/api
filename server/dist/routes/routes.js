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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validateKey_1 = __importDefault(require("../middleware/validateKey"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var createNewDBUser_1 = require("../utils/createNewDBUser");
var generateApiKey_1 = require("../utils/generateApiKey");
var dbConnection_1 = require("../dbConnection");
var router = express_1.default.Router();
// GET: api data
router.get("/", validateKey_1.default, function (_req, res) {
    return res.status(200).send({ data: "Success" });
});
// POST: user
router.post("/user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password;
    return __generator(this, function (_b) {
        _a = req.body, email = _a.email, password = _a.password;
        if (!email || !password) {
            return [2 /*return*/, res.status(400).send({
                    data: "Please provide ".concat(!email ? "an email address" : "a password"),
                })];
        }
        dbConnection_1.db.query("SELECT password FROM user WHERE email= ? LIMIT 1;", [email], function (err, row) {
            var json = row;
            if (err)
                return res.status(400).json(err);
            if (json.length) {
                var validPassword = bcryptjs_1.default.compareSync(password, json[0].password);
                if (!validPassword) {
                    return res.status(400).send({ data: "Incorrect password" });
                }
                else {
                    dbConnection_1.db.query("SELECT email, apiKey FROM user WHERE email= ? LIMIT 1;", [email], function (err, row) {
                        var json = row;
                        if (err)
                            return res.status(400).json(err);
                        if (json.length) {
                            return res.status(200).send({
                                apiKey: json[0].apiKey,
                            });
                        }
                        else {
                            return res.status(400).send({ data: "User does not exist" });
                        }
                    });
                }
            }
            else {
                return res.status(400).send({ data: "User does not exist" });
            }
        });
        return [2 /*return*/];
    });
}); });
// POST: reset account api key
router.post("/resetApiKey", function (req, res) {
    var apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        res.status(403).send({ data: "Please provide an API Key" });
        return;
    }
    var email = req.body.email;
    if (!email) {
        res.status(400).send({ data: "Please provide an email address" });
        return;
    }
    var newApiKey = (0, generateApiKey_1.generateApiKey)();
    dbConnection_1.db.query("UPDATE user SET apiKey= ? WHERE apiKey= ?;", [newApiKey, apiKey], function (err, row) {
        if (err)
            return res.status(400).json(err);
        if (!row)
            return res.status(400).send({ data: "No such apiKey exists" });
        return res
            .status(200)
            .send({ data: "New API key generated", apiKey: newApiKey });
    });
});
// POST: register new user
router.post("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, newEmail, password, hashedPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, newEmail = _a.email, password = _a.password;
                if (!newEmail || !password) {
                    return [2 /*return*/, res.status(400).send({
                            data: "Please provide ".concat(!newEmail ? "an email address" : "a password"),
                        })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                dbConnection_1.db.query("SELECT email FROM user WHERE email= ?;", [newEmail], function (err, row) {
                    var json = row;
                    if (err)
                        return res.status(400).json(err);
                    if (json.length) {
                        res.status(400).send({
                            data: "A user already exists with this email",
                        });
                    }
                    else {
                        (0, createNewDBUser_1.createNewDBUser)(res, dbConnection_1.db, newEmail, hashedPassword);
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
// DELETE user
router.delete("/deleteUser", function (req, res) {
    var email = req.body.email;
    dbConnection_1.db.query("DELETE FROM user WHERE email= ?;", [email], function (err, row) {
        var json = row;
        if (err)
            return res.status(400).json(err);
        if (json.length) {
            res.status(400).send({
                data: "Failed to delete account",
            });
        }
        else {
            return res.status(200).send({ data: "Account succesfully deleted" });
        }
    });
});
// PUT: update user password
router.put("/resetpassword", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, hashedPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email) {
                    // Generic error as email fetched from state
                    return [2 /*return*/, res.status(400).send({ data: "Error: Please try again" })];
                }
                if (!password) {
                    return [2 /*return*/, res.status(400).send({ data: "Please provide a new password" })];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
            case 1:
                hashedPassword = _b.sent();
                dbConnection_1.db.query("SELECT password FROM user WHERE email= ?;", [email], function (err, row) {
                    var json = row;
                    if (err)
                        return res.status(400).json(err);
                    if (json.length) {
                        var match = bcryptjs_1.default.compareSync(password, json[0].password);
                        if (match) {
                            return res.status(400).send({
                                data: "Your new password cannot be the same as your existing password",
                            });
                        }
                        else {
                            dbConnection_1.db.query("UPDATE user SET password= ? WHERE email= ?;", [hashedPassword, email], function (err, _data) {
                                if (err)
                                    return res.status(400).json(err);
                                return res.status(200).send({
                                    data: "Successfully updated password",
                                });
                            });
                        }
                    }
                    else {
                        // Generic error as email fetched from state
                        return res.status(400).send({ data: "Error: Please try again" });
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
