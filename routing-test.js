'use strict';

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('clear').addEventListener('click', function() {
        document.location.hash = '';
    }, false);

    document.location.hash = '';

    Router.addRoute(/route-alert$/, function() {
        alert('Route has changed');
    });

    Router.addRoute(/route-(success|warning|danger)/, function(param) {
        var result = document.createElement('p');
        result.classList.add('bg-' + param[1]);
        result.textContent = 'Event appening !'
        document.getElementById('target-result').appendChild(result);
    });

});