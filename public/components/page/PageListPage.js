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
var react_hero_1 = require("react-hero");
var PageAction_1 = require("./PageAction");
var constants_1 = require("../../constants");
var react_router_1 = require("react-router");
var FontAwesome = require("react-fontawesome");
var PageListPage = (function (_super) {
    __extends(PageListPage, _super);
    function PageListPage() {
        var _this = _super.apply(this, arguments) || this;
        _this.renderHeader = function () {
            return (React.createElement("div", null,
                React.createElement("h1", { style: [constants_1.title, constants_1.fontWeight(600), constants_1.fontSize(32)] },
                    "Pages",
                    React.createElement(react_router_1.Link, { to: "/page/create" },
                        React.createElement(FontAwesome, { name: "plus", style: constants_1.fontSize(26) })))));
        };
        return _this;
    }
    PageListPage.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(react_hero_1.AlertDismissable, null),
            React.createElement("div", { style: listContainer },
                React.createElement(react_hero_1.PagedList, { resource: PageListPage.resourceName, max: 15, customActions: PageAction_1.PageAction, pageHeader: this.renderHeader() },
                    React.createElement(react_hero_1.DropDownFilter, { label: "Sort", paramName: "sort", possibleValues: [
                            { label: 'Date Created', value: 'dateCreated' },
                            { label: 'Last Updated', value: 'lastUpdated' },
                            { label: 'Title', value: 'title' },
                        ] }),
                    React.createElement(react_hero_1.DropDownFilter, { label: "Order", paramName: "order", possibleValues: [
                            { label: 'Ascending', value: 'asc' },
                            { label: 'Descending', value: 'desc' },
                        ] }),
                    React.createElement(react_hero_1.DropDownFilter, { label: "Published", paramName: "publish", possibleValues: [
                            { label: 'True', value: 'true' },
                            { label: 'False', value: 'false' },
                        ] })))));
    };
    return PageListPage;
}(React.Component));
PageListPage.resourceName = 'page';
PageListPage = __decorate([
    Radium
], PageListPage);
exports.PageListPage = PageListPage;
var listContainer = {
    marginTop: '80px',
    padding: '0px 30px',
};
//# sourceMappingURL=PageListPage.js.map