'use strict';

/**
 * @ngdoc function
 * @name fauxcart.products:inventory
 * @description
 * # Inventory
 */
angular.module('fauxcart.products')

/**
 * Manager service for manipulating available products.
 */
.factory('inventory', ['$resource', function($resource) {
  return $resource('/api/products/');
}]);