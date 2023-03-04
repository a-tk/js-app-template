const express = require('express');
const path = require('path');
const log4js = require('log4js');
const child_process = require('child_process');
const bodyParser = require('body-parser');
const app = express();
const log = log4js.getLogger('app');

log4js.configure({
  appenders: { logfile: {type: 'file', filename: 'logs/app.log'} },
  categories: { default: { appenders: ["logfile"], level: "info" } }
});



//configuration per environment
const environment = process.argv[2] || app.get('env') || 'development';
child_process.exec('pwd', function(err, stdout, stderr) { //TODO: fix this problem
  console.log(stdout);
});

const serverConfig = require('./env.json')[ environment ];
console.log("using " + JSON.stringify(serverConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const request = require('request');
const model = require('./model/model.js')(log4js);
model.connect();

/**
 * set api routes up
 */
var api = require('./api/api.js')(log4js, express, model);
app.use(api);

/**
 *
 * Status Codes
 *
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/**
 *
 * Error Handlers
 *
 */
if (environment === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    err.message = err.message || 'Internal Server Error';
    log.error(err.status + ' - ' + err.message + ': Error in request of ' + req.originalUrl + ' from ' + req.ip);
    log.error(err.message);
    log.error(err.stack);
    res.send(err.status + ': ' + err.message);
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  err.message = err.message || 'Internal Server Error';
  log.error(err.status + ' - ' + err.message + ': Error in request of ' + req.originalUrl + ' from ' + req.ip);
  res.send(err.status + ': ' + err.message);
});

process.on('SIGINT', function() {

  log.info('CTRL C detected, exiting gracefully');
  //anything to clean up before exiting? Helpful to close
  //GPIO on raspberry pi
  process.exit();
});

var server = app.listen(serverConfig.port, function () {
  log.info('app listening on port '+ serverConfig.port)
});

module.exports = app;
