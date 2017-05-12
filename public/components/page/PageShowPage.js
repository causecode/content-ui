"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var Radium = require("radium");
var DOMPurify = require("dompurify");
var reusableComponents_1 = require("../reusableComponents");
var constants_1 = require("../../constants");
var PageShowPage = (function (_super) {
    __extends(PageShowPage, _super);
    function PageShowPage() {
        var _this = _super.apply(this, arguments) || this;
        _this.htmlToText = function (data) {
            if (data && data.length) {
                return { __html: "" + DOMPurify.sanitize(data) };
            }
            return null;
        };
        return _this;
    }
    PageShowPage.prototype.render = function () {
        var page = this.props && this.props.instance && this.props.instance.properties;
        if (!page) {
            return null;
        }
        return (React.createElement("div", { style: container },
            React.createElement(reusableComponents_1.Grid, { style: [constants_1.defaultFont] },
                React.createElement("h1", { style: [constants_1.title, constants_1.fontWeight(600), constants_1.fontSize(32)] }, page.title),
                React.createElement("h2", { style: [constants_1.fontSize(26), constants_1.fontWeight(400), subtitle] }, page.subTitle),
                React.createElement("div", { dangerouslySetInnerHTML: this.htmlToText(page.body) }))));
    };
    return PageShowPage;
}(React.Component));
PageShowPage.resourceName = 'page';
PageShowPage = __decorate([
    Radium
], PageShowPage);
exports.PageShowPage = PageShowPage;
var container = {
    marginTop: '30px',
};
var subtitle = {
    paddingTop: '30px',
};
//# sourceMappingURL=PageShowPage.js.map