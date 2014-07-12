'use strict';

/**
 * @ngdoc function
 * @name fauxcart.products
 * @description
 * # Products module
 */
angular.module('fauxcart.products', [
  'ngRoute',
  'fauxcart.common',
  'fauxcart.cart'
])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/products', {
      templateUrl: 'views/products/list.html',
      controller: 'ProductListCtrl'
    });

}]);