'use strict';

var path = require('path');
var fs = require('fs');
var util = require('util');
var http = require("http");
var express = require('express');
var launcher = require('browser-launcher2');
var spawn = require('child_process').spawn;
var url = require('url');
var app = express();
app.use(express.bodyParser());

app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, '/')));
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'html');

// routes ======================================================================
// Fallback route for angular
var index = function (req, res) {
    res.render('index');
}
app.get('*', index);
app.get('/', index);
var portrange = 8000;

function getPort() {
    var port = portrange;
    portrange += 1;

    var server = http.createServer()
    server.listen(port, function (err) {
        if (!err) {
            server.close();
            app.listen(port, function (err) {
                console.log("app listening on port: " + port)
                var target = "chrome";
                var project = url.resolve('http://localhost:' + port + '/www/', 'index.html');

                switch (process.platform) {
                    case 'darwin':
                        spawn('open', ['-n', '-a', 'Google\ Chrome', '--args', '--disable-web-security', , project]);
                        break;
                    case 'win32':
                        // var target = "chrome";
                        var projectUrl = url.resolve('http://localhost:' + port + '/www/', 'index.html');
                        launcher(function (err, launch) {
                            if (err) {
                                return console.error(err);
                            }

                            launch(projectUrl, target, function (err, instance) {
                                if (err) {
                                    return console.error(err);
                                }

                                console.log('Instance started with PID:', instance.pid);

                                instance.on('stop', function (code) {
                                    console.log('Instance stopped with exit code:', code);

                                });
                            });
                        });
                        break;
                }
            });
        }

    });
    server.on('error', function (err) {
        getPort();
    })
}
getPort();


module.exports = app;
