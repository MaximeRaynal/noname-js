'use strict';

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('hashchange', Router.routing, false);
});

function Router() {

}

Router.routing = function() {
    var url = location.hash;

    Router.routes.forEach(function (route, index, array) {
        if (route.regex.test(url)) {
            route.callback(route.regex.exec(url));
        }
    });
};

Router.routes = [];

Router.addRoute = function (regex, callback) {
    var route = {};
    route.regex = regex;
    route.callback = callback;
    Router.routes.push(route);
};