"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getStoredTests = function () {
    var rawData = window.localStorage.getItem('_BREADKNIFE_TESTS') || '[]';
    return JSON.parse(rawData);
};
exports.default = getStoredTests;
