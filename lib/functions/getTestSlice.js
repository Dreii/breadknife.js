"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTestSlice = function (config, controlValue) {
    var splitKeys = Object.keys(config.split);
    if (splitKeys.length > 4)
        throw new Error('Breadknife does not support more than 4 slices in a test.');
    var min = 0;
    var max = min;
    var slices = splitKeys.map(function (slice, i) {
        var split = config.split[slice];
        if (!split)
            throw new Error('Invalid split found in configuration');
        min = max + 1;
        max += split * 100;
        return {
            min: min,
            max: max,
            value: slice,
        };
    });
    var diceRoll = Math.round(Math.random() * 100);
    while (splitKeys.length === 3 && diceRoll === 100)
        diceRoll = Math.round(Math.random() * 100);
    var selectedSlice = slices.find(function (sliceSearch) { return diceRoll >= sliceSearch.min && diceRoll <= sliceSearch.max; });
    return selectedSlice ? selectedSlice.value : controlValue;
};
exports.default = getTestSlice;
