var _ = require('lodash');

//
// Products
//
var lastId = 0;
var products = [];

function Product(name, price, pricingRule) {
  this.id = ++lastId;
  this.name = name;
  this.price = price;
  this.pricingRule = pricingRule;
}

Product.prototype.set = function(fields) {
  this.name = fields.name;
  this.price = fields.price;
  this.pricingRule = fields.pricingRule;
};

Product.getById = function(id) {
  return _.findWhere(products, {id: parseInt(id)});
};

Product.all = function() {
  return products;
};

Product.add = function(inst) {
  products.push(inst);
};


module.exports = Product;