"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkIfTestSlicesEqual100 = function (config) {
    var versions = Object.keys(config.split);
    var totalPercent = 0;
    versions.forEach(function (version) { return (totalPercent += config.split[version] || 0); });
    if (totalPercent < 0.99 || totalPercent > 1)
        throw new Error('Test Split Total is not 100% please ensure all slices added together equals 1');
};
exports.default = checkIfTestSlicesEqual100;
