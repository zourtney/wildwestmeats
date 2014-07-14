var _ = require('lodash');

//
// PricingRules
//
var lastId = 0;
var pricingRules = [];

function PricingRule(name, type, options) {
  this.id = ++lastId;
  this.name = name;
  this.type = type;
  this.options = options;
}

PricingRule.prototype.set = function(fields) {
  this.name = fields.name;
  this.type = fields.type;
  this.options = fields.options;
};

PricingRule.prototype.getValue = function(price, quantity) {
  if (this.type === 'modulo') {
    var opts = this.options;
    return (Math.floor(quantity / opts.getNum) * opts.forThePriceOf * price) + ((quantity % opts.getNum) * price);
  }
  return price * quantity;
};

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