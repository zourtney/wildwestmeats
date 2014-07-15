var PricingRule = require('./models/pricingRule');
var Product = require('./models/product');
var cart = require('./models/cart');


//
// Pricing rules
//
var stardardPricing     = new PricingRule({ name: 'Standard', type: 'straight' }),
    fiveForThreePricing = new PricingRule({ name: 'Summer sale: 5 for the price of 3', type: 'modulo', options: { getNum: 5, forThePriceOf: 3 } }),
    fortyPercentOff     = new PricingRule({ name: 'Clearance: 40% off', type: 'percentage', options: { percentOff: 40 } });

PricingRule.add(stardardPricing);
PricingRule.add(fiveForThreePricing);
PricingRule.add(fortyPercentOff);


//
// Products (initialize with a few exotic meats!)
//
Product.add(new Product({ name: 'Antelope meat', price: 20, pricingRule: stardardPricing.id,     imageUrl: '/images/antelope.jpg' }));
Product.add(new Product({ name: 'Buffalo meat',  price: 50, pricingRule: fiveForThreePricing.id, imageUrl: '/images/buffalo.jpg' }));
Product.add(new Product({ name: 'Caribou meat',  price: 30, pricingRule: stardardPricing.id,     imageUrl: '/images/caribou.jpg' }));
