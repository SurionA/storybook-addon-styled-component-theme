"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var Content = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 200px;\n  line-height: 200px;\n  text-align: center;\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid dimgrey;\n  border-radius: ", ";\n"], ["\n  width: 200px;\n  line-height: 200px;\n  text-align: center;\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid dimgrey;\n  border-radius: ", ";\n"])), function (props) { return props.theme.backgroundColor; }, function (props) { return props.theme.textColor; }, function (props) { return props.theme.borderRadius; });
exports.Demo = function () { return (React.createElement(Content, null, "Demo")); };
var templateObject_1;
//# sourceMappingURL=Demo.js.map