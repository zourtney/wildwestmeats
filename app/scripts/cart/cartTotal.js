/*global _ */
'use strict';

/**
 * @ngdoc directive
 * @name fauxcart.cart:cartTotal
 * @description
 * # cartTotal
 * Cart total
 */
angular.module('fauxcart.cart')

.directive('cartTotal', [function() {

  return {
    restrict: 'E',
    templateUrl: 'views/cart/total.html',
    scope: {
      cartItems: '='
    },
    link: function(scope) {
      // Update the displayed total whenever the cart changes.
      scope.$watch('cartItems', function() {
        var total = 0;
        _.each(scope.cartItems, function(item) {
          total += item.totalPrice;
        });
        scope.total = total;
      }, true);
    }
  };

}]);