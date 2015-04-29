'use strict';

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('launch').addEventListener('click', function() {

        var src = {};

        src.author = 'Maxime';

        var result = Template.render(document.getElementById('test-template'),
             { adj:'simple',
               adj2:'love',
               info: src});

        document.getElementById('target-result').appendChild(result);

    });
});