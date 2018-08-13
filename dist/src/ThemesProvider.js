"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addons_1 = require("@storybook/addons");
var React = require("react");
var recompose_1 = require("recompose");
var styled_components_1 = require("styled-components");
var BaseComponent = function (_a) {
    var theme = _a.theme, children = _a.children;
    return (React.createElement(styled_components_1.ThemeProvider, { theme: theme }, children));
};
exports.ThemesProvider = recompose_1.compose(recompose_1.withState("theme", "setTheme", null), recompose_1.lifecycle({
    componentDidMount: function () {
        var _a = this.props, setTheme = _a.setTheme, themes = _a.themes;
        var channel = addons_1.default.getChannel();
        channel.on("selectTheme", setTheme);
        channel.emit("setThemes", themes);
    },
    componentWillUnmount: function () {
        var setTheme = this.props.setTheme;
        var channel = addons_1.default.getChannel();
        channel.removeListener("selectTheme", setTheme);
    },
}), recompose_1.branch(function (props) { return !props.theme; }, recompose_1.renderNothing))(BaseComponent);
//# sourceMappingURL=ThemesProvider.js.map