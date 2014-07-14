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
var stardardPricing = new PricingRule('Standard', 'straight'),
    fiveForThreePricing = new PricingRule('Summer sale: 5 for the price of 3', 'modulo', { getNum: 5, forThePriceOf: 3 });

PricingRule.add(stardardPricing);
PricingRule.add(fiveForThreePricing);

// Products (initialize with a few exotic meats!)
Product.add(new Product('Antelope', 20, stardardPricing.id));
Product.add(new Product('Buffalo', 50, fiveForThreePricing.id));
Product.add(new Product('Caribou', 30, stardardPricing.id));



// ----------------------------------------------------------------------------
//
// REST API
//
// ----------------------------------------------------------------------------
require('./server/api/pricing')(app);
require('./server/api/products')(app);
require('./server/api/cart')(app);
