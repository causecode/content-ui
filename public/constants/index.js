"use strict";
exports.listContainer = {
    padding: '0px 30px',
};
exports.setMargin = function (margin) {
    return { margin: margin };
};
exports.defaultFont = {
    fontFamily: '"Open Sans", sans-serif',
};
exports.fontSize = function (normalSize, mobileSize) {
    return {
        fontSize: normalSize + "px",
        '@media screen and (max-width: 768px)': {
            fontSize: (mobileSize || normalSize) + "px",
        },
    };
};
exports.fontWeight = function (size) {
    if (size === void 0) { size = 400; }
    return { fontWeight: size };
};
exports.title = {
    paddingTop: '62px',
};
//# sourceMappingURL=index.js.map