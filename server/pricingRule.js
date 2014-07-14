var _ = require('lodash');

//
// PricingRules
//
var pricingRules = [];

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

PricingRule.all = function() {
  return pricingRules;
};

PricingRule.add = function(inst) {
  pricingRules.push(inst);
};


module.exports = PricingRule;