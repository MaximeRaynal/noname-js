'use strict';

function HttpRequest(config) {

    /**
     * L'objet XMLHttpRequest
     */
    this.xhr = new XMLHttpRequest();


    var defaultConfig = {method: 'GET',
                          debug: false,
                           data: {},
                          async: true,
                   cacheProtect: false};

    for (var attr in config) {
        defaultConfig[attr] = config[attr];
    }

    this.config = defaultConfig;

    this.doneCallBack = [];
    this.errorCallBack = [];

    this.headersList = {};

    /**
     * Success callback
     */
    this.done = function (callback) {
        this.doneCallBack.push(callback);
        return this;
    };

    /**
     * Fail callback
     */
    this.error = function(callback) {
        this.errorCallBack.push(callback);
        return this;
    };

    /**
     * Permet la définition des headers
     */
    this.headers = function (h) {
        this.headersList = h;
        return this;
    };

    this.data = function (data) {
        this.config.data = data;
    }

    /**
     * Fonction d'envoi de la requête
     */
    this.send = function () {

        this.config.method = this.config.method.toUpperCase();

        if (this.config.cacheProtect) {
            var preChar = '?';
            if (this.config.url.indexOf('?') !== -1) {
                preChar = '&amp;';
            }

            this.config.url += preChar + 'cacheProtect=' + Date.now;
        }

        this.xhr.open(this.config.method, this.config.url, this.config.async);

        for (var h in this.headersList) {
            this.xhr.setRequestHeader(h, this.headersList[h]);
        }

        this.xhr.onreadystatechange = this.onReadyStateChangeCallback;

        if (this.config.method != 'GET') {
            this.xhr.send(config.data);
        } else {
            this.xhr.send();
        }
    };

    /**
     * Traitement des status sup à 400
     */
    this.errorProcess = (function () {

        if (this.config.debug) {
            var win = window.open('', this.xhr.statusText);
            var target = win.document;
            target.open();
            target.write(this.xhr.responseText);
            target.close();

        }

        this.errorCallBack.forEach(function () {
            elmnt(data, this.xhr.status, this.xhr);
        });
    }).bind(this);

    /**
     * Traitement des status entre 200 et 400
     */
    this.doneProcess = (function () {

        var data = this.xhr.responseText;

        if (this.xhr.getResponseHeader('Content-Type').indexOf('application/json') !== -1) {
            data = JSON.parse(data);
        }
        var self = this;
        this.doneCallBack.forEach(function (elmnt) {
            elmnt(data, self.xhr.status, self.xhr);
        });
    }).bind(this);

    this.onReadyStateChangeCallback = (function () {
        if (this.xhr.readyState == 4) {
            if (this.xhr.status < 400) {
                this.doneProcess();
            } else if (this.xhr.status >= 400) {
                this.errorProcess();
            }
        }
    }).bind(this);

    return this;
}