"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var React = require("react");
var recompose_1 = require("recompose");
var BaseComponent = function (_a) {
    var onSelectTheme = _a.onSelectTheme, themes = _a.themes, theme = _a.theme;
    return (React.createElement("div", { style: RowStyle }, themes.map(function (th, i) {
        var buttonStyle = th === theme ? SelectedButtonStyle : ButtonStyle;
        return React.createElement("div", { style: buttonStyle, key: i, onClick: function () { return onSelectTheme(th); } }, th.name);
    }).toArray()));
};
exports.Themes = recompose_1.compose(recompose_1.withState("theme", "setTheme", null), recompose_1.withState("themes", "setThemes", immutable_1.List()), recompose_1.withHandlers({
    onSelectTheme: function (_a) {
        var channel = _a.channel, setTheme = _a.setTheme, api = _a.api;
        return function (theme) {
            setTheme(theme);
            api.setQueryParams({ theme: theme.name });
            channel.emit("selectTheme", theme);
        };
    },
    onReceiveThemes: function (_a) {
        var setTheme = _a.setTheme, setThemes = _a.setThemes, channel = _a.channel, api = _a.api;
        return function (newThemes) {
            var themes = immutable_1.List(newThemes);
            var themeName = api.getQueryParam("theme");
            setThemes(immutable_1.List(themes));
            if (themes.count() > 0) {
                var theme = themes.find(function (t) { return t.name === themeName; }) || themes.first();
                setTheme(theme);
                channel.emit("selectTheme", theme);
            }
        };
    },
}), recompose_1.lifecycle({
    componentDidMount: function () {
        var _a = this.props, channel = _a.channel, onReceiveThemes = _a.onReceiveThemes;
        channel.on("setThemes", onReceiveThemes);
    },
    componentWillUnmount: function () {
        var _a = this.props, channel = _a.channel, onReceiveThemes = _a.onReceiveThemes;
        channel.removeListener("setThemes", onReceiveThemes);
    },
}), recompose_1.branch(function (_a) {
    var theme = _a.theme, active = _a.active;
    return !theme || !active;
}, recompose_1.renderNothing))(BaseComponent);
var RowStyle = {
    margin: "10px",
    display: "flex",
    flexWrap: "wrap",
    height: "45px",
    padding: "15px",
};
var ButtonStyle = {
    flex: 1,
    border: "1px solid #BBB",
    borderRadius: "6px",
    color: "#BBB",
    padding: "13px",
    margin: "10px",
    cursor: "pointer",
    // tslint:disable-next-line:max-line-length
    fontFamily: "-apple-system, \".SFNSText-Regular\", \"San Francisco\", BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", \"Lucida Grande\", \"Arial\", sans-serif",
    lineHeight: "25px",
};
var SelectedButtonStyle = __assign({}, ButtonStyle, { backgroundColor: "#BBB", color: "#333", fontWeight: "bold" });
//# sourceMappingURL=Themes.js.map