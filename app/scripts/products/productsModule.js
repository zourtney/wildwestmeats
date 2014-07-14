'use strict';

angular.module('fauxcart.products', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'fauxcart.common',
  'fauxcart.pricing'
])

.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/products', {
      templateUrl: 'views/products/list.html',
      controller: 'ProductListCtrl'
    });

}]);