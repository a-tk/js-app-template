const api = ((log4js, express) => {
  const log = log4js.getLogger('/api');
  const router = express.Router();

  /**
   *  url: /api/url
   *  method: METHOD
   *  result: result
   *
   */
  router.get('/api/url', (req, res) => {
    log.info('api call log');
    res.send(200); // send ack for the purpose of the template
  });

  return api;
});

module.exports = api;
