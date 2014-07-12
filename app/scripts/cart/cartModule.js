'use strict';

/**
 * @ngdoc function
 * @name fauxcart.cart
 * @description
 * # Cart
 * A collection of products to be purchased
 */
angular.module('fauxcart.cart', [
  'ngRoute',
  'fauxcart.common',
  'fauxcart.products'
])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/cart', {
      templateUrl: 'views/cart/list.html',
      controller: 'CartListCtrl'
    });

}]);