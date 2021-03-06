"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var Login_1 = require("./components/Login");
var react_router_dom_1 = require("react-router-dom");
var Mainpage_1 = require("./components/Mainpage");
var Nearevents_1 = require("./components/Nearevents");
document.title = "Travelers";
var mainpage = false;
function App() {
    return (react_1["default"].createElement("div", { className: "App" },
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            react_1["default"].createElement(react_router_dom_1.Routes, null,
                react_1["default"].createElement(react_router_dom_1.Route, { path: '/', element: react_1["default"].createElement(Login_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/mainpage", element: react_1["default"].createElement(Mainpage_1["default"], null) }),
                react_1["default"].createElement(react_router_dom_1.Route, { path: "/nearevents", element: react_1["default"].createElement(Nearevents_1["default"], null) })))));
}
exports["default"] = App;
