var _ = require('lodash');
var BaseClass = require('./base');

var lastId = 0;
var products = [];

/**
 * Product class
 *
 * This class stores informatino about a product in the system. Each product
 * has a name, price-per-product, and a pricing rule to apply.
 */
function Product() {
  this.id = ++lastId;
  BaseClass.apply(this, arguments);
}
Product.prototype = Object.create(BaseClass.prototype);



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