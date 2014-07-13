'use strict';

/**
 * @ngdoc directive
 * @name fauxcart.cart:cartTotal
 * @description
 * # cartTotal
 * Cart total
 */
angular.module('fauxcart.cart')

.directive('cartTotal', ['inventory', function(inventory) {

  return {
    restrict: 'E',
    templateUrl: 'views/cart/total.html',
    scope: {
      cartItems: '='
    },
    link: function(scope) {
      // Update the displayed total whenever the cart changes.
      scope.$watchCollection('cartItems', function() {
        inventory.total(scope.cartItems).then(function(val) {
          scope.total = val;
        });
      });
    }
  };

}]);