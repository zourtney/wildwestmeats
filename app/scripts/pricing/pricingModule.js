'use strict';

angular.module('fauxcart.pricing', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap',
  'fauxcart.common'
])

/**
 * Let this module register its own routes.
 */
.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/pricing', {
      templateUrl: 'views/pricing/list.html',
      controller: 'PricingListCtrl'
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
    title: 'Pricing',
    path: '/pricing',
    position: 2
  });

}]);