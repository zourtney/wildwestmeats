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
      cart: '='
    }
  };

}]);