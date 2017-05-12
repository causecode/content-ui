"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_hero_1 = require("react-hero");
var react_bootstrap_1 = require("react-bootstrap");
var constants_1 = require("../../constants");
var react_router_1 = require("react-router");
var store_1 = require("../../store");
var reusableComponents_1 = require("../reusableComponents");
var PageEditPage = (function (_super) {
    __extends(PageEditPage, _super);
    function PageEditPage() {
        var _this = _super.apply(this, arguments) || this;
        _this.componentWillMount = function () {
            react_hero_1.hideAlert();
        };
        _this.goToListingPage = function () {
            react_router_1.browserHistory.push('/page/list');
        };
        _this.fetchPageInstance = function () {
            var instance = _this.props.instance;
            var instanceKey = _this.getFormKey();
            if (store_1.store.getState() && store_1.store.getState().forms) {
                instance.properties = store_1.store.getState().forms["rhForms"][instanceKey].properties;
            }
            return instance;
        };
        _this.handleSubmit = function (e) {
            e.preventDefault();
            _this.props.handleSubmit(_this.fetchPageInstance(), function (response) {
                react_hero_1.showAlert('success', "Page " + (_this.props.isCreatePage ? 'created' : 'updated') + " successfully", 7000);
                _this.goToListingPage();
            }, function () {
                react_hero_1.showAlert('warning', 'Something went wrong while saving the data.');
            });
        };
        _this.renderButton = function (buttonText) {
            return (React.createElement(react_bootstrap_1.Button, { style: constants_1.setMargin('0px 10px'), type: "submit", bsStyle: "primary" }, buttonText));
        };
        _this.getFormKey = function () {
            return "" + PageEditPage.resourceName + (_this.props.isCreatePage ? 'Create' : 'Edit');
        };
        return _this;
    }
    PageEditPage.prototype.render = function () {
        var isCreatePage = this.props.isCreatePage;
        var modelInstanceKey = "rhForms." + this.getFormKey() + ".properties";
        return (React.createElement("div", null,
            React.createElement(react_hero_1.AlertDismissable, { alertFontStyle: constants_1.defaultFont }),
            React.createElement("form", { onSubmit: this.handleSubmit, style: constants_1.setMargin('80px auto') },
                React.createElement(react_bootstrap_1.Grid, null,
                    React.createElement(reusableComponents_1.Row, null,
                        React.createElement("h1", { style: [constants_1.title, constants_1.fontWeight(600), constants_1.fontSize(32), constants_1.defaultFont] }, isCreatePage ? 'New page form' : '')),
                    React.createElement(react_hero_1.FormInput, { type: "text", propertyName: "Title", model: modelInstanceKey + ".title", fieldSize: 5, labelSize: 1 }),
                    React.createElement(react_hero_1.FormInput, { type: "text", propertyName: "Subtitle", model: modelInstanceKey + ".subTitle", fieldSize: 5, labelSize: 1 }),
                    React.createElement(react_hero_1.FormInput, { type: "boolean", propertyName: "Publish", model: modelInstanceKey + ".publish", fieldSize: 5, labelSize: 1 }),
                    React.createElement(reusableComponents_1.Row, null,
                        React.createElement(reusableComponents_1.Panel, { header: React.createElement("strong", null, "" + (isCreatePage ? 'Add' : 'Update'),
                                " the page content:"), style: constants_1.setMargin('15px 13px 15px 54px') },
                            React.createElement("ul", { style: [{ color: '#444' }, constants_1.defaultFont] },
                                React.createElement("li", null,
                                    "Please ", "" + (isCreatePage ? 'add' : 'update'),
                                    " the content" + " " + "of the ", "" + (isCreatePage ? 'new' : ''),
                                    " page in the field provided below."),
                                React.createElement("li", null,
                                    "To see the preview click on ",
                                    React.createElement("strong", null, "View"),
                                    " from the toolbar and" + " " + "select ",
                                    React.createElement("strong", null, "Preview"),
                                    ".")))),
                    React.createElement(react_hero_1.TinyMCEWrapper, { model: modelInstanceKey + ".body", config: {
                            plugins: [
                                'advlist autolink lists link image charmap print',
                                'preview hr anchor pagebreak searchreplace wordcount visualblocks',
                                'insertdatetime media nonbreaking save table contextmenu directionality',
                                'emoticons template paste textcolor colorpicker textpattern imagetools',
                                'codesample toc visualchars code',
                            ],
                            toolbar: [
                                "undo redo | styleselect | bold italic | alignleft aligncenter alignright\n                                        alignjustify | bullist numlist outdent indent | link, code preview fullscreen |\n                                        forecolor backcolor",
                            ],
                            height: '300px',
                        }, style: constants_1.setMargin('15px 0px 15px 40px') }),
                    React.createElement(react_bootstrap_1.FormGroup, null,
                        React.createElement(react_bootstrap_1.Col, { sm: 4 },
                            this.renderButton(isCreatePage ? 'Create' : 'Update'),
                            React.createElement(react_router_1.Link, { style: { margin: '0px 10px' }, className: "btn btn-default", to: "/page/list" }, "Cancel")))))));
    };
    return PageEditPage;
}(React.Component));
exports.PageEditPage = PageEditPage;
PageEditPage.resourceName = 'page';
;
//# sourceMappingURL=PageEditPage.js.map