var express = require('express');
var app = express();
var _ = require('lodash');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json())


//
// Products
//
function Product(id, name, price) {
  this.id = id;
  this.name = name;
  this.price = price;
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
products.push(new Product('product_b', 'Buffalo', 50));
products.push(new Product('product_c', 'Caribou', 30));





//
// PricingRules
//
// function PricingRule(type, options) {
//   this.type = type;
//   this.options = options;
// }

// PricingRule.prototype.applyRule = function(price, quantity) {
//   return price * quantity;
// };

// var pricingRules = [
//   new PricingRule('modulo', { getNum: 5, forThePriceOf: 3 })
// ];
// product[0].discounts = '';






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
  
  _.each(this.items, function(quantity, productId) {
    var product = Product.getById(productId);
    if (product) {
      cartTotal += product.price * quantity;
    }
  });

  this.total = cartTotal;
};

var cart = new Cart();

app.get('/api/cart', function(req, res) {
  return res.json(cart);
});

app.put('/api/cart', function(req, res) {
  _.each(req.body.items, function(val, key) {
    cart.items[key] = val;
  });

  cart.updateTotal();
  return res.json(cart);
});




app.listen(process.env.PORT || 3000);


