'use strict';

angular.module('fauxcart.products', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'fauxcart.common',
  'fauxcart.pricing'
])

/**
 * Let this module register its own routes.
 */
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/products', {
      templateUrl: 'views/products/list.html',
      controller: 'ProductListCtrl'
    });

}])

/**
 * Let this module register its own nav links.
 */
.run(['$rootScope', function($rootScope) {

  if (! $rootScope.navLinks) {
    $rootScope.navLinks = [];
  }

  $rootScope.navLinks.push({
    title: 'Products',
    path: '/products',
    position: 1
  });

}]);