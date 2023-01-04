"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateApiKey = void 0;
var generateApiKey = function () {
    // Base-36 (a-z, 0-9) string that is always 30 chars long
    return __spreadArray([], Array(30), true).map(function () { return ((Math.random() * 36) | 0).toString(36); })
        .join("");
};
exports.generateApiKey = generateApiKey;
