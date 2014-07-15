'use strict';

angular.module('wildwestmeats.cart', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'wildwestmeats.products'
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