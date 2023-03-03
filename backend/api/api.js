var api = (function (log4js, express, model, notify) {
  var log = log4js.getLogger('/api');
  var api = express.Router();

  /**
   *  url: /api/url
   *  method: METHOD
   *  result: result
   *
   */
  api.get('/api/url', function (req, res, next) {
  });

  return api;
});

module.exports = api;
