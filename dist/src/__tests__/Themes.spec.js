"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var React = require("react");
var sinon_1 = require("sinon");
var Themes_1 = require("../Themes");
describe("Themes spec", function () {
    it("should render proper", function () {
        var channel = {
            on: sinon_1.stub(),
            emit: sinon_1.stub(),
            removeListener: sinon_1.stub(),
        };
        var component = enzyme_1.mount(React.createElement(Themes_1.Themes, { api: null, channel: channel, active: true }));
        expect(component.render()).toMatchSnapshot();
        expect(channel.on.calledOnce).toBeTruthy();
        expect(channel.emit.notCalled).toBeTruthy();
        component.unmount();
        expect(channel.removeListener.calledOnce).toBeTruthy();
    });
});
//# sourceMappingURL=Themes.spec.js.map