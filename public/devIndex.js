"use strict";
var React = require("react");
var react_dom_1 = require("react-dom");
var index_1 = require("./store/index");
var react_router_1 = require("react-router");
var react_hero_1 = require("react-hero");
var react_redux_1 = require("react-redux");
var BasePage_1 = require("./components/BasePage");
react_dom_1.render(React.createElement(react_redux_1.Provider, { store: index_1.store },
    React.createElement(react_router_1.Router, { history: react_router_1.browserHistory },
        React.createElement(react_router_1.Route, { path: "/", component: BasePage_1.BasePage },
            React.createElement(react_router_1.Route, { path: ":resource/list", component: react_hero_1.ListPage }),
            React.createElement(react_router_1.Route, { path: ":resource/show/:resourceID", component: react_hero_1.ShowPage }),
            React.createElement(react_router_1.Route, { path: ":resource/edit/:resourceID", component: react_hero_1.EditPage })))), document.getElementById('container'));
//# sourceMappingURL=devIndex.js.map