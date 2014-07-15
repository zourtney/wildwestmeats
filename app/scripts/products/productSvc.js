'use strict';

angular.module('fauxcart.products')

/**
 * Manager service for manipulating available products.
 */
.factory('Product', ['$resource', function($resource) {

  return $resource('/api/products/:id', { id: '@id' }, {
    'update': { method: 'PUT' }
  });

}]);