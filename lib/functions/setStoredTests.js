"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setStoredTest = function (rawData) {
    var packagedData = JSON.stringify(rawData);
    window.localStorage.setItem('_BREADKNIFE_TESTS', packagedData);
};
exports.default = setStoredTest;
