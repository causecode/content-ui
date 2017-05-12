"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_hero_1 = require("react-hero");
var PageModel = (function (_super) {
    __extends(PageModel, _super);
    function PageModel(properties) {
        return _super.call(this, properties) || this;
    }
    return PageModel;
}(react_hero_1.BaseModel));
exports.PageModel = PageModel;
PageModel.resourceName = 'page';
PageModel.propTypes = {
    body: react_hero_1.ModelPropTypes.STRING,
    publish: react_hero_1.ModelPropTypes.BOOLEAN,
    publishedDate: react_hero_1.ModelPropTypes.DATE,
    subTitle: react_hero_1.ModelPropTypes.STRING,
    title: react_hero_1.ModelPropTypes.STRING,
};
PageModel.defaultProps = {
    body: '',
    publish: false,
    subTitle: '',
    title: '',
};
PageModel.columnNames = [
    'title',
    'subTitle',
    'publishedDate',
];
//# sourceMappingURL=PageModel.js.map