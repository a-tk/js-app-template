const model = ((log4js) => {
  const log = log4js.getLogger('model');

  // const db = null; // TODO choose DB etc

  const initialize = function () {
  };

  const connect = function () {
    initialize();
    log.info('connected');
  };

  return {
    connect,
  };
});

module.exports = model;
