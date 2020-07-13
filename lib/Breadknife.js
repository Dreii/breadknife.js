"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOUR_WAY = exports.THREE_WAY = exports.HALF_AND_HALF = void 0;
var functions_1 = require("./functions/");
var Breadknife = /** @class */ (function () {
    function Breadknife() {
        this.tests = [];
        this.states = {
            TEST: 'TEST',
            TEST_B: 'TEST_B',
            TEST_C: 'TEST_C',
            CONTROL: 'CONTROL',
        };
    }
    Breadknife.prototype.init = function (configuration) {
        var _this = this;
        this.tests = functions_1.getStoredTests() || [];
        this.tests = this.tests.filter(function (oldTest) { return !!configuration.find(function (newTest) { return oldTest.id === newTest.id; }); });
        var testIds = [];
        configuration.forEach(function (config) {
            if (!config.id || testIds.find(function (otherId) { return otherId === config.id; }))
                throw new Error('Configuration must have unique ID');
            testIds.push(config.id);
            var exsistingTest = _this.tests.find(function (oldTest) { return oldTest.id === config.id; });
            if (config.disabled && exsistingTest)
                exsistingTest.slice = _this.states.CONTROL;
            if (exsistingTest)
                return;
            functions_1.checkIfTestSlicesEqual100.bind(config);
            var slice = functions_1.getTestSlice(config, _this.states.CONTROL);
            _this.tests.push(__assign(__assign({}, config), { slice: slice }));
        });
        functions_1.setStoredTests(this.tests);
    };
    Breadknife.prototype.getTests = function () {
        return this.tests;
    };
    Breadknife.prototype.getTestSlice = function (id) {
        var foundTest = this.tests.find(function (testSearch) { return testSearch.id === id; });
        return (foundTest && foundTest.slice) || this.states.CONTROL;
    };
    Breadknife.prototype.forceTestSlice = function (id, state) {
        var testIndex = this.tests.findIndex(function (testSearch) { return testSearch.id === id; });
        if (testIndex >= 0) {
            this.tests[testIndex].slice = state;
        }
        else {
            throw new Error('Id given for non exsisting test.');
        }
    };
    return Breadknife;
}());
var breadknife = new Breadknife();
exports.default = breadknife;
exports.HALF_AND_HALF = {
    CONTROL: 0.5,
    TEST: 0.5,
};
exports.THREE_WAY = {
    CONTROL: 0.33,
    TEST: 0.33,
    TEST_B: 0.33,
};
exports.FOUR_WAY = {
    CONTROL: 0.25,
    TEST: 0.25,
    TEST_B: 0.25,
    TEST_C: 0.25,
};
