/*global _ */
'use strict';

angular.module('wildwestmeats', [
  'ngRoute',
  'wildwestmeats.common',
  'wildwestmeats.pricing',
  'wildwestmeats.products',
  'wildwestmeats.cart'
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
.controller('appCtrl', ['$scope', 'Product', 'PricingRule', 'cart', function($scope, Product, PricingRule, cart) {

  // These are being put at the "global scope" to satisfy the requirement that
  // the application should be able to update dynamically without a full refresh.
  $scope.products = Product.query();
  $scope.pricingRules = PricingRule.query();
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
    if (next.$$route) {
      _.each(event.targetScope.navLinks, function(link) {
        link.active = (next.$$route.originalPath === link.path);
      });
    }
  });

}]);