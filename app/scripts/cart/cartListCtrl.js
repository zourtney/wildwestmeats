'use strict';

angular.module('fauxcart.cart')

.controller('CartListCtrl', ['$scope', 'cart', function($scope, cart) {

  cart.all().then(function(cartItems) {
    $scope.cartItems = cartItems;
  });

}]);