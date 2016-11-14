require('dotenv').config({silent: true});
var express = require('express');
var router = express.Router();
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.oauth_consumer_key,
  consumer_secret: process.env.consumerSecret,
  token: process.env.oauth_token,
  token_secret: process.env.tokenSecret,
});

router.get('/:destination', function(req, res, next) {
  yelp.search({term: 'food', location: req.params.destination}, function (err, results) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(results)
    }
  })
});

// // See http://www.yelp.com/developers/documentation/v2/business
// yelp.business('yelp-san-francisco')
//   .then(console.log)
//   .catch(console.error);
//
// yelp.phoneSearch({ phone: '+15555555555' })
//   .then(console.log)
//   .catch(console.error);
//
// // A callback based API is also available:
// yelp.business('yelp-san-francisco', function(err, data) {
//   if (err) return console.log(error);
//   console.log(data);
// });
module.exports = router;
