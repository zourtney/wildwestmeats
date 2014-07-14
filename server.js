// ----------------------------------------------------------------------------
//
// Start the server
//
// ----------------------------------------------------------------------------
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
PricingRule.add(new PricingRule('standard'));
PricingRule.add(new PricingRule('fiveForThree', 'modulo', { getNum: 5, forThePriceOf: 3 }));

// Products (initialize with a few exotic meats!)
Product.add(new Product('product_a', 'Antelope', 20));
Product.add(new Product('product_b', 'Buffalo', 50, 'fiveForThree'));
Product.add(new Product('product_c', 'Caribou', 30));



// ----------------------------------------------------------------------------
//
// REST API
//
// ----------------------------------------------------------------------------

// Pricing
app.get('/api/pricing', function(req, res) {
  return res.json(PricingRule.all());
});


// Products
app.get('/api/products', function(req, res) {
  return res.json(Product.all());
});

app.get('/api/products/:id', function(req, res) {
  var produc = Product.getById(req.params.id);
  if (product) {
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
