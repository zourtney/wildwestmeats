'use strict';

angular.module('fauxcart.pricing')

/**
 * Manager service for manipulating available pricing rules.
 */
.factory('PricingRule', ['$resource', function($resource) {

  return $resource('/api/pricing/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
  });

}]);