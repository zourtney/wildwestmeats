'use strict';

/**
 * @ngdoc function
 * @name fauxcart.products
 * @description
 * # Products module
 */
angular.module('fauxcart.products', [
  'ngRoute',
  'ngResource',
  'fauxcart.common',
  'fauxcart.pricing',
  'fauxcart.cart'
])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/products', {
      templateUrl: 'views/products/list.html',
      controller: 'ProductListCtrl'
    });

}]);