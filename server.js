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



var PricingRule = require(__dirname + '/server/pricingRule');
var Product = require(__dirname + '/server/product');
var cart = require(__dirname + '/server/cart');


// ----------------------------------------------------------------------------
//
// Create default data set
//
// ----------------------------------------------------------------------------

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

// Pricing
app.get('/api/pricing', function(req, res) {
  return res.json(PricingRule.all());
});

app.put('/api/pricing/:id', function(req, res) {
  var rule = PricingRule.getById(req.params.id),
      cartNeedsUpdate = false;

  if (rule) {
    // Copy over properties
    rule.set(req.body);
    
    // Update cart, if needed
    //NOTE: a little inefficient. We could cut out as soon as we find any cart
    //      item that uses this rule.
    _.each(cart.items, function(quantity, productId) {
      var product = Product.getById(productId);
      cartNeedsUpdate = cartNeedsUpdate || (product.pricingRule === rule.id);
    });
    if (cartNeedsUpdate) {
      cart.updateTotal();
    }

    return res.json(rule);
  }
  return res.status(404).json({ message: 'Not found' });
});

app.post('/api/pricing', function(req, res) {
  var rule = new PricingRule(req.body.name, req.body.type, req.body.options);
  PricingRule.add(rule);
  return res.json(rule);
});

app.delete('/api/pricing/:id', function(req, res) {
  var isInUse = false,
      ruleId = parseInt(req.params.id);

  // See if any products are using this rule...
  _.each(Product.all(), function(product){
    isInUse = isInUse || (product.pricingRule === ruleId);
  });
  if (isInUse) {
    return res.status(500).json({ message: 'Rule still in use' });
  }
  
  if (PricingRule.removeById(ruleId)) {
    return res.json(true);
  }
  return res.status(404).json({ message: 'Not found' });
});


// Products
app.get('/api/products', function(req, res) {
  return res.json(Product.all());
});

app.get('/api/products/:id', function(req, res) {
  var product = Product.getById(req.params.id);
  if (product) {
    return res.json(product);
  }
  return res.status(404).json({ message: 'Not found' });
});

app.put('/api/products/:id', function(req, res) {
  var product = Product.getById(req.params.id);

  if (product) {
    // Copy over properties
    product.set(req.body);
    
    // Update cart, if needed
    if (cart.items[product.id]) {
      cart.updateTotal();
    }

    return res.json(product);
  }
  return res.status(404).json({ message: 'Not found' });
});


// Cart
app.get('/api/cart', function(req, res) {
  return res.json(cart);
});

app.put('/api/cart', function(req, res) {
  cart.items = req.body.items;
  cart.updateTotal();
  return res.json(cart);
});
