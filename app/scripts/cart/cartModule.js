'use strict';

angular.module('fauxcart.cart', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'fauxcart.products'
])

/**
 * Let this module register its own routes.
 */
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/cart', {
      templateUrl: 'views/cart/list.html',
      controller: 'CartListCtrl'
    });

}]);