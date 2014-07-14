var _ = require('lodash');

//
// Products
//
var products = [];

function Product(id, name, price, pricingRule) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.pricingRule = pricingRule;
}

Product.getById = function(id) {
  return _.findWhere(products, {id: id});
};

Product.all = function() {
  return products;
};

Product.add = function(inst) {
  products.push(inst);
};


module.exports = Product;