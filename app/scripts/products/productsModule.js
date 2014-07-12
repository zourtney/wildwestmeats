'use strict';

/**
 * @ngdoc function
 * @name fauxcart.products
 * @description
 * # Products module
 */
angular.module('fauxcart.products', [
  'ngRoute',
  'fauxcart.common'
])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/items', {
      templateUrl: 'views/products/list.html',
      controller: 'ProductListCtrl'
    });

}])

.run(['inventory', function(inventory) {

  // Load the item store on startup
  inventory.load().then(function(products) {
    console.log('Inventory initialized with ' + products.length + ' products.');
  });

}]);