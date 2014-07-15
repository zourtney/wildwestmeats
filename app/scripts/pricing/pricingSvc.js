'use strict';

angular.module('fauxcart.pricing')

/**
 * Manager service for manipulating available pricing rules.
 */
.factory('PricingRule', ['$resource', function($resource) {

  var PricingRule = $resource('/api/pricing/:id', { id: '@id' }, {
    'update': { method: 'PUT' },
    '_query': { method: 'GET', isArray: true }
  });

  PricingRule.query = function() {
    return PricingRule.prototype.$_query.apply(this, arguments);
  };

  return PricingRule;

}]);