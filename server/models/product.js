var _ = require('lodash');

var lastId = 0;
var products = [];

/**
 * Product class
 *
 * This class stores informatino about a product in the system. Each product
 * has a name, price-per-product, and a pricing rule to apply.
 */
function Product(name, price, pricingRule) {
  this.id = ++lastId;
  this.name = name;
  this.price = price;
  this.pricingRule = pricingRule;
}

/**
 * Updates the current object with the given data.
 */
Product.prototype.set = function(fields) {
  this.name = fields.name;
  this.price = fields.price;
  this.pricingRule = fields.pricingRule;
};



//
// Static methods
//

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