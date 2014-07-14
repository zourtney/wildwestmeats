var express = require('express');
var app = express();
var _ = require('lodash');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json())



//
// PricingRules
//
function PricingRule(id, type, options) {
  this.id = id;
  this.type = type;
  this.options = options;
}

PricingRule.prototype.getValue = function(price, quantity) {
  if (this.type === 'modulo') {
    var opts = this.options;
    return (Math.floor(quantity / opts.getNum) * opts.forThePriceOf * price) + ((quantity % opts.getNum) * price);
  }
  return price * quantity;
};

PricingRule.getById = function(id) {
  return _.findWhere(pricingRules, {id: id});
}

var pricingRules = [];

app.get('/api/pricing', function(req, res) {
  return res.json(pricingRules);
});

pricingRules.push(new PricingRule('standard'));
pricingRules.push(new PricingRule('fiveForThree', 'modulo', { getNum: 5, forThePriceOf: 3 }));






//
// Products
//
function Product(id, name, price, pricingRule) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.pricingRule = pricingRule;
}

var products = [];

Product.getById = function(id) {
  return _.findWhere(products, {id: id});
};

app.get('/api/products', function(req, res) {
  return res.json(products);
});

app.get('/api/products/:id', function(req, res) {
  var product = Product.getById(req.params.id);
  if (product) {
    return res.json(product);
  }
  return res.status(404).json({ message: 'Not found' });
});

// Initialize app with a few exotic meats.
products.push(new Product('product_a', 'Antelope', 20));
products.push(new Product('product_b', 'Buffalo', 50, 'fiveForThree'));
products.push(new Product('product_c', 'Caribou', 30));







//
// Cart
//
function Cart() {
  this.items = {};
  this.total = 0;
}

Cart.prototype.updateTotal = function() {
  var cartTotal = 0,
      productTotal;
  
  // For every product in the cart...
  _.each(this.items, function(quantity, productId) {
    // Apply its pricing rule, and increment the cart total.
    //NOTE: currently limited to one pricing rule per product.
    var product = Product.getById(productId),
        pricingRule = PricingRule.getById(product.pricingRule || 'standard');
    cartTotal += pricingRule.getValue(product.price, quantity);
  });

  this.total = cartTotal;
};

var cart = new Cart();

app.get('/api/cart', function(req, res) {
  return res.json(cart);
});

app.put('/api/cart', function(req, res) {
  cart.items = req.body.items;
  cart.updateTotal();
  return res.json(cart);
});




app.listen(process.env.PORT || 3000);


