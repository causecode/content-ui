"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_router_1 = require("react-router");
var FontAwesome = require("react-fontawesome");
var PageAction = (function (_super) {
    __extends(PageAction, _super);
    function PageAction() {
        return _super.apply(this, arguments) || this;
    }
    PageAction.prototype.render = function () {
        var instance = this.props.instance;
        return (React.createElement("span", null,
            React.createElement(react_router_1.Link, { to: "/page/edit/" + instance.id },
                React.createElement(FontAwesome, { name: "pencil" })),
            React.createElement(react_router_1.Link, { to: "/page/show/" + instance.id },
                React.createElement(FontAwesome, { name: "location-arrow" }))));
    };
    return PageAction;
}(React.Component));
exports.PageAction = PageAction;
//# sourceMappingURL=PageAction.js.map