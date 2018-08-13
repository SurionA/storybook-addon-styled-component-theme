"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
var enzyme_1 = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
enzyme_1.configure({ adapter: new Adapter() });
global.requestAnimationFrame = function (callback) {
    setTimeout(callback, 0);
};
var matchMedia = function () {
    return {
        matches: false,
        addListener: null,
        removeListener: null,
    };
};
global.matchMedia = global.matchMedia || matchMedia;
//# sourceMappingURL=setupTests.js.map