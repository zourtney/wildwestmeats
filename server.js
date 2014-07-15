// ----------------------------------------------------------------------------
//
// Start the server
//
// ----------------------------------------------------------------------------
var _ = require('lodash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json())
app.listen(process.env.PORT || 3000);



// ----------------------------------------------------------------------------
//
// Create default data set
//
// ----------------------------------------------------------------------------
var PricingRule = require('./server/models/pricingRule');
var Product = require('./server/models/product');
var cart = require('./server/models/cart');

// Pricing rules
var stardardPricing     = new PricingRule({ name: 'Standard', type: 'straight' }),
    fiveForThreePricing = new PricingRule({ name: 'Summer sale: 5 for the price of 3', type: 'modulo', options: { getNum: 5, forThePriceOf: 3 } });

PricingRule.add(stardardPricing);
PricingRule.add(fiveForThreePricing);

// Products (initialize with a few exotic meats!)
Product.add(new Product({ name: 'Antelope meat', price: 20, pricingRule: stardardPricing.id,     imageUrl: '/images/antelope.jpg' }));
Product.add(new Product({ name: 'Buffalo meat',  price: 50, pricingRule: fiveForThreePricing.id, imageUrl: '/images/buffalo.jpg' }));
Product.add(new Product({ name: 'Caribou meat',  price: 30, pricingRule: stardardPricing.id,     imageUrl: '/images/caribou.jpg' }));



// ----------------------------------------------------------------------------
//
// REST API
//
// ----------------------------------------------------------------------------
require('./server/api/pricing')(app);
require('./server/api/products')(app);
require('./server/api/cart')(app);
