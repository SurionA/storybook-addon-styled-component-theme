"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addons_1 = require("@storybook/addons");
var React = require("react");
var Themes_1 = require("./Themes");
addons_1.default.register("storybook/themes", function (api) {
    // Also need to set a unique name to the panel.
    addons_1.default.addPanel("storybook/themes/panel", {
        title: "Themes",
        render: function (_a) {
            var active = _a.active;
            return (React.createElement(Themes_1.Themes, { channel: addons_1.default.getChannel(), api: api, active: active }));
        },
    });
});
//# sourceMappingURL=register.js.map