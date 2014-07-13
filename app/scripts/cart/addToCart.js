'use strict';

/**
 * @ngdoc directive
 * @name fauxcart.cart:addToCartButton
 * @description
 * # addToCartButton
 * Simple "Add to cart" button
 */
angular.module('fauxcart.cart')

.directive('addToCartButton', ['cart', function(cart) {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/cart/addToCartButton.html',
    scope: {
      product: '='
    },
    link: function(scope) {
      scope.addToCart = function() {
        cart.add(scope.product);
      };
    }
  };

}]);