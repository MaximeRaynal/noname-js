'use strict';

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('keypress', KeyBoardEvent.process, false);
});

function  KeyBoardEvent () {

}

KeyBoardEvent.regex = /^(?:(ctrl)[\s\+]+)?(?:(alt)[\s\+]+)?(?:(ctrl)[\s\+]+)?(\w{1})$/i

KeyBoardEvent.add = function (keys, callback) {
    var action = {};

    var result = keys.match(KeyBoardEvent.regex);

    if (result !== null) {
        action.ctrl = result[1] != null || result[3] != null;
        action.alt = result[2] != null;
        action.key = result[4];
        action.callback = callback;

        KeyBoardEvent.actions.push(action);
    }
}

KeyBoardEvent.process = function (evnt) {
    KeyBoardEvent.actions.forEach(function (action) {
        if (action.ctrl == evnt.ctrlKey && action.alt == evnt.altKey &&
            action.key == evnt.key) {
            action.callback(action);

            event.preventDefault();
        }
    });
}

KeyBoardEvent.actions = [];