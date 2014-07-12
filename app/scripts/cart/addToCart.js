'use strict';

/**
 * @ngdoc directive
 * @name fauxcart.cart:addToCartButton
 * @description
 * # addToCartButton
 * Simple "Add to cart" button
 */
angular.module('fauxcart.cart')

.directive('addToCartButton', ['cartItem', function(CartItem) {

  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/cart/addToCartButton.html',
    scope: {
      product: '='
    },
    link: function(scope) {
      scope.addToCart = function() {
        var item = new CartItem(scope.product.id);
        item.save();
      };
    }
  };

}]);