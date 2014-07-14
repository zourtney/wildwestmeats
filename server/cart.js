var _ = require('lodash');
var Product = require('./product');
var PricingRule = require('./pricingRule');

/**
 * Cart class
 *
 * A simple class that contains a productId <-> quantity hash as `items` and a
 * running total of the calculated price.
 */
function Cart() {
  this.items = {};
  this.total = 0;
}

/**
 * Recalculate the cart's total price.
 */
Cart.prototype.updateTotal = function() {
  var cartTotal = 0,
      productTotal;
  
  // For every product in the cart...
  _.each(this.items, function(quantity, productId) {
    // Apply its pricing rule, and increment the cart total.
    //NOTE: currently limited to one pricing rule per product.
    var product = Product.getById(productId),
        pricingRule = PricingRule.getById(product.pricingRule);
    cartTotal += pricingRule.getValue(product.price, quantity);
  });

  this.total = cartTotal;
};


// Returns as a 'singleton'.
module.exports = new Cart();