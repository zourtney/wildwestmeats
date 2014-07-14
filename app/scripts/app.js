'use strict';

/**
 * @ngdoc overview
 * @name fauxcartApp
 * @description
 * # fauxcartApp
 *
 * Main module of the application.
 */
angular.module('fauxcart', [
  // 'ngAnimate',
  // 'ngCookies',
  // 'ngResource',
  'ngRoute',
  // 'ngSanitize',
  // 'ngTouch',
  'fauxcart.common',
  'fauxcart.pricing',
  'fauxcart.products',
  'fauxcart.cart'
])

.config(function($routeProvider) {
  $routeProvider
    .otherwise({
      redirectTo: '/cart'
    });
})

.controller('appCtrl', ['$scope', 'inventory', 'pricing', 'cart', function($scope, inventory, pricing, cart) {

  // These are being put at the "global scope" to satisfy the requirement that
  // the application should be able to update dynamically without a full refresh.
  $scope.products = inventory.query();
  $scope.pricingRules = pricing.query();
  $scope.cart = cart.get();

  $scope.$on('priceStale', function() {
    $scope.cart.$get();
  });

}]);