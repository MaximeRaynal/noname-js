'use strict';
/**
 * Some tools method
 */

/**
 * Generate a random uid
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

/**
 * Ajoute à la page un fichier de style distant
 * Rajoute un noeud <link rel="stylesheet" dans le <head> de la page
 */
function loadRemoteStyleSheet(url)
{
    var cssNode = document.createElement('link');
        cssNode.setAttribute('rel', 'stylesheet');
        cssNode.setAttribute('href', url);

        document.getElementsByTagName('head')[0].appendChild(cssNode);
}

/**
 * Charge et évalue un script javascript distant.
 * Appel asynchrone.
 */
function loadRemoteScript(url) {
    var xdr = new XMLHttpRequest();

    // Important sinon le eval retourne une erreur
    xdr.overrideMimeType('application/javascript');

    xdr.onload = function () {
        // Si la requête réussi ou si il n'y a pas eu de modification
        if (xdr.status == 200 || xdr.status == 304) {
            eval(xdr.response);
        } else {
            console.log('Can not get the script ! Error : ' + xdr.status +
                        ' - ' + statusText);
        }
    }
    xdr.open('GET', url, true);
    xdr.send();
}