'use strict';

angular.module('fauxcart.cart', [
  'ngRoute',
  'ngResource',
  'fauxcart.products'
])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/cart', {
      templateUrl: 'views/cart/list.html',
      controller: 'CartListCtrl'
    });

}]);