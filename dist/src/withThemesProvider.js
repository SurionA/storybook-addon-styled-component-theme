"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var React = require("react");
var ThemesProvider_1 = require("./ThemesProvider");
exports.withThemesProvider = function (themes) { return function (story) {
    return React.createElement(ThemesProvider_1.ThemesProvider, { themes: immutable_1.List(themes) }, story());
}; };
//# sourceMappingURL=withThemesProvider.js.map