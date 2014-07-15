/*global _ */
'use strict';

angular.module('fauxcart', [
  'ngRoute',
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

/**
 * Application-wide controller; this effectively becomes the "global scope"
 * which all page-level controllers (expect modals) have access to. This allows
 * us to cache data, like the product list, between pages.
 */
.controller('appCtrl', ['$scope', 'inventory', 'pricing', 'cart', function($scope, inventory, pricing, cart) {

  // These are being put at the "global scope" to satisfy the requirement that
  // the application should be able to update dynamically without a full refresh.
  $scope.products = inventory.query();
  $scope.pricingRules = pricing.query();
  $scope.cart = cart.get();

  // Listen for the app-wide 'priceStale' events which is thrown when:
  //   - a pricing rules changes
  //   - a product changes (its 'pricingRule' or 'price' may have changed)
  $scope.$on('priceStale', function() {
    $scope.cart.$get();
  });

}])

/**
 * Candy: watch for route changes and mark the module-registered nav link items
 * as active or not.
 */
.run(['$rootScope', function($rootScope) {

  $rootScope.$on('$routeChangeStart', function(event, next) {
    _.each(event.targetScope.navLinks, function(link) {
      link.active = (next.$$route.originalPath === link.path);
    });
  });

}]);