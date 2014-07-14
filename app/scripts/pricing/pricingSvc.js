'use strict';

/**
 * @ngdoc function
 * @name fauxcart.pricing:pricing
 * @description
 * # Discount
 */
angular.module('fauxcart.pricing')

.factory('pricing', ['$resource', function($resource) {
  return $resource('/api/pricing');
}]);