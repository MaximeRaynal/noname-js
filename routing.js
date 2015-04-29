'use strict';

document.addEventListener('DOMContentLoaded', function() {

    window.addEventListener('hashchange', Router.routing, false);

});

function Router() {

}

Router.routing = function() {
    var url = location.hash();

    routes.forEach(function (route, index, array) {
        if (route.regex.test(url)) {
            route.callback(route.regex.exec(url));
            // Ugly but assume only one route match
            return;
        }
    });
};

Router.routes = [];

Router.addRoute = function (regex, callback) {
    route = {}:
    route.regex = regex;
    route.callback = callback;
};