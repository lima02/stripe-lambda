require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = function(event, context, callback) {
  console.log('v0.9.2');
  console.log(event.body);
  var requestBody = JSON.parse(event.body);

  stripe.charges.create({
    amount:        requestBody.amount,
    source:        requestBody.source,
    currency:      requestBody.currency || 'aud',
    description:   requestBody.description || 'Stripe payment ' + requestBody.source
  }, function(err, charge) {
      callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(charge),
        headers: {
            'Content-Type': 'application/json',
        },
    });
  });
}