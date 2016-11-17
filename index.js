require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = function(event, context) {

  var requestBody = JSON.parse(event.body);

  stripe.charges.create({
    amount:        requestBody.amount,
    source:        requestBody.source,
    currency:      requestBody.currency || 'aud',
    description:   requestBody.description || 'Stripe payment ' + requestBody.source
  }, function(err, charge) {
      if (err) {
        context.fail(JSON.stringify(err));
      }
      else {
        context.succeed(JSON.stringify(charge));
      }
    }
  );
}