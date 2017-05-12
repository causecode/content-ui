"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var radium_1 = require("radium");
var BasePage = (function (_super) {
    __extends(BasePage, _super);
    function BasePage() {
        return _super.apply(this, arguments) || this;
    }
    BasePage.prototype.render = function () {
        return (React.createElement(radium_1.StyleRoot, null, this.props.children));
    };
    return BasePage;
}(React.Component));
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map