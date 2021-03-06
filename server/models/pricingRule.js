var _ = require('lodash');
var BaseClass = require('./base');

var lastId = 0;
var pricingRules = [];

/**
 * PricingRule class (extends BaseClass)
 *
 * This class stores information about how to modify a (product's) price. The
 * following rule types are available:
 *   - straight:   normal "price * quantity" math
 *   - modulo:     provides "5 for the price of 3" type logic
 *   - percentage: percentage discount
 */
function PricingRule() {
  this.id = ++lastId;
  BaseClass.apply(this, arguments);
}
PricingRule.prototype = Object.create(BaseClass.prototype);


/**
 * Returns the price for a given quantity of items after this rule has been
 * applied.
 */
PricingRule.prototype.getValue = function(price, quantity) {
  var opts = this.options,
      total;

  if (this.type === 'modulo') {
    // Modulo pricing: 'get x for the price of x'.
    total = (Math.floor(quantity / opts.getNum) * opts.forThePriceOf * price) + ((quantity % opts.getNum) * price);
  }
  else if (this.type === 'percentage') {
    // Percentage pricing: '70% off' (but seriously, never buy meat on clearance).
    total = price * quantity * (1 - (opts.percentOff / 100));
  }
  else {
    // Straight pricing
    total = price * quantity;
  }

  // Return as a money-looking value (to two decimal places).
  return parseFloat(total.toFixed(2));
};



//
// Static methods
//

PricingRule.getById = function(id) {
  return _.findWhere(pricingRules, {id: parseInt(id)});
}

PricingRule.all = function() {
  return pricingRules;
};

PricingRule.add = function(inst) {
  pricingRules.push(inst);
};

PricingRule.removeById = function(id) {
  var parsedId = parseInt(id);

  // Splice out the rule. Do this instead of _.reject so we don't change our
  // array reference.
  for (var i = 0; i < pricingRules.length; i++) {
    if (pricingRules[i].id === parsedId) {
      pricingRules.splice(i, 1);
      return true;
    }
  }
  return false;
}


module.exports = PricingRule;