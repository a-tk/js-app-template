const express = require('express');
const log4js = require('log4js');
const bodyParser = require('body-parser');

const app = express();
const log = log4js.getLogger('app');

log4js.configure({
  appenders: { logfile: { type: 'file', filename: 'logs/app.log' } },
  categories: { default: { appenders: ['logfile'], level: 'info' } },
});

// configuration per environment
const environment = process.argv[2] || app.get('env') || 'development';

const serverConfig = require('./env.json')[environment];

if (serverConfig === undefined) {
  log.error('error loading config');
  process.exit();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const model = require('./model/model')(log4js);

model.connect();

/**
 * set api routes up
 */
const api = require('./api/api')(log4js, express, model);

app.use(api);

/**
 *
 * Status Codes
 *
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 *
 * Error Handlers
 *
 */
if (environment === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    log.error(`${err.status} - ${err.message}: Error in request of ${req.originalUrl} from ${req.ip}`);
    log.error(err.message);
    log.error(err.stack);
    res.send(`err.status: ${err.message}`);
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  log.error(`${err.status} - ${err.message}: Error in request of ${req.originalUrl} from ${req.ip}`);
  res.send(`err.status: ${err.message}`);
});

process.on('SIGINT', () => {
  log.info('CTRL C detected, exiting gracefully');
  // anything to clean up before exiting? Helpful to close
  // GPIO on raspberry pi
  process.exit();
});

app.listen(serverConfig.port, () => {
  log.info(`app listening on port ${serverConfig.port}`);
});

module.exports = app;
